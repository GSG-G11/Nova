import userSchema from '../models/user';

const createAccount = async ({
  email, hashedPassword, name, role, accessToken,
} : { email: string, hashedPassword: string, name: string,
  role: string, accessToken: string }) => {
  const password: string = hashedPassword;
  const user = await userSchema.create({
    email, password, name, role, accessToken,
  });
  return user;
};

const findAccount = async (data: object) => {
  const user = await userSchema.findOne({ data });
  return user;
};

const updateValidate = async (data: object, check:boolean) => {
  const updated = await userSchema.updateOne({ data }, { $set: { is_verified: check } });
  return updated;
};

const deleteAccount = async (data: object) => {
  const user = await userSchema.deleteOne({ data });
  return user;
};

export {
  createAccount, findAccount, deleteAccount, updateValidate,
};
