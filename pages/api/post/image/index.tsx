import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import multer from "multer";
import logger from "../../../../lib/logger";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadMiddleware = async (req: NextApiRequest,res: NextApiResponse, next: () => any) => {
    logger.info('Resolving file to upload');
    upload.single('image');
    await next();
};

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(uploadMiddleware);

router.post(async (req, res) => {
    logger.info('Resolving post request');
    return res.status(200).json({ message: 'file uploaded' });
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

