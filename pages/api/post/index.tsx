import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface PostRequest extends NextApiRequest {
    body: PostDataModel
}
const router = createRouter<PostRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: PostRequest, res: NextApiResponse) =>{
    const posts = await postService.findAll();
    return res.status(200).json(posts);
});

router.post( async (req: PostRequest, res: NextApiResponse) =>{
    const { body } = req;
    try{
        if(
            "title" in body && typeof body.title === "string" &&
            "description" in body && typeof body.description === "string" &&
            "content" in body && typeof body.content === "string" &&
            "authorId" in body && typeof body.authorId === "string" &&
            "categoryId" in body && typeof body.categoryId === "string"
        ){
            const post = await postService.create(body);
            return res.status(200).json(post);
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(e){
        return res.status(400).json({message: `Error creating Post ${e}`});
    }
});

export default router.handler({
    onNoMatch(req: PostRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});