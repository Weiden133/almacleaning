export interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  unit: string;
}

export interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string;
} 