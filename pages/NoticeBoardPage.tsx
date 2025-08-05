
import React from 'react';
import { useStore } from '../hooks/useStore';

const NoticeBoardPage: React.FC = () => {
    const { t, notices } = useStore();

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight sm:text-5xl">{t.latestNotices}</h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {notices.length > 0 ? (
                        notices.map(notice => (
                            <div key={notice.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
                                <h2 className="text-2xl font-bold text-gray-800">{notice.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">{t.date}: {new Date(notice.date).toLocaleDateString()}</p>
                                <p className="text-gray-700 mt-4">{notice.description}</p>
                                {notice.fileUrl && (
                                    <a 
                                        href={notice.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-block mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        {t.download}
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">{t.noNotices}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeBoardPage;
