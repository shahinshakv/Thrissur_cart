const Basket = require('../models/basket');


exports.createBasket = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const { products } = req.body;
    const product = [];
    products.forEach(el => {
        product.push({
            item : el.item,
            quantity : el.quantity
        })
        
 });
  const basket = new Basket({
    products: product,
    basket_name: req.body.basket_name,
    image: url + "/images/" + req.file.filename,
    subtotal: req.body.subtotal,
    priority: req.body.priority,
    status: req.body.status
  });

  basket.save().then(createdBasket => {
    res.status(201).json({
      message: "basket added successfully",
      basket: {
         data: createdBasket,
        id: createdBasket._id
      }
    });
  })
  .catch(error => {
    console.log(error)
      res.status(500).json({
        message: "Creating a basket failed"
      });
  });
};


exports.getBasket = (req, res, next) => {
    // const pageSize = +req.query.pagesize;
    // const currentPage = +req.query.page;
     const BasketQuery = Basket.find().populate('products.item','product_name image');
    // let fetchedPosts;
    // if(pageSize && currentPage){
    //   PostQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // }
  
    BasketQuery.find().lean().sort({"priority": 1}).then(documents=> {
          res.status(200).json({
        message: "Products fetched successfully!",
        baskets: documents.map((i)=> {
          i['availability'] = (i.status === 1) ? "available" : "out of stock"
          return i;
        }),
  
  
     //   maxPosts: count
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching products failed",
        error: error
      });
    });
  };
  