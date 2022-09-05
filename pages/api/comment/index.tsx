import type { NextApiRequest, NextApiResponse } from 'next';
import commentService, { CommentDataModel } from '../../../services/commentService';
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CommentRequest extends NextApiRequest {
    body: CommentDataModel
}

const router = createRouter<CommentRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.findAll();
    return res.status(200).json(comment);
});

router.post( async (req: CommentRequest, res: NextApiResponse) =>{
    const { body } = req;
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
});

export default router.handler({
    onNoMatch(req: CommentRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});