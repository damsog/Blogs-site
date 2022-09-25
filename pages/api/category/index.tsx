import type { NextApiRequest, NextApiResponse } from "next";
import categoryService , { CategoryDataModel } from "../../../services/categoryService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CategoryRequest extends NextApiRequest {
    body: CategoryDataModel
}

const router = createRouter<CategoryRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/category:
 *  get:
 *      summary: Return all categories
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: list of all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.get( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.findAll();
    return res.status(200).json(category);
});

/**
 * @swagger
 * /api/category:
 *  post:
 *      summary: Create a new category
 *      tags: [Categories]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/categoryToCreate'
 *      responses:
 *          200:
 *              description: Category created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.post( async (req: CategoryRequest, res: NextApiResponse) =>{
    try{
        if(
            "name" in req.body && typeof req.body.name === "string"
        ){
            const category = await categoryService.create(req.body);
            return res.status(200).json(category);
        }
        return res.status(400).json({message: "Invalid request"});
    }catch(e){
        return res.status(400).json({message: `Error creating Category ${e}`});
    }
});

export default router.handler({
    onNoMatch(req: CategoryRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});

/**
 * @swagger
 * components:
 *  schemas:
 *      category:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
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
 *      categoryToCreate:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      categoryToUpdate:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *                  description: Username set by user
*/