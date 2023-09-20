import { config } from "dotenv";
config();

const EnvConstant = {
  PORT: process.env.PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_URI: process.env.DB_URI,
  SALT_ROUND: parseInt(process.env.SALT_ROUND, 10),
};

export default EnvConstant;
