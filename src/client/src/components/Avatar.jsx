import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './../index.css';

export default function ImageAvatars() {
    return (
        <div className='img=container'>
            <div className='flex flex-row flex-wrap gap-20 mt-20 justify-center mx-5'>
                <a href="https://github.com/BertoRichardo">
                    <img src="berto.jpg" alt="" className='rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:w-72 lg:h-72 md:w-56 md:h-56 w-28 h-28 transition duration-300 ease-in-out hover:scale-125' />
                </a>
                <a href="https://github.com/qrst0">
                    <img src="kris.jpg" alt="" className='rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:w-72 lg:h-72 md:w-56 md:h-56 w-28 h-28 transition duration-300 ease-in-out hover:scale-125' />
                </a>
                <a href="https://github.com/ninoaddict">
                    <img src="adril.jpg" alt="" className='rounded-full ring-2 ring-gray-300 dark:ring-gray-500 p-1 lg:w-72 lg:h-72 md:w-56 md:h-56 w-28 h-28 transition duration-300 ease-in-out hover:scale-125' />
                </a>
            </div>
        </div>
    )
}