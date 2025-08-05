
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { COLLEGE_INFO } from '../constants';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useStore();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'hi' : 'en');
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
        }`;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center space-x-2">
                             <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                            </svg>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-blue-800 leading-tight">{COLLEGE_INFO.name}</span>
                            </div>
                        </NavLink>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink to="/" className={navLinkClass}>{t.home}</NavLink>
                        <NavLink to="/notice-board" className={navLinkClass}>{t.noticeBoard}</NavLink>
                        <NavLink to="/staff" className={navLinkClass}>{t.staff}</NavLink>
                        <NavLink to="/contact" className={navLinkClass}>{t.contact}</NavLink>
                        <NavLink to="/admin" className={navLinkClass}>{t.adminLogin}</NavLink>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={toggleLanguage}
                            className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {language === 'en' ? 'हिन्दी' : 'English'}
                        </button>
                        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                </div>
                 <div className="hidden w-full md:hidden" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                        <li><NavLink to="/" className={({isActive}) => `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-900'}`} aria-current="page">{t.home}</NavLink></li>
                        <li><NavLink to="/notice-board" className={({isActive}) => `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-900'}`}>{t.noticeBoard}</NavLink></li>
                        <li><NavLink to="/staff" className={({isActive}) => `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-900'}`}>{t.staff}</NavLink></li>
                        <li><NavLink to="/contact" className={({isActive}) => `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-900'}`}>{t.contact}</NavLink></li>
                        <li><NavLink to="/admin" className={({isActive}) => `block py-2 px-3 rounded ${isActive ? 'text-white bg-blue-700' : 'text-gray-900'}`}>{t.adminLogin}</NavLink></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
