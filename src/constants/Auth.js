module.exports = {
  PASSWORD_VALIDATE_REGEX:
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/,
  ID_VALIDATE_REGEX: /^[0-9a-fA-F]{24}$/,
  LINK_TOKEN_TEST:
    '/api/v1/auth/change-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RnYW1lMjIyMUBnbWFpbC5jb20iLCJpZCI6IjYzMjAwYWE1YmU5NjRjYzE0MTYyNDM1NSIsImlhdCI6MTY2MzEzMDY5MCwiZXhwIjoxNjYzMjE3MDkwfQ.qf7LtqDgg8Q-9ud3HVHRqZlGEwiJrYNgHC3vz44_fFM',
};
