import log4js from 'log4js'

log4js.configure({
    appenders: { stdout: { type: "stdout" } },
    categories: { 
        default: { appenders: ["stdout"], level: "debug" } ,
        database: { appenders: ["stdout"], level: "debug" } ,
        store: { appenders: ["stdout"], level: "debug" } ,
        http: { appenders: ["stdout"], level: "debug" } ,
    }
});

export function logRequest(req, res, next){
    httpLogger.info(`${req.url}`);
    next();
}

export const dbLogger = log4js.getLogger('database')
export const storeLogger = log4js.getLogger('store')
export const httpLogger = log4js.getLogger('http')
