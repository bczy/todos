import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('todos').find().toArray();
    res.json(doc);
});

handler.post(async (req, res) => {
    const { title, description } = req.body;
    let doc = await req.db.collection('todos').insertOne({title, description, done: false});
    res.json(doc);
});

export default handler;