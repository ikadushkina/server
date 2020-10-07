let token = "";

const set = (value) => (token = value);
const get = () => token;

module.exports = { set, get };
