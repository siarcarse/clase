import Hapi from 'hapi';
import Routes from './routes/';
import Handlebars from 'handlebars';
import Extend from 'handlebars-extend-block';

require('dotenv').load(); // Load .env file for evoriment vars

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 8000
});
// Registra plugins de Hapijs
server.register([require('vision'),
    { register: require('hapi-postgres-connection') }
], (err) => {
    if (err) {
        console.log("Failed to load module. ", err);
    }
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
