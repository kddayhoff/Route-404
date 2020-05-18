var bcrypt = require('bcryptjs');

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require("passport-local").Strategy;
    // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
    passport.use('local-signup', new LocalStrategy(
        // Our user will sign in using an email, rather than a "username"
        {
            usernameField: "email",
            passReqToCallback: true
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };


            // When a user tries to sign in this code runs
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (dbUser) {

                if (dbUser) {
                    return done(null, false, { message: "That email is already taken" });
                }

                // If there's no user with the given email
                else {

                    var userPassword = generateHash(password);

                    var data = {
                        email: email,
                        password: userPassword
                    }

                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    })

                }
            });
        }
    ));

    // In order to help keep authentication state across HTTP requests,
    // Sequelize needs to serialize and deserialize the user
    // Just consider this part boilerplate needed to make it all work
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (user, cb) {

        User.findOne({ where: { id: user.id } }).then(function (user) {
            if (user) {
                cb(null, user.get());
            } else {

                cb(user.errors, null);
            }
        });
    });

}   