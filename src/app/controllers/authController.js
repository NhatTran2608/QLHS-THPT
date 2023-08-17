const User = require('../models/Student');
const Class = require('../models/Class');
const UserTeacher = require('../models/Teacher')
const Summary = require('../models/Summary')
const bcrypt = require("bcrypt");

const authController = {
  //REGISTER
  registerStudent: async (req, res) => {
    try {
      const { username, email, password, grade,avatar,
        namsinh, fullname, xa, huyen, phone, gioitinh, myclassID,
        cccd, tp, father, mother, phoneFather, phoneMother, role } = req.body
      const checkUser = await User.findOne({ username: username })
      if (checkUser) {
        res.status(400).json({
          mes: 'Tài khoản đã tồn tại'
        })
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        //Create new user
        const summary = await Summary.create(req.body)
        const newUser = await new User({
          username: username,
          email: email,
          fullname: fullname,
          password: hashed,
          namsinh: namsinh,
          xa: xa,
          huyen: huyen,
          tp: tp,
          phone: phone,
          cccd: cccd,
          gioitinh: gioitinh,
          father: father,
          mother: mother,
          phoneFather: phoneFather,
          phoneMother: phoneMother,
          role: role,
          grade: grade,
          myclassID: myclassID,
          resultID: summary._id,
          avatar:avatar,
        });
        //Save user to DB


        const user = await newUser.save();
        const classID = await Class.findById(myclassID);
        classID.students.push(user._id);
        classID.save();
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  registerTeacher: async (req, res) => {
    try {
      const { username, email, password,
        birth, fullname, xa, huyen, phone, sex, subject, form_teacherID,avatar,
        cccd, tp, role, classID } = req.body
      const checkUser = await UserTeacher.findOne({ username: username })
      if (checkUser) {
        res.status(400).json({
          mes: 'Tài khoản đã tồn tại'
        })
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        //Create new user
        const newUser = await new UserTeacher({
          username: username,
          email: email,
          fullname: fullname,
          avatar: avatar,
          password: hashed,
          birth: birth,
          xa: xa,
          huyen: huyen,
          tp: tp,
          phone: phone,
          cccd: cccd,
          sex: sex,
          subject: subject,
          role: role,
          classID: classID,
          form_teacherID: form_teacherID,
        });
        //Save user to DB
        const user = await newUser.save();
        // const classIDz = await Class.findById(classID);
        // classIDz.teacher.push(user._id);
        // classIDz.save()
        // const temp = await Class.findById(form_teacherID)
        // temp.organizer = user._id
        // temp.save()
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //LOGIN
  loginStudent: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({
          mes: 'Incorrect username'
        })
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({
          mes: 'Incorrect password'
        })
      }
      if (user && validPassword) {

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  loginTeacher: async (req, res, next) => {
    try {
      const user = await UserTeacher.findOne({ username: req.body.username });
      if (!user) {
        return next();
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }
      if (user && validPassword) {

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async changepassword(req, res) {
    try {
      const { id } = req.params
      const validPassword = await bcrypt.compare(
        req.body.temp,
        req.body.changepass
      );
      if (validPassword) {
        const salt = await bcrypt.genSalt(10)
        const Password = await bcrypt.hash(req.body.password, salt);
        req.body.password = Password;
        const userPassword = await User.findByIdAndUpdate(id, req.body)
        return res.status(200).json(userPassword);
      }
      else {
        return res.status(400).json({
          mes: 'Mật khẩu hiện tại chưa đúng'
        })
      }
    }
    catch (err) {
      return res.status(500).json(err);
    }
  },

  async changepasswordTeacher(req, res) {
    try {
      const { id } = req.params
      console.log(req.body);
      const validPassword = await bcrypt.compare(
        req.body.Temp,
        req.body.changepass
      );
      if (validPassword) {
        const salt = await bcrypt.genSalt(10)
        const Password = await bcrypt.hash(req.body.password, salt);
        req.body.password = Password;
        const userPassword = await UserTeacher.findByIdAndUpdate(id, req.body)
        return res.status(200).json(userPassword);
      }
      else {
        return res.status(400).json({
          mes: 'Mật khẩu hiện tại chưa đúng'
        })
      }
    }
    catch (err) {
      return res.status(500).json(err);
    }
  }



};

module.exports = authController;
