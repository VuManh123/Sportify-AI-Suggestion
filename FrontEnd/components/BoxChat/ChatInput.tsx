'use client'
import Button from '../CustomComponent/Button'
import { IoIosSend } from "react-icons/io";
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

const URL = '';


const ChatInput = (props: any) => {
    let { handleAddMessage, fetchData } = props;
    const [message, setMessage] = useState<string>('');

    const handleOnChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleOnClickSend = () => {
        if (!message) {
            toast.error('Missing message');
            return
        }
        // let data = { message };
        console.log('send message: ', message);
        const url = `${URL}/api/v1/advanced-search/${message}`;
        // console.log('check data: ', data);
        handleAddMessage(message);


        // Gửi yêu cầu GET đến server bằng axios
        axios.get(url)
            .then(function (response) {
                console.log('Success:', response.data);
                // Xử lý dữ liệu trả về ở đây
                fetchData(response.data)
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
        // fetch('http://localhost:3000/aiSuggestion', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // }).then(res => res.json()).then(res => {
        //     if (res) {
        //         toast.success('Add success!');
        //         setMessage('');
        //         mutate('http://localhost:3000/aiSuggestion')
        //     }
        // });
        setMessage('');
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleOnClickSend();
        }
    };

    return (
        <div className='flex'>
            <input
                type="text"
                value={message}
                className='flex-1 rounded-full pl-5 mr-2'
                onChange={(event) => handleOnChangeMessage(event)}
                onKeyDown={handleKeyPress}
                placeholder='Nhập tên bài hát hoặc từ khóa'
            />
            <Button
                onClick={() => { handleOnClickSend() }}
                className="w-fit"
            >
                <IoIosSend size={20} />
            </Button>
        </div>
    )
}

export default ChatInput