import type { NextApiRequest, NextApiResponse } from "next";
import categoryService , { CategoryDataModel } from "../../../services/categoryService";

interface CategoryCreateRequest extends NextApiRequest {
    body: CategoryDataModel
}

const handler = async (req: CategoryCreateRequest, res: NextApiResponse) => {
    const { body } = req;
    switch(req.method){
        case "GET":{
            const categories = await categoryService.findAll();
            return res.status(200).json(categories);
        }
        case "POST":{
            try{
                if(
                    "name" in body && typeof body.name === "string"
                ){
                    const category = await categoryService.create(body);
                    return res.status(200).json(category);
                }
                return res.status(400).json({message: "Invalid request"});
            }catch(e){
                return res.status(400).json({message: `Error creating Category ${e}`});
            }
        }
        default:{
            return res.status(400).json({message:"Invalid request"});
        }
    }
}

export default handler;