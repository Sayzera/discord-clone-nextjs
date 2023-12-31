import qs from "query-string"
import { useParams } from "next/navigation"
import { useInfiniteQuery } from "@tanstack/react-query"

import { useSocket } from "@/components/providers/socket-provider"

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}

interface fetchMessagesParams {
    pageParam?: any;

}

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    const { isConnected } = useSocket()
    const params = useParams();

    const fetchMessages = async({
        pageParam
    }: fetchMessagesParams = {}) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, {
            skipNull: true,
        })

    const res = await fetch(url)
    return await res.json()
    }

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }  = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor && lastPage,
        refetchInterval: !isConnected ? 1000 : false,
        initialPageParam: params?.cursor,
    })


    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
    



}