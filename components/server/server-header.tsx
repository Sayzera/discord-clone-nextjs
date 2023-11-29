"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  // console.log(server, role, isAdmin, isModerator);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button
            className="w-full text-md font-semibold px-3 flex items-center h-12
           border-neutral-200 dark:border-neutral-800
           hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition
           "
          >
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("invite", { server: server })}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            >
              Davet Et
              <UserPlus className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("editServer", { server: server })}
              className="
            px-3 py-2
           text-sm cursor-pointer"
            >
              Sunucu Ayarları
              <Settings className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("members", { server: server })}
              className="
            px-3 py-2
           text-sm cursor-pointer"
            >
              Üyeleri Yönet
              <Users className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => onOpen("createChannel", { server: server })}
              className="
            px-3 py-2
           text-sm cursor-pointer"
            >
              Kanal Oluştur
              <PlusCircle className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {isModerator && <DropdownMenuSeparator className="my-1" />}

          {isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("deleteServer", { server: server })}
              className="
           text-rose-500 px-3 py-2
           text-sm cursor-pointer"
            >
              Sunucuyu Sil
              <Trash className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}

          {!isAdmin && (
            <DropdownMenuItem
              onClick={() => onOpen("leaveServer", { server: server })}
              className="
           text-rose-500 px-3 py-2
           text-sm cursor-pointer"
            >
              Sunucudan Ayrıl
              <LogOut className="h-4 w-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerHeader;
