import { FastifyInstance } from "fastify";
import { ZodTypeProvider  } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from 'zod';

export async function createCar(app: FastifyInstance){ 

    app
    .withTypeProvider<ZodTypeProvider>()
    .post('/api/cars', {
        preHandler: [app.authenticate],
        schema: {
            body: z.object({
                brand: z.string(),
                model: z.string(),
                imageUrl: z.string().nullable(),
                color: z.string(),
                price: z.number(),
            }),
        },
    }, async (request, reply) => {
    
        const {
            brand,
            model,
            imageUrl,
            color,
            price
        } = request.body;

        const car = await prisma.car.create({
            data: {
                brand,
                model,
                imageUrl: imageUrl!,
                color, 
                price,
            }
        })

        return reply.status(201).send({ message: 'Carro criado com sucesso!', carId: car.id });
    });
}