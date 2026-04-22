import { Skeleton, Box, Typography } from "@mui/material";

type Props = {
  userLoading: boolean;
  label: string;
  value?: string | number | null;
};

export const ProfileBaseField = ({ userLoading, value, label }: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Typography
        sx={{ whiteSpace: "nowrap", alignSelf: "flex-start" }}
        variant="subtitle2"
        color="secondary"
      >
        {label}:
      </Typography>

      {userLoading ? (
        <Skeleton width={120} height={20} />
      ) : (
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
          variant="body2"
        >
          {value ?? "—"}
        </Typography>
      )}
    </Box>
  );
};
