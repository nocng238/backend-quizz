module.exports = {
  STATUS_OPTIONS: ['active', 'inactive'],
  PASSWORD_VALIDATE_REGEX: '^[a-zA-Z0-9]{3,30}$',
  ID_VALIDATE_REGEX: /^[0-9a-fA-F]{24}$/,
  LINK_TOKEN_TEST:
    '/api/v1/users/reset-password/6318465cd31232e234a6d3a216a/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMTg0NjVjZDMyZTIzNGE2ZDNhMjE2YSIsImlhdCI6MTY2MjczMjMyNSwiZXhwIjoxNjYyODE4NzI1fQ.gdwQ5sJL71jf2rvdtmtWgF62Y8T4c7HdIMeHi6blQYg',
};
