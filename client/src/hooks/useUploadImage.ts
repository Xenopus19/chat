import { getUploadUrl, uploadToS3 } from "@/services/imageService";
import { useMutation } from "@tanstack/react-query";

const useUploadImage = () => {
    const getUrlMutation = useMutation({mutationFn: getUploadUrl});
    const uploadImageMutation = useMutation({mutationFn: ({url, file}: {url: string, file: File}) => uploadToS3(url, file)});
    
    const uploadImage = async (file: File) => {
        const { url, key } = await getUrlMutation.mutateAsync(file);

        await uploadImageMutation.mutateAsync({url, file});

        return key; 
    };

    return { uploadImage };
};

export default useUploadImage;