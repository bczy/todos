import { StatusCodes } from 'http-status-codes';

import handler from '../../middleware/database';

handler.get(async (req, res) => {
    req.db.collection('todos').find().toArray()
        .then(doc => res.json(doc))
});

handler.post(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description){
        throw new Error(StatusCodes.BAD_REQUEST)
    }
    
    req.db.collection('todos').insertOne({title, description, done: false})
        .then(doc => res.json(doc))
        .catch(e => {throw e})
});

export default handler;