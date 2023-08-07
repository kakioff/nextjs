"use client"
import { useWebSocket } from "@/components/websocket"
import { Metadata } from "next"
import { useEffect, useState } from "react"

export const metadata: Metadata = {
    title: "很不错的东西"
}
export default function IndexPage() {
    const { addMessageListener, removeMessageListener, sendMessage } = useWebSocket(),
        [message, setMessage] = useState<string[]>([]);
    useEffect(() => {
        const handleReceivedMessage = (msg: string) => {
            // 处理接收到的消息
            console.log(message);
            
            console.log(msg);
            setMessage(oldVal=>[...oldVal, msg])

        };

        addMessageListener(handleReceivedMessage);

        return () => {
            // 在组件卸载时移除监听器
            removeMessageListener(handleReceivedMessage);
        };
    }, []);
    let msgList = []
    for (let i = 0; i < message.length; i++) {
        msgList.push(
            <li key={i}>{i}: {message[i]}</li>
        )
    }
    return <>
        <h1 onClick={() => { sendMessage({
            "code": 101,
            "message": "hello"
        }) }}>hello--{message}</h1>
        <ol>
            {msgList}
        </ol>
    </>

}
