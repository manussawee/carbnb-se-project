const UserData = require('./user-data');

const getUser = async (req, res) => {
  const { error, response } = await UserData.getUser(req.params.id);
  if (error) {
    res.send({ msg: `error: ${error}` });
  }
  res.send(response);
};

const createUser = async (req, res) => {
  const { error, response } = await UserData.createUser(req);
  if (error) {
    res.send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const deleteUser = async (req, res) => {
  const { error, response } = await UserData.deleteUser(req);
  if (error) {
    res.send({ msg: `error: ${error}` });
  }
  res.send({ msg: 'success', id: response });
};

const editUser = async (req, res) => {
  const {
    oldPassword,
    newPassword,
    reNewPassword,
    fullname,
    avatar,
    phone,
  } = req.body;

  if (oldPassword && oldPassword.length) {
    if (newPassword !== reNewPassword) {
      return res.send({ msg: 'password_not_match' });
    }
    const { response: { user } } = await UserData.getUser(req.user._id); // eslint-disable-line
    try {
      await user.changePassword(oldPassword, newPassword);
      await user.save();
    } catch (err) {
      return res.send({ msg: err.message });
    }
  }

  if (fullname && fullname.length) {
    const { error } = await UserData.editUser(req.user._id, { fullname, phone }); // eslint-disable-line
    if (error) {
      return res.send({ msg: `error: ${error}` });
    }
  }

  if (avatar && avatar.length) {
    const { error } = await UserData.editUser(req.user._id, { avatar }); // eslint-disable-line
    if (error) {
      return res.send({ msg: `error: ${error}` });
    }
  }

  return res.send({ msg: 'success' });
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  editUser,
};
