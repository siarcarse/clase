import 'whatwg-fetch';
import Users from './api/users';
var fetch = require('node-fetch');

const Index = {
    method: ['GET', 'POST'],
    path: '/',
    config: {
        handler: function(request, reply) {
            let dark = true;
            return reply.view('index', { dark });
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
const Routes = [].concat(
    Public,
    Index,
    Users
);
export default Routes;
