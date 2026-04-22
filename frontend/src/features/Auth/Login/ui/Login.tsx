import { TextField, Button, Box, DialogContent, DialogTitle, Dialog } from "@mui/material";
import { useLogin } from "../model/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../model/schema";
import type { LoginSchema } from "../model/types";
import { useUI } from "@/shared/store/ui";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const LoginForm = ({ open, onClose }: Props) => {
  const login = useLogin();
  const { globalError, setGlobalError } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: LoginSchema) => {
    login.mutate(data);
  };

  const isGlobalPassError = globalError?.message?.code === "INVALID_PASSWORD";

  const values = watch();
  const isFormEmpty = Object.values(values).some((v) => (Array.isArray(v) ? v.length === 0 : !v));

  const reset = () => {
    clearErrors();
    setGlobalError();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Логин / Регистрация</DialogTitle>

      <DialogContent>
        <Box onChange={() => reset()} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            sx={{ mb: 2 }}
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            sx={{ mb: 2 }}
            label="Пароль"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password || (!!globalError && isGlobalPassError)}
            helperText={
              errors.password?.message || (isGlobalPassError && globalError?.message?.message)
            }
          />

          <Button disabled={isFormEmpty} type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
