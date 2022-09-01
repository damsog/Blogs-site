import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../services/userService";

interface UserRequest extends NextApiRequest {
    query:
    {id: string;}
}

const handler = async (req: UserRequest, res: NextApiResponse) => {
    const { body } = req;
    const { id } = req.query;
    switch(req.method){
        case "GET":{
            const user = await userService.findById(id);
            return res.status(200).json(user);
        }
        case "PUT":{
            const user = await userService.update(id, body);
            return res.status(200).json(user);
        }
        case "DELETE":{
            try{
                const user = await userService.delete(id);
                return res.status(200).json(user);
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