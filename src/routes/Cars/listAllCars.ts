import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";


export async function listAllCars(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/api/cars', {
            preHandler: [app.authenticate],
        }, async (request, reply) => {

            const cars = await prisma.car.findMany();

            return reply.status(200).send(cars);
        })
}