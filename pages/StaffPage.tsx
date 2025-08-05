
import React from 'react';
import { useStore } from '../hooks/useStore';

const StaffPage: React.FC = () => {
    const { t, staff } = useStore();

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight sm:text-5xl">{t.ourFaculty}</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staff.length > 0 ? (
                        staff.map(member => (
                            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center transform hover:scale-105 transition-transform duration-300">
                                <img src={member.photoUrl} alt={member.name} className="w-full h-56 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-blue-600 font-semibold mt-1">{member.designation}</p>
                                    <div className="mt-4 border-t border-gray-200 pt-4 text-left space-y-2">
                                        <p><span className="font-semibold">{t.qualificationLabel}:</span> {member.qualification}</p>
                                        <p><span className="font-semibold">{t.experience}:</span> {member.experience}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">{t.noStaff}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffPage;
