import Joi from 'joi';

const users = [{
    method: 'GET',
    path: '/api/users',
    config: {
        handler: (request, reply) => {
            let sql = "SELECT * FROM users";
            request.pg.client.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                let users = result.rows;
                return reply(users);
            });
        }
    }
}, {
    method: 'POST',
    path: '/api/users',
    config: {
        handler: (request, reply) => {
            let username = request.payload.username;
            let name = request.payload.name;
            let lastname = request.payload.lastname;
            let birthdate = request.payload.birthdate;
            let role = request.payload.role;
            let password = request.payload.password;
            let mail = request.payload.mail;
            let phone = request.payload.phone;
            let sql = `INSERT INTO users
            (username,name,lastname,birthdate,role,password,mail,phone)
            VALUES 
            ('${username}','${name}','${lastname}','${birthdate}',${role},'${password}','${mail}','${phone}')
            RETURNING *`;
            request.pg.client.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                }
                reply(result.rows);
            })
        },
        validate: {
            payload: Joi.object().keys({
                username: Joi.string().required().min(1).max(60),
                name: Joi.string().min(1).max(60),
                lastname: Joi.string().min(1).max(60),
                birthdate: Joi.string(),
                role: Joi.number().min(1),
                password: Joi.string().required().min(1).max(60),
                mail: Joi.string().email(),
                phone: Joi.string()
            })
        }
    }
}];
export default users;
