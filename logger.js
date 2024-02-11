import winston, { format } from 'winston';

export const logger = winston.createLogger({
    format: format.combine(
        format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'console.log' })
    ]
});