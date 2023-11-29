import { redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCode = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  /**
   * Eğer bir invite code varsa ve bu invite code'a sahip olan bir server varsa
   */
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  /**
   * Eğer kullanıcı bu bağlantı ile gelirse doğrudan server'a üye olacak.
   */
  const server = await db.server.update({
    /**
     * Where kullanabilmemiz için ilgili kısmın unique olması gerekiyor.
     */
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      /**
       * İlişkili olan tabloya yeni bir kayıt eklemek için create kullanıyoruz.
       */
      members: {
        create: [
          {
            profileId: profile?.id || "",
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCode;
