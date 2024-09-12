import dotenv from 'dotenv';
import pkg from 'pg';
import logger from '../Middleware/logger.js';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT
});

const testConnection = async () => {
    try {
        const client = await pool.connect();
        logger.info('Connected to database');
        console.log(await client.query('SELECT NOW()'));
        console.log(await client.query('SHOW TIMEZONE'));
        console.log(await client.query('SHOW DEFAULT_TIMEZONE'));
        client.release();
    } catch (err) {
        logger.error('Error connecting to database', err);
    }
};

testConnection();
await pool.query(`SET TIME ZONE 'Asia/Bankgok';`);

export default pool;