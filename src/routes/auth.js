import pool from "../database/connection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from "zod";

//Endpoint de registro
async function authRoutes(server){

    const createSchema = z.object({
        nome: z.string().min(3).max(30),
        email: z.email({message: 'Email inválido'}),
        senha: z.string().trim().min(8, 'Senha deve ter pelo menos 8 caracteres')
    })

    server.post('/register', async (request, reply) => {    

    try{
        // Validação
        const body = createSchema.parse(request.body);
        const {nome, email, senha} = body;

        // Criptografia
        const senhaHash = await bcrypt.hash(senha, 10);
            
        // Banco
        await pool.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
            [nome, email, senhaHash]
        );

        reply.status(201).send('Usuário registrado com sucesso');

        } catch(err){
            return reply.status(400).send({
                error: 'Dados inválidos',
                details: err.issues
            });
        }

        console.log(err);
            return reply.status(400).send({
                error: 'Erro ao registrar usuário',
            });
        }
    );

    const loginSchema = z.object({
            email: z.email({message: 'Email inválido'}),
            senha: z.string().trim().min(8, 'Senha deve ter pelo menos 8 caracteres')
        })
        
    //Endpoint login
    server.post('/login', async (request, reply) =>{
        
        try{
            const { email, senha } = loginSchema.parse(request.body);
            
            //Busca usuario no banco somente pelo email
            const res = await pool.query(
                'SELECT * FROM usuarios WHERE email = $1', 
                [email]
            );
            if (res.rows.length === 0) {
               return reply.status(404).send('Usuario nao encontrado');
            } 

            const usuario = res.rows[0];
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if(!senhaCorreta){
                return reply.status(401).send('Senha incorreta');
            }

             const token = jwt.sign({
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        return reply.status(200).send({
                mensagem: 'Login realizado com sucesso',
                token: token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                }
            });

        } catch (err) {
            if (err instanceof z.ZodError) {
                return reply.status(400).send({
                    error: 'Dados inválidos',
                    details: err.issues
                });
            }
        console.error(err);
                return reply.status(500).send({
                    success: false,
                    error: 'Erro interno do servidor'
        });
    }
})};

    export default authRoutes;