import { prisma } from '../../src/lib/prisma';
import bcrypt from 'bcrypt';
import { env } from '../../src/env';

const mockedUserPassword = env.MOCKED_USER_PASSWORD;
const mockedUserEmail = env.MOCKED_USER_EMAIL;

async function seed() {

    const hashedPassword = await bcrypt.hash(mockedUserPassword, 10);

    await prisma.user.create({
        data: {
            name: 'Teste',
            email: mockedUserEmail,
            password: hashedPassword
        }
    })
}

seed().then(() => {
    console.log('Seed executado com sucesso!');
    prisma.$disconnect();
})