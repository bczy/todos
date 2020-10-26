import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';
import { MongoClient } from 'mongodb';
import nc from 'next-connect';
import { dbLogger, httpLogger, logRequest } from './loggers';

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  dbLogger.info(`attempting db access, connected: ${client.isConnected()}`)
  if (!client.isConnected()){ 
    dbLogger.info('connecting...')
    client.connect()
      .then(()=>{
        dbLogger.info(`connected: ${client.isConnected()}`)
        req.dbClient = client;
        req.db = client.db('todos-db');
        return next();
      }).catch(e => {
        dbLogger.error(`failed to access db, connected: ${client.isConnected()}`)
        res.send(StatusCodes.INTERNAL_SERVER_ERROR)
      });
  } else {
    req.db = client.db('todos-db');
    return next();
  }
}

function onError(err, req, res) {
  const statusCode = err.message;
  if (statusCode.length > 3){
    httpLogger.error(`Internal server error!`)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  } else {
    httpLogger.error(`Error ${statusCode}: ${getReasonPhrase(statusCode)}, url: ${req.url}`)
    res.status(statusCode).end();
  }
}

function onNoMatch(req, res){
  httpLogger.error(`404 - Page not found: ${req.url}`)
  res.status(StatusCodes.NOT_FOUND).end(ReasonPhrases.NOT_FOUND);
}

const handler = nc({ onNoMatch, onError });
 
handler.use(database);
handler.use(logRequest);

export default handler;