import Hapi from 'hapi';
import Routes from './routes/';
import Handlebars from 'handlebars';
import Inert from 'inert';
import Extend from 'handlebars-extend-block';
import hapiAuthCookie from 'hapi-auth-cookie';
import cookiePassword, { PORT } from './config/config';

require('dotenv').load(); // Load .env file for evoriment vars

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: PORT || 8000
});
// Registra plugins de Hapijs
server.register([require('vision'),
    { register: hapiAuthCookie },
    { register: require('hapi-postgres-connection') },
    { register: Inert }
], (err) => {
    if (err) {
        console.log("Failed to load module. ", err);
    }
    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
        password: cookiePassword,
        cookie: 'sid-aiep',
        redirectTo: '/login',
        isSecure: false,
        validateFunc: function(request, session, callback) {

            cache.get(session.sid, (err, cached) => {

                if (err) {
                    return callback(err, false);
                }

                if (!cached) {
                    return callback(null, false);
                }

                return callback(null, true, cached.account);
            });
        }
    });
    // Add the route
    server.route(Routes);
});

//Configure VIEWS

server.views({
    engines: {
        html: Extend(Handlebars)
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
        //helpersPath: 'views/helpers'
})

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
