import { StatusCodes } from 'http-status-codes';
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  console.log(`attempting db access, connected: ${client.isConnected()}`)
  if (!client.isConnected()){ 
    console.log('connecting...')
    client.connect()
      .then(()=>{
        console.log(`connected: ${client.isConnected()}`)
        req.dbClient = client;
        req.db = client.db('todos-db');
        return next();
      }).catch(e => {
        console.log(`failed to connect: ${e}`);
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
  } else {
    res.status(statusCode).end();
  }
}

const handler = nextConnect({onError});

handler.use(database);

export default handler;