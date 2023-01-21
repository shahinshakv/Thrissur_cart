const netsuite = require('netsuite-js');

const config = {
  account: "3988781_sb1",
  email: "support@igt.ae",
  password: "Support@igt2020",
  role: "1059",
  host: "https://3988781-sb1.suitetalk.api.netsuite.com",
};

exports.createSalesOrder = async (req, res) => {
  try {
    // Connect to NetSuite
    const client = await netsuite.init(config);

    
    

    // create item list for sales order
    const itemList = response.products.map(product => {
      return {
        item: {
          internalId: product.netsuite_id
        },
        quantity: product.quantity
      };
    });

    // create sales order in NetSuite
    const salesOrder = await client.create({
      recordType: 'salesOrder',
      record: {
        entity: {
          internalId: 113284
        },
        itemList: {
          item: itemList
        },
        total: grandTotal,
        shippingAddress: {
            city: response.city_name,
            addr1: response.address,
            addr2: response.flat,
          },
        paymentMethod: {
            internalId: 4  //4 is cash and 21 is card
          },
          tranId: 'Cash on delivery',
        //   discountItem: {
        //     item: {
        //       internalId: 'discount_item_id'
        //     },
        //     rate: 'discount_rate',
        //   },
          phone: response.mobile,
          subsidiary: {
            internalId: 1 // 1 is Dubai 6 is abudhabi
          },
          otherRefNum : "Aqua_emarati_" + order.order_number
      }
    });

    // return success response
  //  res.status(200).send({ message: 'Sales order created in NetSuite', salesOrder });
  console.log(res)

  } catch (error) {
    // return error response
    console.log(error+"_"+ res)
  //  res.status(500).send({ message: 'Failed to create sales order in NetSuite', error });
  }
};