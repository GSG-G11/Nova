interface Body {
  name: string;
  email: string;
  password: string;
  role: string;
  languages?: Array<string>;
  specialization?: string;
  cv?: string;
  level?: string;
  }

export default Body;
