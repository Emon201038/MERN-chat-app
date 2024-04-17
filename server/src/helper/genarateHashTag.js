const genarateHashTag = (text) => {
  const regex = /(?:^|\s)(#[^\s#]+)/g;
  const tagsArray = text.match(regex) || [];
  const hashTag = tagsArray
    .map((tag) => tag.trim())
    .filter((value, index, array) => array.indexOf(value) === index);
  return hashTag;
};

module.exports = genarateHashTag;
