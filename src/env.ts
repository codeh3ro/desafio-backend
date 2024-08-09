import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    SECRET_KEY: z.string(),
    MOCKED_USER_EMAIL: z.string().email(),
    MOCKED_USER_PASSWORD: z.string(),
})

export const env = envSchema.parse(process.env);