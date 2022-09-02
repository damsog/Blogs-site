import type { NextApiRequest, NextApiResponse } from "next";
import commentService from "../../../../services/commentService";

interface CommentRequest extends NextApiRequest {
    query:
    {id: string;}
}

const handler = async (req: CommentRequest, res: NextApiResponse) => {
    const { id } = req.query;
    switch(req.method){
        case "GET":{
            const category = await commentService.findByPostId(id);
            return res.status(200).json(category);
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;