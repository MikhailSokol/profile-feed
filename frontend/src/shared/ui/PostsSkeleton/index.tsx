import { Skeleton, Card, CardContent, Stack } from "@mui/material";

export const PostSkeleton = () => (
  <Stack sx={{ gap: 2 }}>
    <Card>
      <CardContent>
        <Skeleton height={20} />
        <Skeleton height={100} />
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Skeleton height={20} />
        <Skeleton height={100} />
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <Skeleton height={20} />
        <Skeleton height={100} />
      </CardContent>
    </Card>
  </Stack>
);
