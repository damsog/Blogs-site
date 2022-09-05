import type { NextApiRequest, NextApiResponse } from "next";
import commentService from "../../../../services/commentService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../../lib/customMorgan";

interface CommentRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<CommentRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.findByPostId(req.query.id);
    return res.status(200).json(comment);
});

export default router.handler({
    onNoMatch(req: CommentRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});