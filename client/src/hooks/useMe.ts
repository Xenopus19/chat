import { getMe } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

const useMe = () => {
    const token = localStorage.getItem("token");

    return useQuery({queryKey: ["me"], queryFn: () => getMe(token), enabled: Boolean(token), retry: false});
}

export default useMe;