import jwt from 'jsonwebtoken';
    
    export async function authMiddleware(request, reply){
        try{
            const authHeader = request.headers.authorization;

            if(!authHeader){
            return reply.status(401).send({ error: 'Token não informado'});
            }

            const token = authHeader.split(" ")[1];
            const secret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secret);

            request.user = decoded;
        }  catch(err){
            return reply.status(401).send({ error: 'Token inválido ou expirado'});
        }
    }