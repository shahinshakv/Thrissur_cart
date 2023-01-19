const Country = require('../models/country');
const fs = require('fs');
const sharp = require('sharp');



exports.createCountry = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
  
    const base64String = req.body.image;
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = base64String.match(regex);
    const ext = matches[1];
    const fileName = 'country--'+Date.now()+`.${ext}`;
    const filepath = `images/${fileName}`;
    const imageBuffer = Buffer.from(matches[2], 'base64');
    sharp(imageBuffer)
    .resize(400, 300) // resize to 300x300 pixels
    .toFile(filepath, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Image resized and saved successfully!');
      }
    });
    // fs.writeFileSync(filepath, imageBuffer);
   
  
  
  
    const country = new Country({
      country_name: req.body.country_name,
      image: url + "/images/" + fileName,
      country_code: req.body.country_code,
      minimum_order: req.body.minimum_order,
      vat: req.body.vat,
      currency: req.body.currency,
      priority: req.body.priority,
      status: req.body.status
    });
  
    country.save().then(createdCountry => {
      res.status(201).json({
        message: "Country added successfully",
        country: {
           data: createdCountry,
          id: createdCountry._id
        }
      });
    })
    .catch(error => {
      console.log(error)
        res.status(500).json({
          message: "Creating a country failed"
        });
    });
  };




  exports.updateCountry = (req, res, next) =>{
    let imagePath = req.body.image;
  
    if(req.body.category_image){
  
      const base64String = req.body.image;
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = base64String.match(regex);
    const ext = matches[1];
    const fileName = 'brand--'+Date.now()+`.${ext}`;
    const filepath = `images/${fileName}`;
    const imageBuffer = Buffer.from(matches[2], 'base64');
    sharp(imageBuffer)
    .resize(400, 300) // resize to 300x300 pixels
    .toFile(filepath, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Image resized and saved successfully!');
      }
    });
  
    //fs.writeFileSync(filepath, imageBuffer);
  
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + fileName;
    }
    const country = new Country({
      // _id : req.body.id,
       country_name : req.body.country_name,
      // image: imagePath,
      status : req.body.status,
      updated_date : Date.now(),
      
    });
     Country.updateOne({_id: req.body.id}, country).then(result => {
      if (result.matchedCount > 0) {
  
        
        res.status(200).json({message: 'successfully updated'});
      } else {
        res.status(401).json({message: 'Not authorized',});
      }
  
     }).catch(error => {
      console.log(error)
      res.status(500).json({
        
        message: "Couldn't update the country"
      })
     });
  };



  exports.getCountries = (req, res, next) => {
    // const pageSize = +req.query.pagesize;
    // const currentPage = +req.query.page;
     const CountryQuery = Country.find();
    // let fetchedPosts;
    // if(pageSize && currentPage){
    //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // }
  
    CountryQuery.find().lean().sort({"priority": 1}).then(documents=> {
          res.status(200).json({
        message: "countries fetched successfully!",
        countries: documents.map((i)=> {
          i['availability'] = (i.status === 1) ? "available" : "Not available"
          return i;
        }),
  
  
     //   maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching countries failed",
        error: error
      });
    });
  };



  exports.deleteCountry =  (req, res, next) => {
    console.log("working")
    Country.deleteOne({ _id: req.body.id, status: 1}).then(result => {
      if (result.deletedCount > 0) {
        res.status(200).json({message: 'successfully deleted'});
      } else {
        console.log(result);
        res.status(401).json({message: 'Not authorized'});
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching country failed"
      })});
  };
  
  