const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Country = require('../models/country');
const City = require('../models/city');
const User = require('../models/user');

exports.createUser = (async (req, res, next) => {

  let countryId;
  let cityId;


  const country = await Country.findOne({_id: req.body.countryId }).select("country_name");
  if(country === null){
      res.status(500).send("Invalid country");
      return;
  }
  const {country_name: countryName} = country;
  countryId = req.body.countryId;

  const city = await City.findOne({_id: req.body.cityId }).select("city_name");
  if(city === null){
      res.status(500).send("Invalid city");
      return;
  }
  const {city_name: cityName} = city;
  cityId = req.body.cityId;

  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const user = new User({
        name: req.body.name,
        flat: req.body.flat,
        address: req.body.address,
        latitude: req.body.latitude,
        longitute: req.body.longitute,
        created_by: req.body.name,
        updated_by: req.body.name,
        fcm_token: req.body.fcm_token,
        country_id: countryId,
        country_name: countryName,
        city_id: cityId,
        device: req.body.device,
        device_id: req.body.device_id,
        city_name: cityName,
        mobile: req.body.mobile,
        email: req.body.email,
        password: hash
       });
       user.save()
       .then(result => {
         res.status(201).json({
          message : 'User created!',
          result: result
         });
       })
       .catch(err =>{
          res.status(500).json({

              message: "Invalid authentication credentials!"

          })
       });
    });

});

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email })
  .then(user => {
    if(!user) {
      return res.status(401).json({
          message: "Auth failed"
      });
    }
    fetchedUser = user;
   return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
      if(!result) {
        return res.status(401).json({
          message: "Auth failed"
      });
      }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
       process.env.JWT_KEY, {
      expiresIn: "1hr"
    });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      username: fetchedUser.email
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Invalid authentication credentials!"
  });
  });
}
