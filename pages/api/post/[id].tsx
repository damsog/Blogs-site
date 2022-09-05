import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface PostRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<PostRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: PostRequest, res: NextApiResponse) =>{
    const post = await postService.findById(req.query.id);
    return res.status(200).json(post);
});

router.put( async (req: PostRequest, res: NextApiResponse) =>{
    const post = await postService.update(req.query.id, req.body);
    return res.status(200).json(post);
});

router.delete( async (req: PostRequest, res: NextApiResponse) =>{
    const { id } = req.query;
    try{
        const post = await postService.delete(id);
        return res.status(200).json(post);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: PostRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});