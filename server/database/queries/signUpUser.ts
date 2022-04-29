import userSchema from '../models/user';

const createAccount = async ({
  email, hashedPassword, name, role,
} : { email: string, hashedPassword: string, name: string, role: string }) => {
  const password: string = hashedPassword;
  const user = await userSchema.create({
    email, password, name, role,
  });
  return user;
};

const findAccount = async (email: string) => {
  const user = await userSchema.findOne({ email });
  return user;
};

const deleteAccount = async (email: string) => {
  const user = await userSchema.deleteOne({ email });
  return user;
};

export { createAccount, findAccount, deleteAccount };
