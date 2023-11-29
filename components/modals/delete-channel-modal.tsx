"use client";
import qs from "query-string";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteChannelModal() {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server, channel } = data;
  const isModalOpen = isOpen && type === "deleteChannel";
  const [isLoding, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      let response = await axios.delete(url);
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Kanalı Sil
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <span className="font-semibold text-indigo-500">
              #{channel?.name}
            </span>{" "}
            kanalı kalıcı olarak silinecek. Bu işlemi gerçekleştirmek
            istediğinize emin misiniz?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoding} onClick={onClose} variant={"ghost"}>
              İptal
            </Button>
            <Button disabled={isLoding} variant={"primary"} onClick={onClick}>
              Sil
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
