
import React from 'react';
import { useStore } from '../hooks/useStore';

const NoticeBoardPage: React.FC = () => {
    const { t, notices } = useStore();

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-teal-800 sm:text-5xl" style={{fontFamily: "'Poppins', sans-serif"}}>{t.latestNotices}</h1>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {notices.length > 0 ? (
                        notices.map(notice => (
                            <div key={notice.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-500">
                                <h2 className="text-2xl font-bold text-gray-800">{notice.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">{t.date}: {new Date(notice.date).toLocaleDateString()}</p>
                                
                                {notice.fileType === 'text' && (
                                    <p className="text-gray-700 mt-4">{notice.description}</p>
                                )}

                                {notice.fileType === 'image' && notice.fileUrl && (
                                     <>
                                        <p className="text-gray-700 mt-4">{notice.description}</p>
                                        <img src={notice.fileUrl} alt={notice.title} className="mt-4 rounded-lg shadow-md max-w-full h-auto" />
                                    </>
                                )}
                                
                                {notice.fileType === 'pdf' && notice.fileUrl && (
                                    <>
                                        <p className="text-gray-700 mt-4">{notice.description}</p>
                                        <a 
                                            href={notice.fileUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="inline-flex items-center mt-4 bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"></path></svg>
                                            {t.download}
                                        </a>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg">{t.noNotices}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeBoardPage;