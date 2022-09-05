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

router.get( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.findById(req.query.id);
    return res.status(200).json(category);
});

router.put( async (req: CategoryRequest, res: NextApiResponse) =>{
    const category = await categoryService.update(req.query.id, req.body);
    return res.status(200).json(category);
});

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