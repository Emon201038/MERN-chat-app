const checkUserExists = async (Model, email) => {
  return await Model.exists({ email: email });
};

module.exports = checkUserExists;
