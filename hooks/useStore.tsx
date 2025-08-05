
import React, { createContext, useContext, ReactNode } from 'react';
import { Notice, Staff, AdmissionEnquiry, ContactMessage } from '../types';
import { translations } from '../lib/translations';
import { useLocalStorage } from './useLocalStorage';

type Language = 'en' | 'hi';

interface StoreState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  notices: Notice[];
  staff: Staff[];
  enquiries: AdmissionEnquiry[];
  messages: ContactMessage[];
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  updateNotice: (notice: Notice) => void;
  deleteNotice: (id: string) => void;
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;
  addEnquiry: (enquiry: Omit<AdmissionEnquiry, 'id' | 'submittedAt'>) => void;
  deleteEnquiry: (id: string) => void;
  addMessage: (message: Omit<ContactMessage, 'id' | 'submittedAt'>) => void;
  deleteMessage: (id: string) => void;
}

const StoreContext = createContext<StoreState | undefined>(undefined);

const initialNotices: Notice[] = [
    { id: '1', title: 'Orientation for Batch 2025', date: new Date().toLocaleDateString('en-CA'), description: 'Orientation program will be held on July 10, at 10:00 AM in the college auditorium.' }
];

const initialStaff: Staff[] = [
    { id: '1', name: 'Dr. Shabana Ali', designation: 'Principal', qualification: 'M.D. (Hom.)', experience: '12 Years', photoUrl: 'https://via.placeholder.com/200x200?text=Dr.+Shabana' },
    { id: '2', name: 'Mr. Rahul Verma', designation: 'Lecturer', qualification: 'B.Pharm (Hom.)', experience: '5 Years', photoUrl: 'https://via.placeholder.com/200x200?text=Mr.+Rahul' }
];

const initialEnquiries: AdmissionEnquiry[] = [
    { id: '1', name: 'Amit Sharma', phone: '9876543210', email: 'amit@example.com', city: 'Meerut', qualification: '12th Bio', message: 'Interested in DHP course.', submittedAt: new Date().toISOString() }
];

const initialMessages: ContactMessage[] = [
    { id: '1', name: 'Neha Gupta', email: 'neha@example.com', message: 'I have a query about the admission process.', submittedAt: new Date().toISOString() }
];

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useLocalStorage<Language>('language', 'en');
    const [notices, setNotices] = useLocalStorage<Notice[]>('notices', initialNotices);
    const [staff, setStaff] = useLocalStorage<Staff[]>('staff', initialStaff);
    const [enquiries, setEnquiries] = useLocalStorage<AdmissionEnquiry[]>('enquiries', initialEnquiries);
    const [messages, setMessages] = useLocalStorage<ContactMessage[]>('messages', initialMessages);
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);

    const t = translations[language];

    const value: StoreState = {
        language,
        setLanguage,
        t,
        isAuthenticated,
        login: () => setIsAuthenticated(true),
        logout: () => setIsAuthenticated(false),
        notices,
        addNotice: (notice) => {
            const newNotice: Notice = { ...notice, id: Date.now().toString(), date: new Date().toLocaleDateString('en-CA') };
            setNotices(prev => [newNotice, ...prev]);
        },
        updateNotice: (updated) => setNotices(prev => prev.map(n => n.id === updated.id ? updated : n)),
        deleteNotice: (id) => setNotices(prev => prev.filter(n => n.id !== id)),
        staff,
        addStaff: (s) => {
             const newStaff: Staff = { ...s, id: Date.now().toString() };
             setStaff(prev => [newStaff, ...prev]);
        },
        updateStaff: (updated) => setStaff(prev => prev.map(s => s.id === updated.id ? updated : s)),
        deleteStaff: (id) => setStaff(prev => prev.filter(s => s.id !== id)),
        enquiries,
        addEnquiry: (enquiry) => {
            const newEnquiry: AdmissionEnquiry = { ...enquiry, id: Date.now().toString(), submittedAt: new Date().toISOString() };
            setEnquiries(prev => [newEnquiry, ...prev]);
        },
        deleteEnquiry: (id) => setEnquiries(prev => prev.filter(e => e.id !== id)),
        messages,
        addMessage: (message) => {
            const newMessage: ContactMessage = { ...message, id: Date.now().toString(), submittedAt: new Date().toISOString() };
            setMessages(prev => [newMessage, ...prev]);
        },
        deleteMessage: (id) => setMessages(prev => prev.filter(m => m.id !== id)),
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
