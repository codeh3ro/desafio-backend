import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { env } from '../env';

const fp = require('fastify-plugin')

module.exports = fp(function(app: FastifyInstance, opts: any, done: any) {

  app.register(fastifyJwt, {
    secret: env.SECRET_KEY
  })

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

    done();
})
