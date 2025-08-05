
import React from 'react';
import { useStore } from '../hooks/useStore';

const StaffPage: React.FC = () => {
    const { t, staff } = useStore();

    return (
        <div className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-extrabold text-teal-800 sm:text-5xl" style={{fontFamily: "'Poppins', sans-serif"}}>{t.ourFaculty}</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {staff.length > 0 ? (
                        staff.map(member => (
                            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <img src={member.photoUrl} alt={member.name} className="w-full h-64 object-cover object-center" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-teal-600 font-semibold mt-1">{member.designation}</p>
                                    <div className="mt-4 border-t border-gray-200 pt-4 text-left space-y-2 text-sm text-gray-600">
                                        <p><span className="font-semibold text-gray-800">{t.qualificationLabel}:</span> {member.qualification}</p>
                                        <p><span className="font-semibold text-gray-800">{t.experience}:</span> {member.experience}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full text-lg">{t.noStaff}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffPage;