import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ObjectID } from 'mongodb';

import handler from '../../../middleware/database';

function getId(req){
    const id  = req.query.id;
    if (!id){
        throw new Error(StatusCodes.BAD_REQUEST)
    }
    return id;
}

function sendNotFound(res){
    res.status(StatusCodes.NOT_FOUND).end(ReasonPhrases.NOT_FOUND);
}
function sendInternalError(res){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).end(ReasonPhrases.INTERNAL_SERVER_ERROR);
}

handler.patch(async (req, res) => {
    const id = getId(req);
    if (id){
        req.db.collection('todos').updateOne(
            {_id: new ObjectID(id)},
            { $set: {done: req.body.done}} )
            .then(updated => {
                if (updated.modifiedCount === 0){
                    sendNotFound(res);
                }
                else{
                    res.json(updated)
                }
            })
            .catch(() => sendInternalError());
    }
});

handler.delete(async (req, res) => {    
    const id = getId(req);
    if (id){
        req.db.collection('todos').deleteOne({ _id: ObjectID(id) })
            .then(deleted => {
                if (deleted.deletedCount === 0){
                    sendNotFound(res);
                }
                else{
                    res.json(deleted)}
                }
            )
            .catch(() => sendInternalError());
    }
});

export default handler;