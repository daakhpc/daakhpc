
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { COLLEGE_INFO, INITIAL_VISITOR_COUNT } from '../constants';

const Footer: React.FC = () => {
    const { t } = useStore();
    const [visitorCount, setVisitorCount] = useLocalStorage('visitorCount', INITIAL_VISITOR_COUNT);

    useEffect(() => {
        // Increment count only once per session
        const hasVisited = sessionStorage.getItem('hasVisited');
        if (!hasVisited) {
            setVisitorCount(prevCount => prevCount + 1);
            sessionStorage.setItem('hasVisited', 'true');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">{COLLEGE_INFO.name}</h3>
                        <p className="text-gray-400">{COLLEGE_INFO.address}</p>
                        <p className="text-gray-400 mt-2">{t.phone}: {COLLEGE_INFO.phone}</p>
                        <p className="text-gray-400">{t.email}: {COLLEGE_INFO.email}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">{t.contact}</h3>
                        <ul className="space-y-2">
                            <li><NavLink to="/" className="text-gray-400 hover:text-white transition-colors">{t.home}</NavLink></li>
                            <li><NavLink to="/notice-board" className="text-gray-400 hover:text-white transition-colors">{t.noticeBoard}</NavLink></li>
                            <li><NavLink to="/staff" className="text-gray-400 hover:text-white transition-colors">{t.staff}</NavLink></li>
                            <li><NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors">{t.contact}</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4">{t.visitorCount}</h3>
                        <div className="bg-gray-900 text-3xl font-mono p-4 rounded-lg text-center text-green-400">
                            {visitorCount.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <p className="text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} {COLLEGE_INFO.name}. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
