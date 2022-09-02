import type { NextApiRequest, NextApiResponse } from "next";
import commentService, { CommentDataModel } from "../../../services/commentService";

interface CommentRequest extends NextApiRequest {
    query:
    {id: string;}
}

const handler = async (req: CommentRequest, res: NextApiResponse) => {
    const { body } = req;
    const { id } = req.query;
    switch(req.method){
        case("GET"):{
            const comment = await commentService.findById(id);
            return res.status(200).json(comment);
        }
        case("PUT"):{
            const comment = await commentService.update(id, body);
            return res.status(200).json(comment);
        }
        case("DELETE"):{
            try{
                const comment = await commentService.delete(id);
                return res.status(200).json(comment);
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