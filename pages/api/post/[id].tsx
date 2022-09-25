import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface PostRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<PostRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/post/{id}:
 *  get:
 *      summary: Return post by id
 *      tags: [Posts]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: post id
 *      responses:
 *          200:
 *              description: list of all posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/post'
 *                                
 */

router.get( async (req: PostRequest, res: NextApiResponse) =>{
    const post = await postService.findById(req.query.id);
    return res.status(200).json(post);
});

/**
 * @swagger
 * /api/post/{id}:
 *  put:
 *      summary: Updates post by id
 *      tags: [Posts]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: post id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/post'
 *          404:
 *              description: User not found
 *                                
 */

router.put( async (req: PostRequest, res: NextApiResponse) =>{
    const post = await postService.update(req.query.id, req.body);
    return res.status(200).json(post);
});

/**
 * @swagger
 * /api/post/{id}:
 *  delete:
 *      summary: Deletes a post by id
 *      tags: [Posts]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: post id
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *          404:
 *              description: Post not found
 *                                
 */

router.delete( async (req: PostRequest, res: NextApiResponse) =>{
    const { id } = req.query;
    try{
        const post = await postService.delete(id);
        return res.status(200).json(post);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: PostRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});