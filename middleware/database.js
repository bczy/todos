import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 2000 
});

async function database(req, res, next) {
  console.log('connecting...')
  if (!client.isConnected()){ 
    client.connect()
      .then(()=>{
        console.log(`connected: client.${isConnected()}`)
        req.dbClient = client;
        return next();
      }).catch(e => {
        console.log(`failed to connect: ${e}`);
        res.send(StatusCodes.INTERNAL_SERVER_ERROR)
      });
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