import type { NextApiRequest, NextApiResponse } from "next";
import postService from "../../../../services/postService";

interface PostRequest extends NextApiRequest {
    query:
    {id: string;}
}

const handler = async (req: PostRequest, res: NextApiResponse) => {
    const { id } = req.query;
    switch(req.method){
        case "GET":{
            const post = await postService.findByAuthorId(id);
            return res.status(200).json(post);
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;