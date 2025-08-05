
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { COLLEGE_INFO } from '../constants';
import Carousel from '../components/Carousel';
import { AdmissionEnquiry } from '../types';

const HomePage: React.FC = () => {
    const { t, addEnquiry } = useStore();
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', qualification: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const images = [
        { src: 'https://via.placeholder.com/1200x500?text=College+Building', alt: 'College Building' },
        { src: 'https://via.placeholder.com/1200x500?text=Laboratory', alt: 'Laboratory' },
        { src: 'https://via.placeholder.com/1200x500?text=Campus+Life', alt: 'Campus Life' },
    ];
    
    const whyChooseUsItems = [
        { icon: '✅', text: t.naturalHealing },
        { icon: '✅', text: t.holisticApproach },
        { icon: '✅', text: t.careerScope },
        { icon: '✅', text: t.growingDemand },
        { icon: '✅', text: t.fulfillingCareer },
    ];

    const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEnquirySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addEnquiry(formData);
        setSubmitted(true);
        setFormData({ name: '', phone: '', email: '', city: '', qualification: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="bg-white">
            <section className="relative">
                <Carousel images={images} />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{t.collegeIntro}</h1>
                    <p className="text-lg md:text-xl mb-6">{t.foundedBy}</p>
                </div>
            </section>
            
            <div className="bg-amber-400 text-center py-4 px-4 text-gray-800 font-bold text-xl shadow-lg">
                <p>{t.admissionsOpen}</p>
            </div>

            <section id="about" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-blue-800 mb-6">{t.whyChooseHom}</h2>
                            <ul className="space-y-4">
                                {whyChooseUsItems.map(item => (
                                    <li key={item.text} className="flex items-start">
                                        <span className="text-green-500 text-2xl mr-3">{item.icon}</span>
                                        <span className="text-gray-700 text-lg">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                                <h3 className="font-bold text-xl mb-2 text-blue-800">{t.courseOffered}</h3>
                                <p className="text-gray-600 font-semibold">{t.dhp}</p>
                                <p className="text-gray-500">{t.duration}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                                <h3 className="font-bold text-xl mb-2 text-green-800">{t.eligibility}</h3>
                                <p className="text-gray-600">{t.eligibilityDetail}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
                                <h3 className="font-bold text-xl mb-2 text-red-800">{t.fees}</h3>
                                <p className="text-gray-600">{t.feesDetail}</p>
                                <p className="text-gray-500 text-sm">{t.examFeeExtra}</p>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
                                <h3 className="font-bold text-xl mb-2 text-purple-800">{t.recognition}</h3>
                                <p className="text-gray-600">{t.recognitionDetail}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="enquiry" className="py-16 bg-blue-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">{t.admissionEnquiry}</h2>
                         {submitted ? (
                            <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
                                Thank you for your enquiry! We will get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleEnquirySubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder={t.fullName} value={formData.name} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                    <input type="tel" name="phone" placeholder={t.phoneNo} value={formData.phone} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                    <input type="email" name="email" placeholder={t.yourEmail} value={formData.email} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                    <input type="text" name="city" placeholder={t.city} value={formData.city} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                                <input type="text" name="qualification" placeholder={t.qualification} value={formData.qualification} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" required />
                                <textarea name="message" placeholder={t.yourMessage} value={formData.message} onChange={handleEnquiryChange} rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                                <div className="text-center">
                                    <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg">{t.submitEnquiry}</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
