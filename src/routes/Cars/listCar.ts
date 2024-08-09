import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";


export async function listCar(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/api/cars/:id', {
            preHandler: [app.authenticate],
            schema: {
                params: z.object({
                    id: z.string()
                })
            }
        }, async (request, reply) => {

            const { id } = request.params;

            const car = await prisma.car.findUnique({
                where: {
                    id: parseInt(id)
                }
            });

            if(!car){
                return reply.status(404).send({ message: 'Carro não encontrado' });
            }

            return reply.status(200).send(car);
        });
    }
