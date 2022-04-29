import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => bcrypt.hash(password, 10);

const comparePassword = async (password:string, hash:string) => bcrypt.compare(password, hash);

export { hashPassword, comparePassword };
