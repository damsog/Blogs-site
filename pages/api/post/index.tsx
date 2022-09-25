import type { NextApiRequest, NextApiResponse } from "next";
import postService, { PostDataModel } from "../../../services/postService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface PostRequest extends NextApiRequest {
    body: PostDataModel
}
const router = createRouter<PostRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/post:
 *  get:
 *      summary: Return all posts
 *      tags: [Posts]
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
    const posts = await postService.findAll();
    return res.status(200).json(posts);
});

/**
 * @swagger
 * /api/post:
 *  post:
 *      summary: Create a new post
 *      tags: [Posts]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postToCreate'
 *      responses:
 *          200:
 *              description: all objects for a list
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/post'
 *          404:
 *              description: Object not found
 *                                
 */

router.post( async (req: PostRequest, res: NextApiResponse) =>{
    const { body } = req;
    try{
        if(
            "title" in body && typeof body.title === "string" &&
            "description" in body && typeof body.description === "string" &&
            "content" in body && typeof body.content === "string" &&
            "authorId" in body && typeof body.authorId === "string" &&
            "categoryId" in body && typeof body.categoryId === "string"
        ){
            const post = await postService.create(body);
            return res.status(200).json(post);
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(e){
        return res.status(400).json({message: `Error creating Post ${e}`});
    }
});

export default router.handler({
    onNoMatch(req: PostRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});

/**
 * @swagger
 * components:
 *  schemas:
 *      post:
 *          type: object
 *          required:
 *              - title
 *              - description
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the user
 *              title:
 *                  type: string
 *                  description: The title of the post
 *              slug:
 *                  type: string
 *                  description: The slug of the post
 *              description:
 *                  type: string
 *                  description: The description of the post
 *              content:
 *                  type: string
 *                  description: The content of the post
 *              authorId:
 *                  type: string
 *                  description: The id of the author
 *              categoryId:
 *                  type: string
 *                  description: The id of the category
 *              mainImage:
 *                  type: string
 *                  description: The main image of the post
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
 *      postToCreate:
 *          type: object
 *          required:
 *              - title
 *              - description
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of the post
 *              description:
 *                  type: string
 *                  description: The description of the post
 *              content:
 *                  type: string
 *                  description: The content of the post
 *              authorId:
 *                  type: string
 *                  description: The id of the author
 *              categoryId:
 *                  type: string
 *                  description: The id of the category
 *              mainImage:
 *                  type: string
 *                  description: The main image of the post
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      postToUpdate:
 *          type: object
 *          required:
 *              - title
 *              - description
 *          properties:
 *              title:
 *                  type: string
 *                  description: The title of the post
 *              description:
 *                  type: string
 *                  description: The description of the post
 *              content:
 *                  type: string
 *                  description: The content of the post
 *              categoryId:
 *                  type: string
 *                  description: The id of the category
 *              mainImage:
 *                  type: string
 *                  description: The main image of the post
*/