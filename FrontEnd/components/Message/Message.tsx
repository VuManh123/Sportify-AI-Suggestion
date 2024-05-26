import React from 'react'
import { twMerge } from 'tailwind-merge';
interface IMessageProps {
    className?: string;
    message: IMessage
}
const Message: React.FC<IMessageProps> = ({
    message,
    className
}) => {
    return (
        <div className={twMerge(`mr-2 mt-2 p-2 bg-green-500 text-white rounded-lg text-lg text-left max-w-90 text-wrap min-h-11`, className)}>
            {message.message}
        </div>
    )
}

export default Message