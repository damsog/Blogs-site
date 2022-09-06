import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "../../../../lib/logger";
import formidable from "formidable";

const uploadMiddleware = async (req: NextApiRequest,res: NextApiResponse, next: () => any) => {
};

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(uploadMiddleware);

router.post(async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next();
            logger.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        logger.info(files);
        return res.status(200).json({ message: "success" });

      });
});

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default router.handler({
    onNoMatch(req, res) {
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    },
    onError: (err, req, res) => {
        res.status(500).json({ error: "Something went wrong" });
    },
});

