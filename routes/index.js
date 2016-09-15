import Users from './api/users';

const Index = {
    method: ['GET', 'POST'],
    path: '/',
    config: {
        handler: function(request, reply) {
            return reply.view('index');
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
