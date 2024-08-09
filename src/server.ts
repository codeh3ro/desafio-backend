import fastify from 'fastify';
import cors from '@fastify/cors'
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { createCar } from './routes/Cars/createCar';
import { listAllCars } from './routes/Cars/listAllCars';
import { login } from './routes/Auth/login';
import { listCar } from './routes/Cars/listCar';
import { updateCar } from './routes/Cars/updateCar';
import { deleteCar } from './routes/Cars/deleteCar';

const app = fastify();
app.register(cors, { origin: '*' });
app.register(require('./middlewares/jwt'));

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(login);
app.register(createCar);
app.register(listAllCars);
app.register(listCar);
app.register(updateCar);
app.register(deleteCar);

const start = async () => {
    try{
        await app.listen({ port: 3333 });
    }catch(err){
        console.log(err);
    }
}

start();