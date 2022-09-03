import {format, createLogger, transports} from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const myFormat = format.printf(({level, message, timestamp, stack}) => {
    return `[${timestamp}] ${level}: ${message || stack}`;
});

const logger = createLogger({
    level: process.env.LOGGER_LEVEL || 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:MM:SS TZ'}),
        format.errors({stack: true}),
        myFormat),
    transports: [new transports.Console()]
});

export default logger;