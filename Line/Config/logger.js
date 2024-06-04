import winston, { format, loggers } from 'winston';

const logger = winston.createLogger({
    // levels: winston.config.syslog.levels,
    levels: {
        emerg: 0,
        alert: 1,
        crit: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7
    },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'console.log' }),
        // new winston.transports.Console()
    ]
});

export default logger;
logger.info('logger.js initialized');