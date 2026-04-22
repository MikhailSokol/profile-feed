import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

import type { User } from "@/entities/user/model/types";
import { AvatarDnD } from "@/widgets/avatarDnd/ui/AvatarDnD";
import { ProfileBaseField } from "@/shared/ui/ProfileBaseField";
import { fields, labels } from "@/features/Profile/EditProfile/lib/fields";

type Props = {
  user?: User | null;
  userLoading: boolean;
  onAvatarChange: (file: File) => void;
  isLogged?: boolean;
};
export const ProfileCard = ({ user, userLoading, onAvatarChange, isLogged }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ mb: 1 }} variant="body1" color="primary">
          Профиль
        </Typography>
        <Stack direction="row" spacing={3}>
          <div style={{ position: "relative" }}>
            <AvatarDnD disabled={!isLogged} value={user?.avatar} onChange={onAvatarChange} />
          </div>

          <Box sx={{ display: "flex", flexDirection: "column", mr: "auto", gap: 1 }}>
            {fields.map((field) => {
              return (
                <ProfileBaseField
                  key={field}
                  value={user?.[field] || "-"}
                  label={labels[field]}
                  userLoading={userLoading}
                />
              );
            })}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
