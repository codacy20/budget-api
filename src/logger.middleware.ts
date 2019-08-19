import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    getLoggerForStatusCode(statusCode: number) {
        if (statusCode >= 500) {
            /* tslint:disable:no-console quotemark:[true, "double"] */
            return console.error.bind(console);
        }
        if (statusCode >= 400) {
            return console.warn.bind(console);
        }

        return console.log.bind(console);
    }

    use(req: Request, res: Response, next: () => void) {
        console.info('\x1b[36m%s\x1b[0m', `[${req.method}] ${req.originalUrl}`);
        const cleanup = () => {
            res.removeListener('finish', logFn);
            res.removeListener('close', abortFn);
            res.removeListener('error', errorFn);
        };

        const logFn = () => {
            cleanup();
            const logger = this.getLoggerForStatusCode(res.statusCode);
            logger(`${res.statusCode} ${res.statusMessage} >> ${res.get('Content-Length') || 0}b sent`);
        };

        const abortFn = () => {
            cleanup();
            console.warn('Request aborted by the client');
        };

        const errorFn = err => {
            cleanup();
            console.error(`Request pipeline error: ${err}`);
        };

        res.on('finish', logFn); // successful pipeline (regardless of its response)
        res.on('close', abortFn); // aborted pipeline
        res.on('error', errorFn); // pipeline internal error

        next();
    }
}
