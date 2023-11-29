import { useSocket } from "@/components/providers/socket-provider";
import { Member, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "postcss";
import { useEffect } from "react";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;


    socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
        queryClient.setQueryData([queryKey], (oldData:any) => {
            if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                return oldData
            }


            const newData = oldData.pages.map((page:any) => {

                console.log("oldData.pages update", page.items)
                return {
                    ...page,
                    items: page.items.map((item: MessageWithMemberWithProfile) => {
                        if(item.id === message.id) {
                            // yeni olan mesajı döndür
                            return message
                        }
                        return item
                    })
                }
            })

            return {
                ...oldData,
                pages: newData
            }


        })
    })


    socket.on(addKey, (message: MessageWithMemberWithProfile) => {

        /**
         * Eski veri ise ekleme yapma
         */
        queryClient.setQueryData([queryKey], (oldData:any) => {
            console.log("oldData add ", oldData.pages)
            if(!oldData || !oldData.pages || oldData.pages.length === 0) {
                return {
                    pages: [{
                        items: [message]
                    }]
                }
            }


            /**
             * Eğer yeni veri ise ekleme yap
             */
            const newData = [...oldData.pages];

            newData[0] = {
                ...newData[0],
                items: [
                    message,
                    ...newData[0].items
                ]
            }

            return {
                ...oldData,
                pages: newData
            }
        })
    })

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };


  }, [queryClient, addKey, queryKey, socket, updateKey]);
};
