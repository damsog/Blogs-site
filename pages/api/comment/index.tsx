import type { NextApiRequest, NextApiResponse } from 'next';
import commentService, { CommentDataModel } from '../../../services/commentService';

interface CommentRequest extends NextApiRequest {
    body: CommentDataModel
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    switch(req.method){
        case("GET"):{
            const comments = await commentService.findAll();
            return res.status(200).json(comments);
        }
        case("POST"):{
            try{
                if(
                    "content" in body && typeof body.content === "string" &&
                    "authorId" in body && typeof body.content === "string" &&
                    "postId" in body && typeof body.postId === "string"
                ){
                    const comment = await commentService.create(body);

                    return res.status(200).json(comment);
                }
                return res.status(400).json({message: "Invalid request"});
            }catch(e){
                return res.status(400).json({message: `Error creating Comment ${e}`});
            }
        }
        default:{
            return res.status(400).json({message: "Invalid request"});
        }
    }
}

export default handler;