import passport from "passport";
import { Strategy } from "passport-local";
import * as userService from "../services/user.service.js";
import * as bcrypt from "bcrypt";
import MessageConstant from "../common/constant/message.constant.js";

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userService.findOne({ email });
        if (!user)
          return done(null, false, { message: MessageConstant.WRONG_EMAIL });
        else if (!bcrypt.compareSync(password, user.password))
          return done(null, false, { message: MessageConstant.WRONG_PASSWORD });
        else {
          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.findOne({ id });
  done(null, user);
});

export default passport;
