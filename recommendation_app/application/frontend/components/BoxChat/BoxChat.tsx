'use client'
import { mutate } from 'swr';
import useSWR from 'swr'
import ChatInput from './ChatInput';
import ChatDisplay from './ChatDisplay';
import { useState } from 'react';
import axios from 'axios';

interface IMessage {
    message: string;
    isUser: boolean;
}

const BoxChat = (props: any) => {
    let { fetchData } = props
    const [messages, setMessages] = useState([
        { message: 'xin chào' }
    ]);

    // const handleAddMessage = async (message: any) => {
    //     const data = {
    //         message: message
    //     };
        
    //     setMessages([...messages, data]);
    // };
    const handleAddMessage = async (message: any) => {
        const userMessage = { message: message, isUser: true };
        const aiMessage = { message: `Đây là 1 số bài hát liên quan đến "${message}"`, isUser: false };

        setMessages([...messages, userMessage, aiMessage]);
    };



    return (
        <div className='flex flex-col m-2 p-2 pr-5 h-full border-r border-solid border-gray-300'>
            <ChatDisplay messages={messages} />
            <ChatInput handleAddMessage={handleAddMessage} fetchData={fetchData} />
        </div>
    )
}

export default BoxChat