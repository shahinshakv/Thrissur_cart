const City = require('../models/city');
const Country = require('../models/country');



exports.createCity =(async (req, res, next) => {

  let countryId;
  const country = await Country.findOne({_id: req.body.countryId }).select("country_name");
  if(country === null){
      res.status(500).send("Invalid country");
      return;
  }
  const {country_name: countryName} = country;
  countryId = req.body.countryId;

    const city = new City({
        city_name: req.body.city_name,
        country_id: countryId,
        country_name: countryName,
    });
  
    city.save().then(createdCity => {
      res.status(201).json({
        message: "City added successfully",
        city: {
           data: createdCity,
          id: createdCity._id
        }
      });
    })
    .catch(error => {
      console.log(error)
        res.status(500).json({
          message: "Creating a city failed"
        });
    });
  });




  exports.updateCity = (req, res, next) =>{
    
    const city = new City({
      // _id : req.body.id,
       city_name : req.body.city_name,
      // image: imagePath,
      status : req.body.status,
      updated_date : Date.now(),
      
    });
     City.updateOne({_id: req.body.id}, city).then(result => {
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



  exports.getCities = (req, res, next) => {
    // const pageSize = +req.query.pagesize;
    // const currentPage = +req.query.page;
     const CityQuery = City.find();
    // let fetchedPosts;
    // if(pageSize && currentPage){
    //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // }
  
    CityQuery.find().lean().sort({"priority": 1}).then(documents=> {
          res.status(200).json({
        message: "city fetched successfully!",
        cities: documents.map((i)=> {
          i['availability'] = (i.status === 1) ? "available" : "Not available"
          return i;
        }),
  
  
     //   maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching cities failed",
        error: error
      });
    });
  };



  exports.deleteCity =  (req, res, next) => {
    console.log("working")
    City.deleteOne({ _id: req.body.id, status: 1}).then(result => {
      if (result.deletedCount > 0) {
        res.status(200).json({message: 'successfully deleted'});
      } else {
        console.log(result);
        res.status(401).json({message: 'Not authorized'});
      }
    }).catch(error => {
      res.status(500).json({
        message: "Fetching cities failed"
      })});
  };
  
  