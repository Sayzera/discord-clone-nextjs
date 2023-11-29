import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}

export const useChatScroll = ({
    chatRef,
    bottomRef,
    shouldLoadMore,
    count,
    loadMore
}: ChatScrollProps) => {
    const [hashInitilazied, setHashInitilazied] = useState(false)


    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if(scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll)
        }
    }, [
        chatRef,
        shouldLoadMore,
        loadMore
    ]);


    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;
        const shouldAutoScroll = () => {
            if(!hashInitilazied && bottomDiv) {
                setHashInitilazied(true)
                return true;
            }
            
            if(!topDiv ) return false;


            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

            return distanceFromBottom < 100;
        }


        if(shouldAutoScroll()) {
         setTimeout(() => {
            bottomRef?.current?.scrollIntoView({
                behavior: "smooth"
            })
         }, 100);
        }

    }, [bottomRef, chatRef, count, hashInitilazied])
}