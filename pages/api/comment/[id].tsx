import type { NextApiRequest, NextApiResponse } from "next";
import commentService, { CommentDataModel } from "../../../services/commentService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CommentRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<CommentRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.findById(req.query.id);
    return res.status(200).json(comment);
});

router.put( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.update(req.query.id, req.body);
    return res.status(200).json(comment);
});

router.delete( async (req: CommentRequest, res: NextApiResponse) =>{
    try{
        const comment = await commentService.delete(req.query.id);
        return res.status(200).json(comment);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: CommentRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});