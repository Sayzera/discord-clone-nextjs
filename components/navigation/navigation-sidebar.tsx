/**
 * Buradaki kod sunucu taraflı çalışıyor ve işlemler bitene kadar kullanıcıya gösterilmiyor.
 */
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import NavigationItem from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    // birden fazla sonucu bulmak için findMany kullanılır.
    where: {
      members: {
        // members adında bir ilişkili tablo var.
        some: {
          // : Bu, iç içe geçmiş bir ilişkinin filtrelenmesi için kullanılır. Bu durumda, members ilişkisi içinde belirli bir koşulu sağlayan kayıtları almak için kullanılır.
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div
      className="space-y-4 flex flex-col item-center h-full text-primary w-full 
    dark:bg-[#1E1F22] bg-[#E3E5E8] pt-3 "
    >
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px] rounded-[24px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
