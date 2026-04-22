import { Container, Stack } from "@mui/material";
import { PostFeed } from "@/widgets/postFeed/ui/PostFeed";
import Header from "@/widgets/header/ui/Header";
import { ProfileCard } from "@/widgets/profileCard/ui/ProfileCard";
import { useHomeData } from "../model/useHomeData";
import { useHomeActions } from "../model/useHomeActions";
import { useScrollContainer } from "../model/useScrollContainer";
import { useUI } from "@/shared/store/ui";
import { EditProfileModal } from "@/features/Profile/EditProfile/ui/EditProfile";
import { CreatePost } from "@/features/Post/CreatePost/ui/CreatePost";
import { EditPost } from "@/features/Post/EditPost/ui/EditPost";
import { LoginForm } from "@/features/Auth/Login/ui/Login";

export default function Home() {
  const { user, isLoading } = useHomeData();
  const { uploadAvatar } = useHomeActions();
  const ui = useUI();
  const { scrollContainer } = useScrollContainer();

  const isNotLogged = !user;

  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <Header isLogged={!isNotLogged} />

      <Stack sx={{ mt: "80px", opacity: isNotLogged ? 0.7 : 1 }} spacing={3}>
        <ProfileCard
          onAvatarChange={(file) => uploadAvatar.mutate(file)}
          userLoading={isLoading && !isNotLogged}
          user={user}
          isLogged={!isNotLogged}
        />
      </Stack>

      <Stack ref={scrollContainer} sx={{ flexGrow: 1, overflow: "auto", mt: "20px" }}>
        <PostFeed sesssioUserId={user?.id} scrollContainer={scrollContainer} />
      </Stack>

      {ui.editOpenProfile && <EditProfileModal user={user} onClose={ui.closeProfile} open />}

      {ui.createOpenPost && user?.id && (
        <CreatePost sessionUserId={user?.id as number} onClose={ui.closeCreatePost} open />
      )}

      {ui.postIdEdit !== null && <EditPost onClose={ui.closeEditPost} open />}
      {ui.isOpenLogin && <LoginForm onClose={ui.closeLogin} open />}
    </Container>
  );
}
