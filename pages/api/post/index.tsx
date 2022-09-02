import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";

interface PostCreateRequest extends NextApiRequest {
    body: PostDataModel
}

const handler = async (req: PostCreateRequest, res: NextApiResponse) => {
    const { body } = req;
    switch(req.method){
        case "GET":{
            const posts = await postService.findAll();
            return res.status(200).json(posts);
        }
        case "POST":{
            try{
                if(
                    "title" in body && typeof body.title === "string" &&
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
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;