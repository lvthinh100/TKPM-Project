const { customAlphabet } = require("nanoid");

module.exports = (prefix) => {
  const nanoid = customAlphabet(process.env.NANOID_ALPHABET, 6);
  return prefix + nanoid();
};
