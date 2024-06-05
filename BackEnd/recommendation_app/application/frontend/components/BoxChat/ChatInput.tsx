import Button from '../CustomComponent/Button';
import { IoIosSend } from 'react-icons/io';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost:5500'; // URL của máy chủ

const ChatInput = (props: any) => {
  let { handleAddMessage, fetchData } = props;
  const [message, setMessage] = useState<string>('');

  const handleOnChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleOnClickSend = () => {
    if (!message) {
      toast.error('Missing message');
      return;
    }

    console.log('Sending message:', message);
    const url = `${URL}/input`; // Endpoint mới

    // Gửi yêu cầu POST đến server bằng axios
    axios
      .post(url, { message })
      .then(function (response) {
        console.log('Success:', response.data);
        // Xử lý dữ liệu trả về ở đây
        fetchData(response.data);
      })
      .catch(function (error) {
        console.error('Error:', error);
      });

    setMessage('');
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleOnClickSend();
    }
  };

  return (
    <div className='flex'>
      <input
        type='text'
        value={message}
        className='flex-1 rounded-full pl-5 mr-2'
        onChange={(event) => handleOnChangeMessage(event)}
        onKeyDown={handleKeyPress}
        placeholder='Nhập tên bài hát hoặc từ khóa'
      />
      <Button onClick={() => handleOnClickSend()} className='w-fit'>
        <IoIosSend size={20} />
      </Button>
    </div>
  );
};

export default ChatInput;
