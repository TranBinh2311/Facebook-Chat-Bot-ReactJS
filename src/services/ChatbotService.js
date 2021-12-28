require('dotenv').config();

import request from "request"
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const IMAGE_GET_STARTED = 'https://xshopapp.herokuapp.com/images/phone.jpg';
let callSendAPI = (sender_psid, response) =>{
     // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN  },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}
let getUsername = (sender_psid) => {
    // Send the HTTP request to the Messenger Platform
      return new Promise((resolve, reject)=>{
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
          }, (err, res, body) => {
            if (!err) {
                // "first_name": "Peter",
                // "last_name": "Chang",
                body = JSON.parse(body);
                let username = `${body.first_name} ${body.last_name}`;
                resolve(username);
            } else {
              console.error("Unable to send message:" + err);
              reject(err);
            }
          }); 
      })
      
}
let handleGetStarted = (sender_psid) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let username = await getUsername(sender_psid);
            let response1 = { "text":`Chào mừng ${username} đến với web B-Shop của tôi` }
            let response2 = sendGetStartedTemplate();
            //send text message
            await callSendAPI(sender_psid,response1);
            //send generic template message
            await callSendAPI(sender_psid,response2);
            resolve('done');
        }catch(error){
            reject(error)
        }
    })
}
let sendGetStartedTemplate = () =>{
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "Cửa hàng B-Shop kính chào quý khách",
          "subtitle": "Dứoi đây là một vài mẫu thịnh hành",
          "image_url": IMAGE_GET_STARTED,
          "buttons": [
            {
              "type": "postback",
              "title": "XEM THÊM",
              "payload": "SHOW_MORE",
            },
            {
              "type": "postback",
              "title": "ĐẶT MUA",
              "payload": "ORDER",
            },
            {
              "type": "postback",
              "title": "KHUYẾN MÃI",
              "payload": "DISCOUNT",
            },
          ],
        }]
      }
    }
  }

  return response;
}
export default {
    handleGetStarted: handleGetStarted,
    callSendAPI: callSendAPI,
    getUsername: getUsername,
    sendGetStartedTemplate: sendGetStartedTemplate
}