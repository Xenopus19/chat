import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { getUploadUrl } from "../s3";
import { UploadFileSchema } from "../schemas/uploadFile";
const imageRouter = Router();

imageRouter.post("/uploadUrl", async (req, res) => {
  try {
    const uploadData = UploadFileSchema.parse(req.body);
    const uniqueKey = `${uuidv4()}-${uploadData.fileName.replace(/\s+/g, "_")}`;
    const url = await getUploadUrl(uniqueKey, uploadData.fileType);
    return res.json({ url, key: uniqueKey });
  } catch (error) {
    return res.status(400).json({
      message: "Error getting upload URL",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

export default imageRouter;
