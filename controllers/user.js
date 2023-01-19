const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Country = require('../models/country');
const City = require('../models/city');
const User = require('../models/user');

exports.createUser = (async (req, res, next) => {

  let countryId, countryName;
  let cityId, cityName;
  try{
   [countryId, countryName] = await Country.findOne({_id: req.body.countryId }).then(result => {
    
    if(result) {
      if(result.status==1){
          return [result._id, result.country_name];
      }
      else{
          return;
      }
    }
}); 
  if(!countryId){
      res.status(500).send("Country is not available");
    return;
  }
  }catch(err){
    res.status(500).json({

      message: "Invalid parameter passed for countryId" + err
      
  });
  }

  try{
   [cityId, cityName] = await City.findOne({_id: req.body.cityId }).then(result => {
    
    if(result) {
      if(result.status==1){
          return [result._id, result.city_name];
      }
      else{
          return;
      }
    }
}); 
  if(!cityId){
      res.status(500).send("City is not available");
    return;
  }

}catch(err){
  res.status(500).json({

    message: "Invalid parameter passed for cityId" + err

});
}

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
        country_id: countryId,
        country_name: countryName,
        city_id: cityId,
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
