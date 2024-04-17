const checkUserExists = async (Model, field, value) => {
  return await Model.exists({ [field]: value });
};

module.exports = checkUserExists;
