import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";

interface PostRequest extends NextApiRequest {
    query:
    {id: string;}
}

const handler = async (req: PostRequest, res: NextApiResponse) => {
    const { body } = req;
    const { id } = req.query;
    switch(req.method){
        case "GET":{
            const post = await postService.findById(id);
            return res.status(200).json(post);
        }
        case "PUT":{
            const post = await postService.update(id, body);
            return res.status(200).json(post);
        }
        case "DELETE":{
            try{
                const post = await postService.delete(id);
                return res.status(200).json(post);
            }catch(e){
                return res.status(400).json({message: "Record to delete does not exist."});
            }
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;