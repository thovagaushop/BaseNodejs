import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as userService from "../services/user.service.js";
import * as bcrypt from "bcrypt";
import MessageConstant from "../common/constant/message.constant.js";
import EnvConstant from "../common/constant/env.constant.js";

passport.use(
  new LocalStrategy(
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

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: EnvConstant.JWT_SECRET,
    },
    async function (payload, done) {
      try {
        console.log("Payload : ", payload);
        const user = await userService.findOne({ id: payload.sub });
        console.log("Vao day");
        if (!user)
          return done(null, false, { message: MessageConstant.USER_NOT_FOUND });
        else return done(null, user);
      } catch (error) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: EnvConstant.GOOGLE_CLIENT_ID,
      clientSecret: EnvConstant.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: `${EnvConstant.SERVER_URL}/api/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log("Profile: ", profile);
      done(null, profile);
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
