
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import Carousel from '../components/Carousel';

const HomePage: React.FC = () => {
    const { t, addEnquiry, notices } = useStore();
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', qualification: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const images = [
        { src: 'https://via.placeholder.com/1200x500?text=Modern+College+Campus', alt: 'College Building' },
        { src: 'https://via.placeholder.com/1200x500?text=Advanced+Homeopathy+Lab', alt: 'Laboratory' },
        { src: 'https://via.placeholder.com/1200x500?text=Student+Community+Events', alt: 'Campus Life' },
    ];
    
    const whyChooseUsItems = [
        { icon: '🌿', text: t.naturalHealing, description: 'Embrace healing that works in harmony with your body.' },
        { icon: '❤️', text: t.holisticApproach, description: 'Treating the whole person, not just the symptoms.' },
        { icon: '📈', text: t.careerScope, description: 'A growing field with diverse opportunities.' },
        { icon: '🌟', text: t.fulfillingCareer, description: 'Make a real difference in people\'s lives.' },
    ];

    const careerProspects = [
      { icon: '🏥', text: t.homPharmacist },
      { icon: '🏬', text: t.retailDispensary },
      { icon: '🏭', text: t.manufacturingUnits },
      { icon: '🔬', text: t.qualityControl },
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
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-3 leading-tight" style={{fontFamily: "'Poppins', sans-serif"}}>{t.collegeIntro}</h1>
                    <p className="text-lg md:text-xl font-light">{t.foundedBy}</p>
                </div>
            </section>
            
            <div className="bg-amber-400 text-center py-4 px-4">
                <p className="font-bold text-xl text-gray-800 animate-pulse">{t.admissionsOpen}</p>
            </div>

             <section id="why-choose-us" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-teal-800 mb-12">{t.whyChooseHom}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUsItems.map(item => (
                            <div key={item.text} className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.text}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section id="notices" className="py-20 bg-teal-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-teal-800 mb-12">{t.latestNoticesHome}</h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {notices.slice(0, 3).map(notice => (
                            <div key={notice.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <span className="text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()}</span>
                                    <h3 className="font-semibold text-gray-800">{notice.title}</h3>
                                </div>
                                <NavLink to="/notice-board" className="text-teal-600 hover:text-teal-800 font-semibold text-sm whitespace-nowrap">
                                    Read More &rarr;
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <NavLink to="/notice-board" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors text-lg">
                            {t.viewAllNotices}
                        </NavLink>
                    </div>
                </div>
            </section>
            
            <section id="career" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                     <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="pr-8">
                             <h2 className="text-4xl font-bold text-teal-800 mb-4">{t.careerInHomPharmacy}</h2>
                             <p className="text-gray-600 mb-6 leading-relaxed">{t.careerIntro}</p>
                             <h3 className="text-2xl font-bold text-gray-700 mb-4">{t.careerProspects}</h3>
                             <ul className="space-y-4">
                                {careerProspects.map(item => (
                                    <li key={item.text} className="flex items-center">
                                        <span className="text-teal-500 text-3xl mr-4">{item.icon}</span>
                                        <span className="text-gray-700 text-lg">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                           <img src="https://via.placeholder.com/500x500?text=Future+in+Homeopathy" alt="Career in Homeopathy" className="rounded-xl shadow-2xl"/>
                        </div>
                    </div>
                </div>
            </section>


            <section id="enquiry" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
                        <h2 className="text-4xl font-bold text-center text-teal-800 mb-8">{t.admissionEnquiry}</h2>
                         {submitted ? (
                            <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
                                Thank you for your enquiry! We will get back to you soon.
                            </div>
                        ) : (
                            <form onSubmit={handleEnquirySubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <input type="text" name="name" placeholder={t.fullName} value={formData.name} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" required />
                                    <input type="tel" name="phone" placeholder={t.phoneNo} value={formData.phone} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" required />
                                    <input type="email" name="email" placeholder={t.yourEmail} value={formData.email} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" required />
                                    <input type="text" name="city" placeholder={t.city} value={formData.city} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" required />
                                </div>
                                <input type="text" name="qualification" placeholder={t.qualification} value={formData.qualification} onChange={handleEnquiryChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" required />
                                <textarea name="message" placeholder={t.yourMessage} value={formData.message} onChange={handleEnquiryChange} rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"></textarea>
                                <div className="text-center">
                                    <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors text-lg">{t.submitEnquiry}</button>
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