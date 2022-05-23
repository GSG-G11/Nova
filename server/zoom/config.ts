const env = process.env.NODE_ENV || 'production';

const config: any = {
  development: {
    APIKey: process.env.API_KEY,
    APISecret: process.env.API_SECRET,
  },
  production: {
    APIKey: process.env.API_KEY,
    APISecret: process.env.API_SECRET,
  },
};

export default config[env];
