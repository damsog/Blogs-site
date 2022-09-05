import type { NextApiRequest, NextApiResponse } from "next";
import postService from "../../../../services/postService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../../lib/customMorgan";

interface PostRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<PostRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: PostRequest, res: NextApiResponse) =>{
    const post = await postService.findByAuthorId(req.query.id);
    return res.status(200).json(post);
});

export default router.handler({
    onNoMatch(req: PostRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});