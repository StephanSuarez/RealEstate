import bcrypt from 'bcrypt';

const users = [
    {
        name: 'stephantest',
        email: 'stephanTest@gmail.com',
        confirm: 1,
        password: bcrypt.hashSync('password', 10)
    }
];

export default users;