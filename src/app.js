import express from "express";
import session from "express-session";
import { config } from "dotenv";
import connection from "./config/database.config.js";
import routes from "./routes/index.js";
import EnvConstant from "./common/constant/env.constant.js";
import passport from "./config/passport.config.js";
// Config to read env file
config();
// Port
const PORT = EnvConstant.PORT || 3000;

// Create app
const app = express();
// Connect database
connection();
// Body parser
app.use(express.json());
// Session
app.use(
  session({
    secret: EnvConstant.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport
app.use(passport.initialize());
app.use(passport.session());
// Router
app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server is running at port : " + PORT);
});
