'use strict';
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      console.log('passport alku username', [username]);
      console.log('passport alku passw', [password]);

      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);    //tietokanta haku, vastaus on taulukko
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        //  use bcrypt to check of passwords don't match
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        console.log('passport loga onnistu');
        delete user.password;   // delete user poistaisi koko objektin > nyt poistetaan vain salasana kulkemasta mukana
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type > tavallinen objekti
      } catch (err) {
        return done(err);
      }
    }));


// JWT strategy for handling bearer token
passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
          secretOrKey   : 'webprojekti2019'
    },
    async (jwtPayload, done) => {
      console.log('payload', jwtPayload);
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      try {
        console.log('payloadin try');
        const [user] = await userModel.getUser(jwtPayload.user_id);
        if(user === undefined)
          return done(null, false);
        return done(null, {...user});
      } catch (err) {
        return done(err);
      }
    },
));


module.exports = passport;
