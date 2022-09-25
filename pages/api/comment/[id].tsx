import type { NextApiRequest, NextApiResponse } from "next";
import commentService, { CommentDataModel } from "../../../services/commentService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CommentRequest extends NextApiRequest {
    query:
    {id: string;}
}

const router = createRouter<CommentRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/comment/{id}:
 *  get:
 *      summary: Return comment by id
 *      tags: [Comments]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: comment id
 *      responses:
 *          200:
 *              description: Comment by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/comment'
 *                                
 */

router.get( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.findById(req.query.id);
    return res.status(200).json(comment);
});

/**
 * @swagger
 * /api/comment/{id}:
 *  put:
 *      summary: Updates comment by id
 *      tags: [Comments]
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
 *                      $ref: '#/components/schemas/commentToUpdate'
 *      responses:
 *          200:
 *              description: If operation was succesful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/comment'
 *          404:
 *              description: User not found
 *                                
 */

router.put( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.update(req.query.id, req.body);
    return res.status(200).json(comment);
});

/**
 * @swagger
 * /api/comment/{id}:
 *  delete:
 *      summary: Deletes a comment by id
 *      tags: [Comments]
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

router.delete( async (req: CommentRequest, res: NextApiResponse) =>{
    try{
        const comment = await commentService.delete(req.query.id);
        return res.status(200).json(comment);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: CommentRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});