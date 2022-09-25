import type { NextApiRequest, NextApiResponse } from "next";
import userService, { UserDataModel } from "../../../services/userService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface UserRequest extends NextApiRequest {
    body: UserDataModel
}

const router = createRouter<UserRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/user:
 *  get:
 *      summary: Return all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: list of all users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/user'
 *                                
 */

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

/**
 * @swagger
 * components:
 *  schemas:
 *      user:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              name:
 *                  type: string
 *                  description: Username set by user
 *              email:
 *                  type: string
 *                  description: Email set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              firstName:
 *                  type: string
 *                  description: first name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              image: 
 *                 type: string 
 *                 description: image of the user
 *              emailVerified:
 *                 type: boolean
 *                 description: if the email is verified
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      userToUpdate:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
 *              password:
 *                  type: string
 *                  description: key to access
 *              firstName:
 *                  type: string
 *                  description: first name of the user
 *              lastName:
 *                  type: string
 *                  description: last name of the user
 *              image: 
 *                 type: string 
 *                 description: image of the user
*/