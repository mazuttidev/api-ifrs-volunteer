import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        port: process.env.DB_PORT || 3306,
    },
    jwtSecret: process.env.JWT_SECRET || 'volunteers_default_secret',
};