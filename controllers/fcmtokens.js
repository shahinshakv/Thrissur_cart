const Fcm = require('../models/fcmtokens');
const Country = require('../models/country');
const https = require('https');
const app = require("../app");
const _ = require('lodash');

exports.createFCM =(async (req, res, next) => {

    let countryId;
    const country = await Country.findOne({_id: req.body.countryId }).select("country_name");
    if(country === null){
        res.status(500).send("Invalid country");
        return;
    }
    countryId = req.body.countryId;


     const fcm = new Fcm({
        token: req.body.token,
         country_id: countryId,
         customerid: req.body.customerid,
         device_id: req.body.device_id,
         device: req.body.device,

     });
   
     fcm.save().then(createdFcm => {
       res.status(201).json({
         message: "Token added successfully",
         fcm: {
            data: createdFcm,
           id: createdFcm._id
         }
       });
     })
     .catch(error => {
       console.log(error)
         res.status(500).json({
           message: "Creating a fcm failed"
         });
     });
   });

   exports.sendPushNotification = async (req, res, next) => {
    const options = {
        hostname: 'fcm.googleapis.com',
        path: '/fcm/send',
        port: 443,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + process.env.API_KEY
        }
    };

    Fcm.find()
        .then(async documents => {
            const tokens = documents.map(doc => doc.token);
            let tokenChunks = _.chunk(tokens, 100); // divide tokens into chunks of 100
            for (let i = 0; i < tokenChunks.length; i++) {
                const body = {
                    registration_ids: tokenChunks[i],
                    notification: {
                        title: 'Hello',
                        body: 'World'
                    }
                };
                await sendNotification(options, body);
                await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds before sending next chunk
            }
            res.status(200).json({ message: 'Notifications sent successfully' });
        })
        .catch(error => {
            console.error('Error retrieving device tokens:', error);
            res.status(500).json({ message: 'Error sending notifications', error });
        });
};

const sendNotification = (options, body) => {
    return new Promise((resolve, reject) => {
        const req = https.request(options, response => {
            let responseData = '';
            response.on('data', data => {
                responseData += data;
            });
            response.on('end', () => {
                console.log('Successfully sent message:', responseData);
                resolve();
            });
        });
        req.on('error', error => {
            console.error('Error sending message:', error);
            reject(error);
        });
        req.write(JSON.stringify(body));
        req.end();
    });
}