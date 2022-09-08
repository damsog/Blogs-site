import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "../../../../lib/logger";
import Formidable from "formidable";
import path from "path";
import fs from "fs";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res, next) => {
    const uploadFolder = path.join(__dirname, "../../../../public/upload/");
    //const form = Formidable({ maxFileSize: 100 * 1024 *1024, uploadDir: uploadFolder });
    var form = new Formidable.IncomingForm();
    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.filepath = uploadFolder + file.originalFilename;
    });

    form.on('file', function (name, file){
        logger.debug('Uploaded ' + file.originalFilename);
    });
    return res.status(200).json({ message: "success" });
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

