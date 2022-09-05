import type { NextApiRequest, NextApiResponse } from "next";
import userService, { UserDataModel } from "../../../services/userService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface UserRequest extends NextApiRequest {
    body: UserDataModel
}

const router = createRouter<UserRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: UserRequest, res: NextApiResponse) =>{
    const users = await userService.findAll();
    return res.status(200).json(users);
});

router.post( async (req: UserRequest, res: NextApiResponse) =>{
    const { body } = req;
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
});

export default router.handler({
    onNoMatch(req: UserRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    },
});