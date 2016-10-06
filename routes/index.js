import Users from './api/users';
import login from './handlers/loginHandler'
import logout from './handlers/logoutHandler'

var fetch = require('node-fetch');

const Index = {
    method: ['GET', 'POST'],
    path: '/',
    config: {
        handler: function(request, reply) {

            fetch('http://localhost:8000/api/users/1')
                .then(function(response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                })
                .then(function(user) {
                    let dark = user.dark;
                    return reply.view('index', { dark });
                });
        },
        auth: false
    }
};
const Public = {
    method: "GET",
    path: "/public/{path*}",
    config: { auth: false },
    handler: {
        directory: {
            path: "./public",
            listing: false,
            index: false
        }
    }
};
const Login = {
    method: ["GET", "POST"],
    path: "/login",
    config: {
        handler: login,
        auth: { mode: 'try' },
        plugins: { 'hapi-auth-cookie': { redirectTo: false } }
    }
};
const Logout = {
    method: ["GET", "POST"],
    path: "/logout",
    config: {
        handler: logout
    }
};
const Routes = [].concat(
    Public,
    Index,
    Users,
    Login,
    Logout
);
export default Routes;
