import { fetchChatById } from "@/services/chatService"
import { useQuery } from "node_modules/@tanstack/react-query/build/modern/_tsup-dts-rollup"
import { useParams } from "react-router-dom"

const Chat = () => {
    const id = useParams().id
    if(!id) {
        return <div>No chat id provided</div>
    }
    const chat = useQuery({
        queryKey: ["chat", id],
        queryFn: () => fetchChatById(id),
        enabled: !!id,
    })
    
    

    return <div>Chat {id}</div>
}

export default Chat