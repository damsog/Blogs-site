import type { NextApiRequest, NextApiResponse } from "next";
import categoryService, { CategoryDataModel } from "../../../services/categoryService";

interface CategoryRequest extends NextApiRequest {
    query: {
        id: string;
    };
}

const handler = async (req: CategoryRequest, res: NextApiResponse) => {
    const { body } = req;
    const { id } = req.query;
    switch (req.method) {
        case "GET": {
            const category = await categoryService.findById(id);
            return res.status(200).json(category);
        }
        case "PUT": {
            const category = await categoryService.update(id, body);
            return res.status(200).json(category);
        }
        case "DELETE": {
            try {
                const category = await categoryService.delete(id);
                return res.status(200).json(category);
            } catch (e) {
                return res.status(400).json({ message: "Record to delete does not exist." });
            }
        }
        default: {
            return res.status(400).json({ message: "Invalid request" });
        }
    }
}

export default handler;