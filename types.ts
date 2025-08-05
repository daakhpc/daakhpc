
export interface Notice {
  id: string;
  title: string;
  date: string;
  description: string;
  fileType: 'text' | 'pdf' | 'image';
  fileUrl?: string;
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  photoUrl: string;
}

export interface AdmissionEnquiry {
  id:string;
  name: string;
  phone: string;
  email: string;
  city: string;
  qualification: string;
  message: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}