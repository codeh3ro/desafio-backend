import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt  from 'bcrypt';
import { env } from "../../env";

export async function login(app: FastifyInstance){
    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/api/auth/login', {
        schema: {
            body: z.object({
                email: z.string().email(),
                password: z.string()
            })
        }
    }, async(request, reply) => {
        const { email, password } = request.body;

        if(email === '' && password === ''){
            return reply.status(401).send({ message: 'Informe email e senha.' });
        }

        const userLogin = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!userLogin){
            return reply.status(401).send({ message: 'Email e/ou senha inválida.' });
        }

        const isValidPassword = await bcrypt.compare(password, userLogin.password);

        if(!isValidPassword){
            return reply.status(401).send({ message: 'Email e/ou senha inválida.' });
        }

        const token = app.jwt.sign({ id: userLogin.id, email: userLogin.email }, { 
            key: env.SECRET_KEY,
            expiresIn: '1d'
        });

        return reply.status(200).send({ 
            message: 'Login efetuado com sucesso!', 
            user: {
                id: userLogin.id,
                name: userLogin.name,
                email: userLogin.email
            } ,
            token });
    })
}