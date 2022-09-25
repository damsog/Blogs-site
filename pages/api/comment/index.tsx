import type { NextApiRequest, NextApiResponse } from 'next';
import commentService, { CommentDataModel } from '../../../services/commentService';
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CommentRequest extends NextApiRequest {
    body: CommentDataModel
}

const router = createRouter<CommentRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/comment:
 *  get:
 *      summary: Return all Comments
 *      tags: [Comments]
 *      responses:
 *          200:
 *              description: list of all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/comment'
 *                                
 */

router.get( async (req: CommentRequest, res: NextApiResponse) =>{
    const comment = await commentService.findAll();
    return res.status(200).json(comment);
});

/**
 * @swagger
 * /api/comment:
 *  post:
 *      summary: Create a new comment
 *      tags: [Comments]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/commentToCreate'
 *      responses:
 *          200:
 *              description: Comment created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/comment'
 *                                
 */

router.post( async (req: CommentRequest, res: NextApiResponse) =>{
    const { body } = req;
    try{
        if(
            "content" in body && typeof body.content === "string" &&
            "authorId" in body && typeof body.content === "string" &&
            "postId" in body && typeof body.postId === "string"
        ){
            const comment = await commentService.create(body);

            return res.status(200).json(comment);
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(e){
        return res.status(400).json({message: `Error creating Comment ${e}`});
    }
});

export default router.handler({
    onNoMatch(req: CommentRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});

/**
 * @swagger
 * components:
 *  schemas:
 *      comment:
 *          type: object
 *          required:
 *             - content
 *             - authorId
 *             - postId
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user 
 *              content:
 *                  type: string
 *                  description: The content of the post
 *              authorId:
 *                  type: string
 *                  description: The id of the author
 *              postId:
 *                  type: string
 *                  description: The id of the post
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
 *      commentToCreate:
 *          type: object
 *          required:
 *             - content
 *             - authorId
 *             - postId
 *          properties:
 *              content:
 *                  type: string
 *                  description: The content of the post
 *              authorId:
 *                  type: string
 *                  description: The id of the author
 *              postId:
 *                  type: string
 *                  description: The id of the post
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      commentToUpdate:
 *          type: object
 *          required:
 *             - content
 *          properties:
 *              content:
 *                  type: string
 *                  description: The content of the post
*/