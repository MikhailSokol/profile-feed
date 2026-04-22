import { Button } from "@mui/material";
import { useLogout } from "../model/useLogout";

export const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button color="error" onClick={logout}>
      Logout
    </Button>
  );
};
