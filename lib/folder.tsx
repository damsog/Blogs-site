import path from "path";
import fs from "fs";

const createPublicUploadFolder = (uploadFolder: string):boolean => {
    try{
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export default createPublicUploadFolder;