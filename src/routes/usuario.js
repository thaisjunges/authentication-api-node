import pool from "../database/connection.js";
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middlewares/authMiddleware.js';

async function userRoutes(server){
    //Endpoint de listar usuários
server.get('/usuarios', async (request, reply) => {
    try{
        const res = await pool.query('SELECT id, nome, email FROM usuarios');

        if(res.rows.length === 0){
       return reply.status(404).send('Usuário nao encontrado')
    }

     return reply.status(200).send(res.rows);

    } catch(err){
        return reply.status(500).send({
            error: 'Erro ao buscar usuários',
            message: err.message
        });
    }
});

     // Endpoint perfil
    server.get('/perfil', { preHandler: authMiddleware }, async(request, reply) => {
        return reply.status(200).send({
            mensagem: 'Token valido',
            user: request.user
        })
    })
}

export default userRoutes;

   