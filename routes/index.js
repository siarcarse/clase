import Users from './api/users';
import login from './handlers/loginHandler'
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
        }
    }
};
const Public = {
    method: "GET",
    path: "/public/{path*}",
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
    }
};
const Routes = [].concat(
    Public,
    Index,
    Users,
    Login
);
export default Routes;
