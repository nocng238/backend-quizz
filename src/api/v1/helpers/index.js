const replaceContent = (content, params) => {
  return new Function(`return \`${content}\``).call(params);
};

module.exports = {
  replaceContent,
};
