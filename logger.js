import winston, { format } from 'winston';

export const logger = winston.createLogger({
    // levels: winston.config.syslog.levels,
    levels: {
        error: 0,
        warn: 1,
        server: 2,
        request: 3,
        event: 4,
        message: 5,
        action: 6,
        response: 7,
        logs: 8
    },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'console.log', level: 'logs' })
    ]
});

logger.logs('Logger.js initialized');