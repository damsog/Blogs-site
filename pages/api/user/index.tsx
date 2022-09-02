import type { NextApiRequest, NextApiResponse } from "next";
import userService, { UserDataModel } from "../../../services/userService";

interface UserCreateRequest extends NextApiRequest {
    body: UserDataModel
}


const handler = async (req: UserCreateRequest, res: NextApiResponse) => {
    const { body } = req;
    switch(req.method){
        case "GET":{
            const users = await userService.findAll();
            return res.status(200).json(users);
        }
        case "POST":{
            try{
                if(
                    "username" in body && typeof body.username === "string" &&
                    "password" in body && typeof body.password === "string" &&
                    "email" in body && typeof body.email === "string"
                ){
                    const user = await userService.create(body);
                    return res.status(200).json(user);
                }
                return res.status(400).json({message: "Invalid request"});
            }catch(e){
                return res.status(400).json({message: `Error creating User ${e}`});
            }
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;