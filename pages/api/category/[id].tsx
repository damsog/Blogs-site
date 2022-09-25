import type { NextApiRequest, NextApiResponse } from "next";
import categoryService, { CategoryDataModel } from "../../../services/categoryService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CategoryRequest extends NextApiRequest {
    query: {
        id: string;
    };
}

const router = createRouter<CategoryRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

/**
 * @swagger
 * /api/category/{id}:
 *  get:
 *      summary: Return category by id
 *      tags: [Categories]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: list id
 *      responses:
 *          200:
 *              description: Category
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.get( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.findById(req.query.id);
    return res.status(200).json(category);
});

/**
 * @swagger
 * /api/category/{id}:
 *  put:
 *      summary: Updates category by id
 *      tags: [Categories]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: list id
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/categoryToUpdate'
 *      responses:
 *          200:
 *              description: Category
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/category'
 *                                
 */

router.put( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.update(req.query.id, req.body);
    return res.status(200).json(category);
});

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *      summary: Return category by id
 *      tags: [Categories]
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: list id
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

router.delete( async (req: CategoryRequest, res: NextApiResponse) =>{
    try{
        const category = await categoryService.delete(req.query.id);
        return res.status(200).json(category);
    }catch(e){
        return res.status(400).json({message: "Record to delete does not exist."});
    }
});

export default router.handler({
    onNoMatch(req: CategoryRequest, res: NextApiResponse){
        res.status(405).json({message: `Method ${req.method} Not Allowed`});
    }
});