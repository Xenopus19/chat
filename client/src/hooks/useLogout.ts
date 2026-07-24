import { useAppDispatch } from "@/store/hooks";
import { resetUser } from "@/reducers/user";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useAppDispatch(); 
    const logout = () => {
        localStorage.removeItem("token");
        queryClient.clear();
        dispatch(resetUser());
        navigate("/");
    };

    return logout;
};

export default useLogout;