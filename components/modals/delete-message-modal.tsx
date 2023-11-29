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

export default function DeleteMessageModal() {
  const { isOpen, onClose, type, data } = useModal();

  const { apiUrl, query } = data;
  const isModalOpen = isOpen && type === "deleteMessage";
  const [isLoding, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      let response = await axios.delete(url);
      onClose();
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
            Mesajı Sil
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Bu mesajı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
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
