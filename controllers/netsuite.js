const request = require('request');
const xml2js = require('xml2js');


exports.createSalesOrder = async ({ response }) => {
  try {
    // Define your NetSuite account information
    const accountId = '';
    const consumerKey = '';
    const consumerSecret = '';
    const tokenId = '';
    const tokenSecret = '';

    // Define the sales order data
    console.log(response);
    const itemList = response.products.map(product => {
      return {
        "item": {
          "internalId": product.netsuite_id
        },
        "quantity": product.quantity
      };
    });
    const tranDate = new Date().toISOString().slice(0,10);
    const salesOrderData = {
      "tranSalesOrder": {
        "tranDate": tranDate,
        "entity": {
          "internalId": 113284
        },
        "itemList": {
          "item": itemList
        },
        "total": response.grandTotal,
        "shippingAddress": {
          "city": response.city_name,
          "addr1": response.address,
          "addr2": response.flat,
        },
        "paymentMethod": {
          "internalId": 4  //4 is cash and 21 is card
        },
        "tranId": 'Cash on delivery',
        //   discountItem: {
        //     item: {
        //       internalId: 'discount_item_id'
        //     },
        //     rate: 'discount_rate',
        //   },
        "phone": response.mobile,
        "subsidiary": {
          "internalId": 1 // 1 is Dubai 6 is abudhabi
        },
        "otherRefNum" : "Aqua_emarati_" + response.order_number
      }
    };

    // Convert the sales order data to XML
    const builder = new xml2js.Builder();
    const xmlData = builder.buildObject(salesOrderData);

    // Define the options for the request
    const options = {
      url: `https://3988781-sb1.suitetalk.api.netsuite.com`,
      headers: {
        'Content-Type': 'application/xml',
        'Authorization': `NLAuth nlauth_account=${accountId},nlauth_consumer_key=${consumerKey},nlauth_token=${tokenId}`,
        'X-NetSuite-Version': '2018_1'
      },
      body: xmlData
    };

    // Send the request to create the sales order
    request.post(options, (err, res, body) => {
      if (err) {
          console.log(`Error: ${err}`);
      } else {
          console.log(`Response: ${res.statusCode} ${res.statusMessage}`);
          console.log(`Body: ${body}`);
      }
      });
  }catch (error) {
    // return error response
    console.log(error)
  //  res.status(500).send({ message: 'Failed to create sales order in NetSuite', error });
  }
};
