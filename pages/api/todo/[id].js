import nextConnect from 'next-connect';
import { ObjectID } from 'mongodb'

import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
    const { title, description, done,_id } = req.body;
    await req.db.collection('todos').updateOne(
        {_id: new ObjectID(_id)},
        {$set: {title, description, done}} );
        
    res.json({muf:"doc"});
});

handler.delete(async (req, res) => {
    const { id } = req.query
    await req.db.collection('todos').deleteOne({ _id: ObjectID(id) })
    res.end()
});


export default handler;