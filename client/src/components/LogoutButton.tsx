import useLogout from "@/hooks/useLogout";
import { Button } from "./ui/button";

const LogoutButton = () => {
    const logout = useLogout();

    return (
        <Button variant='destructive' onClick={() => logout()}>
            Logout
        </Button>
    );
};

export default LogoutButton;