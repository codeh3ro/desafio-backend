import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function updateCar(app: FastifyInstance){

    app
    .withTypeProvider<ZodTypeProvider>()
    .put('/api/cars/:id', {
        preHandler: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string()
            }),
            body: z.object({
                model: z.string(),
                brand: z.string(),
                imageUrl: z.string().nullable(),
                color: z.string(),
                price: z.number(),
            })
        }
    }, async (request, reply) => {

        const { id } = request.params;
        const { model, brand, imageUrl, color, price } = request.body;

        const car = await prisma.car.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if(!car){
            return reply.status(404).send({ message: 'Carro não encontrado' });
        }

        const carUpdate = await prisma.car.update({
            where: {
                id: parseInt(id)
            },
            data: {
                model, 
                brand, 
                imageUrl: imageUrl!, 
                color, 
                price
            }
        });

        return reply.status(200).send({ message: 'Carro atualizado com sucesso!', update: carUpdate });
    });
}