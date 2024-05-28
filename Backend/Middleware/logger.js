import winston, { format } from 'winston';

const logger = winston.createLogger({
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7,
        console: 8
    },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'console.log' }),
        new winston.transports.Console({ level: 'console' }),
    ]
});

export const consoleLogExpress = (res, req, next) => {
    logger.console(`${res.method} ${res.originalUrl}`);
    next();
};

export default logger;