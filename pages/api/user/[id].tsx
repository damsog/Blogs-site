import type { NextApiRequest, NextApiResponse } from "next";
import userService from "../../../services/userService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface UserRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<UserRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *      summary: Return user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: User
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                                               
 */

router.get( async (req: UserRequest, res: NextApiResponse) =>{
    const user = await userService.findById(req.query.id);
    return res.status(200).json(user);
});


/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *      summary: Updates user
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/user'
 *          404:
 *              description: User not found
 *                                
 */

router.put( async (req: UserRequest, res: NextApiResponse) =>{
    const user = await userService.update(req.query.id, req.body);
    return res.status(200).json(user);
});

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *      summary: Deletes a user by id
 *      tags: [Users]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: user id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: User not found
 *                                
 */

router.delete( async (req: UserRequest, res: NextApiResponse) =>{
    try{
        const user = await userService.delete(req.query.id);
        return res.status(200).json(user);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: UserRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});