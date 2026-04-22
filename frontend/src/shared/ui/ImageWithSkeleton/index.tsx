import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

type Props = {
  src: string;
};

export const ImageWithSkeleton = ({ src }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ position: "relative", width: "100%", borderRadius: 2, overflow: "hidden" }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            height: 180,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      <Box
        component="img"
        src={src}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        sx={{
          maxWidth: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          height: "100%",
        }}
      />
    </Box>
  );
};
