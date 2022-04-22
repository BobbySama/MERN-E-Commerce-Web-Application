import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bob',
    email: 'Bob@bob.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Billy',
    email: 'billy@billy.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
