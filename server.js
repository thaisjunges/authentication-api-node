import 'dotenv/config';
import dotenv from "dotenv";
import pool from "./src/database/connection.js";
import fastify from "fastify";
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/usuario.js';


console.log("DATABASE_URL =", process.env.DATABASE_URL);
const server = fastify({
    logger: true
})

server.get('/', async () => {
    return { status: "API Online em execução" };
});

// Testar conexão com o bd
pool.query('SELECT NOW()', (err, res) =>{
        if (err){
       console.log(err);
       //console.log(process.env.DATABASE_URL);
    } else{
        console.log("Conexao com o banco de dados estabelecida com sucesso!");
    }
    })

    server.register(authRoutes);
    server.register(userRoutes);
    
    const PORT = process.env.PORT || 10000 ;

       server.listen({
    port: PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
/* //Endpoint para teste
server.get('/', (request, reply) => {
   return reply.send('Home da API de autenticação');
}
*/
 
