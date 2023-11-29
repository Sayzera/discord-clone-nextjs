"use client";
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

export default function DeleteServerModal() {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;
  const [isLoding, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      let response = await axios.delete(`/api/servers/${server?.id}`);

      console.log(response.data, "data");
      onClose();
      router.refresh();
      router.push("/");
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
            Sunucu Sil
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            sunucusu kalıcı olarak silinecek. Bu işlemi gerçekleştirmek
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
