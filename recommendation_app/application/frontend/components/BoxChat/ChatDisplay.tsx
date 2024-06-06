import React, { useState } from 'react'
import Message from '../Message/Message';
import { twMerge } from 'tailwind-merge';

interface IMessageProps {
    className?: string;
    messages: IMessage[]
}
const ChatDisplay: React.FC<IMessageProps> = ({
    messages,
    className
}) => {
    return (
        <div className={twMerge('flex flex-1 flex-col items-end justify-end overflow-y-hidden mb-4', className)}>
            {
                messages && messages.map((item, index) => {
                    return (
                        <Message key={index} message={item}></Message>
                    )
                })
            }

        </div>
    )
}

export default ChatDisplay