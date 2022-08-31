import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UserCreateRequest extends NextApiRequest {
    body: {
        username: string;
        email: string;
        password: string;
        firstName: string | null | undefined;
        lastName: string | null | undefined;
        mainPhoto: string | null | undefined;
    };
}


const handler = async (req: UserCreateRequest, res: NextApiResponse) => {
    const { body } = req;
    if(req.method !== "POST"){ return res.status(405).json("Method Not Allowed"); }
    try{
        if(
            'username' in body && typeof body.username === 'string' &&
            'password' in body && typeof body.password === 'string' &&
            'email' in body && typeof body.email === 'string'
        ){
            const user = await prisma.user.create({
                data: {
                    username: body.username,
                    email: body.email,
                    password: body.password,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    mainPhoto: body.mainPhoto,
                }
            });
            return res.status(200).json(user);
        }
        throw new Error('Invalid data');
    } catch (e) {
        return res.status(405).json(e);
    }
}

export default handler;