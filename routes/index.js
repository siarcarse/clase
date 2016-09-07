import Users from './api/users';

const Index = {
    method: ['GET', 'POST'],
    path: '/',
    config: {
        handler: function(request, reply) {
            var data = {
                title: 'This is Index!',
                message: 'Hello, World. You crazy handlebars layout'
            };
            return reply(data);
        }
    }
};
const Routes = [].concat(
    Index,
    Users
);
export default Routes;
