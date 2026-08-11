import { useAppDispatch } from "@/store/hooks";
import { resetUser } from "@/reducers/user";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useAppDispatch(); 
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        queryClient.clear();
        dispatch(resetUser());
        navigate("/");
    }, [queryClient, dispatch, navigate]);

    return logout;
};

export default useLogout;