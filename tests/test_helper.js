const User = require('../src/api/v1/user/user.model');

const initialUsers = [
  {
    name: 'test',
    email: 'test@gmail.com',
    phone: '01231231',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'khoa',
    email: 'khoa@gmail.com',
    phone: '0123421312',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'nhut',
    email: 'nhut@gmail.com',
    phone: '0987654321',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'vui',
    email: 'vui@gmail.com',
    phone: '0765244143',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'quy',
    email: 'quy@gmail.com',
    phone: '0343512314',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'trung',
    email: 'trung@gmail.com',
    phone: '0123125465',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'son',
    email: 'son@gmail.com',
    phone: '0751623423',
    password: '123123',
    status: 'inactive',
    deleted_at: null,
  },
  {
    name: 'thaison',
    email: 'thaison@gmail.com',
    phone: '0751623423',
    password: '123123',
    deleted_at: null,
  },
  {
    name: 'thaison',
    email: 'thaison1@gmail.com',
    phone: '0751623423',
    password: '123123',
    status: 'inactive',
    deleted_at: null,
  },
  {
    name: 'thaison',
    email: 'thaison2@gmail.com',
    phone: '0751623423',
    password: '123123',
    status: 'inactive',
    deleted_at: '8/9/2022',
  },
  {
    name: 'khoa',
    email: 'khoanguyen@gmail.com',
    phone: '0751623423',
    password: '123123',
    status: 'active',
    deleted_at: null,
  },
];

module.exports = { initialUsers };
