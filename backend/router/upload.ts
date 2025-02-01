import express from "express"
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const uploadRouter = express.Router()

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME || "",
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `image/${Date.now()}-${file.originalname}`);
        },
    }),
});


uploadRouter.post("/image", upload.single("file"), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: (req.file as Express.MulterS3.File).location });
    } else {
        res.status(400).json({ error: "File upload failed" });
    }
});

export default uploadRouter