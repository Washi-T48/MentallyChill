import dotenv from 'dotenv';
import pkg from 'pg';
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
        console.log('Connected to database');
        client.release();
    } catch (err) {
        console.error('Error connecting to database', err);
    }
};

testConnection();
export default pool;