export interface Pet {
  id: string;
  name: string;
  age: number;
  breed: string;
  vaccines: string[];
  imageUrl: string;
  institution: {
    name: string;
    email: string;
    whatsapp: string;
  };
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface PetFormData {
  name: string;
  age: number;
  breed: string;
  vaccines: string[];
  imageUrl: string;
  institutionName: string;
  institutionEmail: string;
  institutionWhatsapp: string;
  description?: string;
}