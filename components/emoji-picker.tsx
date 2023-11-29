"use client";
import i18n from "@emoji-mart/data/i18n/tr.json";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface EmojiPickerProps {
  onChange: (value: string) => void;
}
export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker
          locale="tr"
          theme={theme}
          data={data}
          i18n={i18n}
          onEmojiSelect={(emoji: any) => {
            onChange(emoji.native);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
