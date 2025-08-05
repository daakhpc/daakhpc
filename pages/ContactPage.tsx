
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { COLLEGE_INFO } from '../constants';

const ContactPage: React.FC = () => {
    const { t, addMessage } = useStore();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMessage(formData);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight sm:text-5xl">{t.getInTouch}</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.ourLocation}</h2>
                        <div className="space-y-4 text-gray-700">
                            <p className="flex items-start">
                                <svg className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>{COLLEGE_INFO.address}</span>
                            </p>
                             <p className="flex items-center">
                                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <span>{COLLEGE_INFO.phone}</span>
                            </p>
                             <p className="flex items-center">
                                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>{COLLEGE_INFO.email}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.contactForm}</h2>
                        {submitted ? (
                            <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
                                Thank you for your message! We will get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <input type="text" name="name" placeholder={t.yourName} value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                <input type="email" name="email" placeholder={t.yourEmail} value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                <textarea name="message" placeholder={t.yourMessage} value={formData.message} onChange={handleChange} rows={5} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required></textarea>
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg">{t.sendMessage}</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
