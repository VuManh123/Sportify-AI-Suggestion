import React from 'react';

const Message = (props: { message: string, isUser: boolean }) => {
  const { message, isUser } = props;
  return (
    <div className={`p-2 m-2 rounded max-w-xs break-words ${isUser ? 'bg-blue-200' : 'bg-gray-200'}`}>
      {message}
    </div>
  );
}

export default Message;
