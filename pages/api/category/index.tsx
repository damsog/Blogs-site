import type { NextApiRequest, NextApiResponse } from "next";
import categoryService , { CategoryDataModel } from "../../../services/categoryService";
import { createRouter, expressWrapper } from "next-connect";
import customMorgan from "../../../lib/customMorgan";

interface CategoryRequest extends NextApiRequest {
    body: CategoryDataModel
}

const router = createRouter<CategoryRequest, NextApiResponse>();

router.use(expressWrapper(customMorgan));

router.get( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.findAll();
    return res.status(200).json(category);
});

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