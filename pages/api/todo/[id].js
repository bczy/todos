import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb'

import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
    const updated = await req.db.collection('todos').updateOne(
        {_id: new ObjectID(req.query.id)},
        {$set: {done: req.body.done}} );
        
    res.json(updated);
});

handler.delete(async (req, res) => {
    const { id } = req.query
    const deleted = await req.db.collection('todos').deleteOne({ _id: ObjectID(id) })
    res.json(deleted);
});


export default handler;