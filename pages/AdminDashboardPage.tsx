
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
import { Notice, Staff } from '../types';

type AdminSection = 'notices' | 'staff' | 'enquiries' | 'messages';
type FormMode = 'add' | 'edit';

const AdminDashboardPage: React.FC = () => {
    const { 
        t, logout, notices, staff, enquiries, messages, 
        deleteNotice, deleteStaff, deleteEnquiry, deleteMessage, 
        addNotice, updateNotice, addStaff, updateStaff 
    } = useStore();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<AdminSection>('enquiries');
    
    // Unified state for forms
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<FormMode>('add');
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form data states
    const [noticeForm, setNoticeForm] = useState<Omit<Notice, 'id' | 'date'>>({ title: '', description: '', fileType: 'text', fileUrl: '' });
    const [staffForm, setStaffForm] = useState<Omit<Staff, 'id'>>({ name: '', designation: '', qualification: '', experience: '', photoUrl: '' });

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const resetForms = () => {
        setNoticeForm({ title: '', description: '', fileType: 'text', fileUrl: '' });
        setStaffForm({ name: '', designation: '', qualification: '', experience: '', photoUrl: '' });
        setShowForm(false);
        setEditingId(null);
    };

    // Notice handlers
    const handleNewNoticeClick = () => {
        setFormMode('add');
        resetForms();
        setNoticeForm({ title: '', description: '', fileType: 'text', fileUrl: '' });
        setShowForm(true);
    };

    const handleEditNoticeClick = (notice: Notice) => {
        setFormMode('edit');
        setEditingId(notice.id);
        setNoticeForm({ title: notice.title, description: notice.description, fileType: notice.fileType, fileUrl: notice.fileUrl });
        setShowForm(true);
    };

    const handleNoticeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formMode === 'add') {
            addNotice(noticeForm);
        } else if (editingId) {
            updateNotice({ ...noticeForm, id: editingId, date: notices.find(n => n.id === editingId)?.date || '' });
        }
        resetForms();
    };

    // Staff handlers
    const handleNewStaffClick = () => {
        setFormMode('add');
        resetForms();
        setStaffForm({ name: '', designation: '', qualification: '', experience: '', photoUrl: 'https://via.placeholder.com/200x200?text=Staff+Photo' });
        setShowForm(true);
    };
    
    const handleEditStaffClick = (staffMember: Staff) => {
        setFormMode('edit');
        setEditingId(staffMember.id);
        setStaffForm({ ...staffMember });
        setShowForm(true);
    };

    const handleStaffSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formMode === 'add') {
            addStaff(staffForm);
        } else if (editingId) {
            updateStaff({ ...staffForm, id: editingId });
        }
        resetForms();
    };
    
    const SectionButton: React.FC<{ section: AdminSection; label: string; count: number }> = ({ section, label, count }) => (
        <button
            onClick={() => { setActiveSection(section); resetForms(); }}
            className={`w-full text-left p-4 rounded-lg transition-colors ${activeSection === section ? 'bg-teal-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
            <span className="font-semibold">{label}</span>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${activeSection === section ? 'bg-white text-teal-600' : 'bg-gray-500 text-white'}`}>{count}</span>
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-teal-800">{t.adminPanel}</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">{t.logout}</button>
            </header>

            <div className="flex">
                <nav className="w-64 bg-white p-4 space-y-4 shadow-lg h-screen sticky top-0">
                    <SectionButton section="enquiries" label={t.admissionEnquiries} count={enquiries.length} />
                    <SectionButton section="messages" label={t.contactMessages} count={messages.length} />
                    <SectionButton section="notices" label={t.manageNotices} count={notices.length} />
                    <SectionButton section="staff" label={t.manageStaff} count={staff.length} />
                </nav>

                <main className="flex-1 p-8">
                    {activeSection === 'enquiries' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t.admissionEnquiries}</h2>
                            <div className="bg-white p-1 rounded-lg shadow-md">
                                {enquiries.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50"><tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.actions}</th>
                                            </tr></thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {enquiries.map(e => (<tr key={e.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">{e.phone}<br/>{e.email}</td>
                                                <td className="px-6 py-4 text-sm">{e.city} - {e.qualification}<br/><em className="text-gray-500">{e.message}</em></td>
                                                <td className="px-6 py-4"><button onClick={() => deleteEnquiry(e.id)} className="text-red-600 hover:text-red-900">{t.delete}</button></td>
                                            </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <p className="p-6">{t.noEnquiries}</p>}
                            </div>
                        </div>
                    )}
                    
                    {activeSection === 'messages' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-6">{t.contactMessages}</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                {messages.length > 0 ? (
                                    messages.map(m => (
                                        <div key={m.id} className="border-b pb-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold">{m.name} <span className="font-normal text-gray-500">&lt;{m.email}&gt;</span> {m.phone && <span className="text-sm text-gray-600">| {m.phone}</span>}</p>
                                                    <p className="mt-2 text-gray-700">{m.message}</p>
                                                    <p className="text-xs text-gray-400 mt-2">{new Date(m.submittedAt).toLocaleString()}</p>
                                                </div>
                                                <button onClick={() => deleteMessage(m.id)} className="text-red-600 hover:text-red-900 ml-4">{t.delete}</button>
                                            </div>
                                        </div>
                                    ))
                                ) : <p>{t.noMessages}</p>}
                            </div>
                        </div>
                    )}

                    {activeSection === 'notices' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">{t.manageNotices}</h2>
                                <button onClick={handleNewNoticeClick} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">{t.addNew}</button>
                            </div>
                             {showForm && (
                                <form onSubmit={handleNoticeSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
                                    <h3 className="text-xl font-semibold">{formMode === 'add' ? t.addNotice : t.editNotice}</h3>
                                    <input type="text" placeholder={t.title} value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} className="w-full p-2 border rounded" required/>
                                    <textarea placeholder={t.description} value={noticeForm.description} onChange={e => setNoticeForm({...noticeForm, description: e.target.value})} className="w-full p-2 border rounded" required></textarea>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">{t.fileType}</label>
                                        <select value={noticeForm.fileType} onChange={e => setNoticeForm({...noticeForm, fileType: e.target.value as Notice['fileType']})} className="w-full p-2 border rounded">
                                            <option value="text">{t.text}</option>
                                            <option value="pdf">{t.pdf}</option>
                                            <option value="image">{t.image}</option>
                                        </select>
                                    </div>
                                    {noticeForm.fileType !== 'text' && (
                                        <input type="text" placeholder={t.fileUrl} value={noticeForm.fileUrl} onChange={e => setNoticeForm({...noticeForm, fileUrl: e.target.value})} className="w-full p-2 border rounded" required/>
                                    )}
                                    <div className="space-x-2">
                                        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">{t.save}</button>
                                        <button type="button" onClick={resetForms} className="bg-gray-300 px-4 py-2 rounded">{t.cancel}</button>
                                    </div>
                                </form>
                            )}
                            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                {notices.map(n => (
                                    <div key={n.id} className="border-b pb-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{n.title} <span className="font-normal text-gray-500 text-sm">({new Date(n.date).toLocaleDateString()})</span></p>
                                            <p className="text-sm text-gray-600">{n.description.substring(0,100)}...</p>
                                        </div>
                                        <div className="space-x-2 flex-shrink-0 ml-4">
                                            <button onClick={() => handleEditNoticeClick(n)} className="text-blue-600 hover:text-blue-900">{t.edit}</button>
                                            <button onClick={() => deleteNotice(n.id)} className="text-red-600 hover:text-red-900">{t.delete}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'staff' && (
                         <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">{t.manageStaff}</h2>
                                <button onClick={handleNewStaffClick} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">{t.addNew}</button>
                            </div>
                            {showForm && (
                                <form onSubmit={handleStaffSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 space-y-4">
                                    <h3 className="text-xl font-semibold">{formMode === 'add' ? t.addStaff : t.editStaff}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder={t.fullName} value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} className="p-2 border rounded" required/>
                                        <input type="text" placeholder={t.designation} value={staffForm.designation} onChange={e => setStaffForm({...staffForm, designation: e.target.value})} className="p-2 border rounded" required/>
                                        <input type="text" placeholder={t.qualificationLabel} value={staffForm.qualification} onChange={e => setStaffForm({...staffForm, qualification: e.target.value})} className="p-2 border rounded" required/>
                                        <input type="text" placeholder={t.experience} value={staffForm.experience} onChange={e => setStaffForm({...staffForm, experience: e.target.value})} className="p-2 border rounded" required/>
                                        <input type="text" placeholder={t.photoUrl} value={staffForm.photoUrl} onChange={e => setStaffForm({...staffForm, photoUrl: e.target.value})} className="p-2 border rounded col-span-2" required/>
                                    </div>
                                    <div className="space-x-2">
                                        <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">{t.save}</button>
                                        <button type="button" onClick={resetForms} className="bg-gray-300 px-4 py-2 rounded">{t.cancel}</button>
                                    </div>
                                </form>
                            )}
                             <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                {staff.map(s => (
                                    <div key={s.id} className="border-b pb-4 flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <img src={s.photoUrl} alt={s.name} className="w-16 h-16 rounded-full object-cover"/>
                                            <div>
                                                <p className="font-bold">{s.name} <span className="font-normal text-teal-600">({s.designation})</span></p>
                                                <p className="text-sm">{s.qualification}, {s.experience}</p>
                                            </div>
                                        </div>
                                        <div className="space-x-2 flex-shrink-0 ml-4">
                                            <button onClick={() => handleEditStaffClick(s)} className="text-blue-600 hover:text-blue-900">{t.edit}</button>
                                            <button onClick={() => deleteStaff(s.id)} className="text-red-600 hover:text-red-900">{t.delete}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardPage;