'use client'
import { mutate } from 'swr';
import useSWR from 'swr'
import ChatInput from './ChatInput';
import ChatDisplay from './ChatDisplay';
import { useState } from 'react';

const BoxChat = (props: any) => {
    let { fetchData } = props
    const [messages, setMessages] = useState([
        { message: 'xin chào' }
    ]);

    const handleAddMessage = (message: any) => {
        const data = {
            message: message
        }
        setMessages([...messages, data]);
    }



    return (
        <div className='flex flex-col m-2 p-2 pr-5 h-full border-r border-solid border-gray-300'>
            <ChatDisplay messages={messages} />
            <ChatInput handleAddMessage={handleAddMessage} fetchData={fetchData} />
        </div>
    )
}

export default BoxChat