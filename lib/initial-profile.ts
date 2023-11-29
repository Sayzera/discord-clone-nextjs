import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();
  // login control
  if (!user) return redirectToSignIn();

  // profile control
  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  if (profile) { 
    return profile;
  }
  // if there is no profile, create a new one
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
