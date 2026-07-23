import api from "@/api";
import axios from "axios";

export const getUploadUrl = async (file: File) => {
    const result = await api.post("/images/uploadUrl", {fileName: file.name, fileType: file.type});
    return result.data;
}

export const uploadToS3 = async (url: string, file: File) => {
    const response = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type, 
      },
    });

    if(response.status !== 200) {
        throw new Error(`Failed to upload image to S3: ${response.statusText}`);
    }
}
