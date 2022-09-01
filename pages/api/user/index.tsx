import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import userService, { UserToCreate } from "../../../services/userService";

const prisma = new PrismaClient();

interface UserCreateRequest extends NextApiRequest {
    body: UserToCreate
}


const handler = async (req: UserCreateRequest, res: NextApiResponse) => {
    const { body } = req;
    switch(req.method){
        case "GET":{
            const users = await userService.findAll();
            res.status(200).json(users);
            break;
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
            }catch(e){
                return res.status(400).json({message: "Invalid request"});
            }
            
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;