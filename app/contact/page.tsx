"use client";
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
const ContactPage: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-3xl font-extrabold mb-6 mt-4 text-center text-gray-800">ติดต่อแอดมิน | LIVE CHAT</h1>
            <div className="bg-white border border-gray-300 p-4 w-full max-w-md md:max-w-screen-xl rounded-2xl">
                <div className="h-[50vh] overflow-y-scroll border-b border-gray-300 mb-4">
                    {messages.map((message, index) => (
                        <div key={index} className="flex items-start gap-2.5 justify-end mb-4">
                            <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-s-xl rounded-se-xl">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="text-sm font-semibold text-gray-900">Poonyapat Goonmanoon</span>
                                    <span className="text-sm font-normal text-gray-500"></span>
                                </div>
                                <p className="text-sm font-normal py-2.5 text-gray-900">{message}</p>
                                <span className="text-sm font-normal text-gray-500">ส่งแล้ว</span>
                            </div>
                            <Image className="w-8 h-8 rounded-full" src={'/bluecat.png'} width={30} height={30} alt="Test Img"/>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="ส่งข้อความของคุณ . . . "
                        className="flex-1 p-2 px-4 border border-gray-300 rounded-l-full focus:border-gray-400 focus:outline-none"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 px-4 bg-red-800 text-white rounded-r-full"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
