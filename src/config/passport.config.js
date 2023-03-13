import passport from "passport";
import local from "passport-local";
import GithubStrategy from "passport-github2";
import GoogleStrategy from "passport-google-oauth20"
import User from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/cryptPassword.js";
import { githubID, githubSecret } from "../config/index.js";
import { googleID, googleSecret } from "../config/index.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    // Registro
    passport.use('register', new localStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req,username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try{
                const user = await User.findOne({ email: username });

                if(user){
                    console.log('Usuario existe');
                    return done(null, false)
                }

                const newUserInfo = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password)
                }

                const newUser = await User.create(newUserInfo)

                return done(null, newUser)
            } catch(error){
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    });

    // Login
    passport.use('login', new localStrategy({usernameField: 'email'}, async(username, password, done) => {
        try {
            const user = await User.findOne({email: username})

            if(!user){
                console.log('Usuario no existe')
                return done(null, false)
            }

            if(!isValidPassword(user, password)){
                return done(null,false)
            } else {
                return done(null, user)
            }

        } catch (error) {}
    }));

    // Terceros
    passport.use(
        'github', 
        new GithubStrategy({
        clientID: githubID,
        clientSecret: githubSecret,
        callbackURL: 'http://localhost:8080/auth/githubcallback'
        }, 
        async (accesToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({email: profile._json.email})
    
                if(!user){
                    const newUserInfo = {
                        first_name:  profile._json.name,
                        last_name: '',
                        age: '',
                        email: profile._json.email,
                        password: ''
                    }
    
                    const newUser = await User.create(newUserInfo);
                    done(null, newUser);
                }
                return done(null,user)
            } catch (error) {
                done(error)
            }
        })
    );

    passport.use('google', new GoogleStrategy({
        clientID: googleID,
        clientSecret: googleSecret,
        callbackURL: 'http://localhost:8080/auth/google/callback',
    }, async (accesToken,refreshToken, profile, done) => {
        try {
            const user = await User.findOne({googleId: profile._json.sub})

            if(!user){
                const newUserInfo = {
                    googleId: profile._json.sub,
                    first_name:  profile._json.given_name,
                    last_name: profile._json.family_name,
                    age: '',
                    email: profile._json.email,
                    password: ''
                }; 

                const newUser = await User.create(newUserInfo)

                return done(null, newUser)
            } 

            done(null,user)
        } catch(error){
            done(error);
        }})
    );

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        done(null, user)
    });

    // Login
    passport.use('login', new localStrategy({usernameField: 'email'}, async(username, password, done) => {
        try {
            const user = await User.findOne({email: username})

            if(!user){
                console.log('Usuario no existe')
                return done(null, false)
            }

            if(!isValidPassword(user, password)){
                return done(null,false)
            } else {
                return done(null, user)
            }

        } catch (error) {}
    }))
};

export default initializePassport;

// Validación de admin / Esto debería ir en login
// if(req.user.email === 'adminCoder@coder.com' && req.user.password === 'adminCod3r123'){
//     req.session.user = {
//         first_name: 'Admin',
//         last_name: '',
//         email: 'adminCoder@coder.com',
//         admin: true
//     }
//     return res.json({message: 'Sesión iniciada como administrador'})
// }