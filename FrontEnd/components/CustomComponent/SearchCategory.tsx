import React from 'react';
import Link from 'next/link';

const SearchCategory = () => {
    // const randColor = () => {
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // }

    // const randomColor1 = randColor();
    // const randomColor2 = randColor();
    // const gradient = `linear-gradient(to bottom right, ${randomColor1}, ${randomColor2})`;

    // const gradientDiv = document.getElementsByClassName('gradientDiv');
    // gradientDiv.style.background = gradient;

    return (
        <div className=''>
            <Link href={'#hdhdh'}>
                <div className="mr-6 mb-6 rounded-2xl max-w-80 max-h-80 min-w-44 min-h-44 cursor-pointer bg-gradient-to-br from-blue-500 to-green-500">
                    <h2 className='p-3 text-xl'>Tên cate</h2>
                </div>
            </Link >

        </div>
    )
}

export default SearchCategory