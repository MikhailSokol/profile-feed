import { Button, Stack } from "@mui/material";
import { useUI } from "../../../shared/store/ui";
import { LogoutButton } from "@/features/Auth/Logout/ui/Logout";

type Props = {
  isLogged: boolean;
};

export default function Header({ isLogged }: Props) {
  const { openCreatePost, openProfile, openLogin, isOpenLogin } = useUI((s) => s);

  return (
    <Stack
      sx={{
        height: "70px",
        alignItems: "center",
        gap: 2,
        justifyContent: "flex-end",
        position: "absolute",
        left: 0,
        right: 0,
        boxShadow: "0px 0px 16px 0px #003c8414",
        padding: "0 40px",
      }}
      direction={"row"}
    >
      <Button
        type="submit"
        onClick={() => openProfile()}
        sx={{ height: "fit-content" }}
        variant="contained"
        disabled={!isLogged}
      >
        Редактировать профиль
      </Button>
      <Button
        disabled={!isLogged}
        onClick={() => openCreatePost()}
        sx={{ height: "fit-content" }}
        variant="contained"
      >
        Создать пост
      </Button>
      {isLogged && <LogoutButton />}
      {!isLogged && (
        <Button
          disabled={isOpenLogin}
          onClick={() => openLogin()}
          sx={{ height: "fit-content" }}
          variant="contained"
        >
          Логин / Регистрация
        </Button>
      )}
    </Stack>
  );
}
