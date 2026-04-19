import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Home({ results }) {
    const [search, setSearch] = useState('');
    const currentPage = results.current_page ?? 1;
    const lastPage = results.last_page ?? 1;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        router.get('/', { search: e.target.value }, { preserveState: true });
    };
    
    const speak = (text) => {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'zh-CN';
        window.speechSynthesis.speak(msg);
    };

    const pageNumbers = [];
    if (lastPage > 1) {
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(lastPage, currentPage + 2);

        if (start > 1) {
            pageNumbers.push(1);
            if (start > 2) {
                pageNumbers.push('start-ellipsis');
            }
        }

        for (let i = start; i <= end; i += 1) {
            pageNumbers.push(i);
        }

        if (end < lastPage) {
            if (end < lastPage - 1) {
                pageNumbers.push('end-ellipsis');
            }
            pageNumbers.push(lastPage);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <input 
                    className="w-full p-4 rounded-xl shadow-sm border border-gray-200 focus:border-[#ff9900] focus:ring-2 focus:ring-orange-100 outline-none transition"
                    placeholder="Type Hanzi or Pinyin..."
                    value={search}
                    onChange={handleSearch}
                />

                <div className="mt-6 space-y-4">
                    {results.data.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-wrap justify-between items-center gap-4">
                            <div className="min-w-0">
                                <h2 className="text-4xl font-bold text-gray-900 truncate">{item.simplified}</h2>
                                <p className="text-[#ff9900] font-medium mt-2">{item.pinyin}</p>
                                <p className="text-gray-600 mt-3">{item.meaning}</p>
                            </div>
                            <button 
                                onClick={() => speak(item.simplified)}
                                className="bg-[#ff9900] hover:bg-orange-500 text-white p-4 rounded-full transition-shadow shadow-md shadow-orange-200 flex items-center justify-center"
                                title="Speak"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path fill="white" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-sm text-gray-600">
                    <p className="font-medium text-gray-800">Total entries: {results.total ?? 0}</p>
                </div>

                {pageNumbers.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
                        <button
                            onClick={() => router.get('/', { search, page: Math.max(1, currentPage - 1) })}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            Previous
                        </button>

                        {pageNumbers.map((item, idx) => {
                            if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                                return (
                                    <span key={idx} className="px-3 py-2 text-sm text-gray-500">…</span>
                                );
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => router.get('/', { search, page: item })}
                                    className={`w-10 h-10 rounded-full text-sm font-medium transition ${
                                        item === currentPage
                                            ? 'bg-[#ff9900] text-white shadow-lg'
                                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-orange-100'
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => router.get('/', { search, page: Math.min(lastPage, currentPage + 1) })}
                            disabled={currentPage === lastPage}
                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition ${
                                currentPage === lastPage
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}