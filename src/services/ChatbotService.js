require('dotenv').config();

import request from "request"
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
const IMAGE_GET_STARTED = 'https://xshopapp.herokuapp.com/images/phone.jpg';
const IMAGE_MENU_1 = "https://xshopapp.herokuapp.com/images/airpods.jpg"
const IMAGE_MENU_2= "https://xshopapp.herokuapp.com/images/camera.jpg"
const IMAGE_MENU_3 = "https://xshopapp.herokuapp.com/images/playstation.jpg"
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
              "title": "DANH SÁCH SẢN PHẨM",
              "payload": "MAIN_PRODUCT",
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
let getMainMenuTemplate = () =>{
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
          "title": "Các sản phẩm chính của nhà hàng",
          "subtitle": "Chúng tôi hân hạnh mang đến cho bạn các sản phẩm với chất lượng tốt nhất",
          "image_url": IMAGE_MENU_1,
          "buttons": [
            {
              "type": "postback",
              "title": "TOP SALE",
              "payload": "TOP_SALE_PRODUCT",
            },
            {
              "type": "postback",
              "title": "TOP RATE",
              "payload": "TOP_RATE_PRODUCT",
            },
            {
              "type": "postback",
              "title": "SẢN PHẨM ĐƯỢC YÊU THÍCH",
              "payload": "TOP_LIKE_PRODUCT",
            },
          ],
          },
          {
            "title": "Bạn muốn đặt đồ?",
            "subtitle": "Đặt đồ nhanh gọn, thanh toán đơn giản, giao nhanh trong 2 ngày",
            "image_url": IMAGE_MENU_2,
            "buttons": [
              {
                "type": "postback",
                "title": "ĐẶT MUA",
                "payload": "BUY_PRODUCT",
              },  
            ],
          },
          {
              "title": "Xem chi tiết sản phẩm",
              "subtitle": "Số lượng kho của shop lên đến hàng nghìn sản phẩm. Quý khách có thể xem chi tiết tại đây",
              "image_url": IMAGE_MENU_3,
              "buttons": [
                {
                  "type": "postback",
                  "title": "CHI TIẾT",
                  "payload": "DETAILS_PRODUCT",
                },
              ],
          },
        ]
      }
    }
  }

  return response;
};
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
let getTopRateTemplate = () =>{
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
          "title": "Airpods Wireless Bluetooth Headphones",
          "subtitle": "Chúng tôi hân hạnh mang đến cho bạn các sản phẩm với chất lượng tốt nhất",
          "image_url": IMAGE_MENU_1,
          "buttons": 
            {
              "type": "postback",
              "title": "XEM CHI TIẾT",
              "payload": "VIEW_1",
            },
          },
          {
            "title": "Amazon Echo Dot 3rd Generation",
            "subtitle": "Chúng tôi hân hạnh mang đến cho bạn các sản phẩm với chất lượng tốt nhất",
            "image_url": IMAGE_MENU_2,
            "buttons": 
              {
                "type": "postback",
                "title": "XEM CHI TIẾT",
                "payload": "VIEW_2",
              }, 
          },
          {
              "title": "Logitech G-Series Gaming Mouse",
              "subtitle": "Số lượng kho của shop lên đến hàng nghìn sản phẩm. Quý khách có thể xem chi tiết tại đây",
              "image_url": IMAGE_MENU_3,
              "buttons": {
                "type": "postback",
                "title": "XEM CHI TIẾT",
                "payload": "VIEW_3",
              },
          },
        ]
      }
    }
  }

  return response;
};
let getTopSaleTemplate = () =>{
  let response = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
          "title": "Airpods Wireless Bluetooth Headphones",
          "subtitle": "Chúng tôi hân hạnh mang đến cho bạn các sản phẩm với chất lượng tốt nhất",
          "image_url": IMAGE_MENU_1,
          "buttons": 
            {
              "type": "postback",
              "title": "XEM CHI TIẾT",
              "payload": "VIEW_1",
            },
          },
          {
            "title": "Amazon Echo Dot 3rd Generation",
            "subtitle": "Chúng tôi hân hạnh mang đến cho bạn các sản phẩm với chất lượng tốt nhất",
            "image_url": IMAGE_MENU_2,
            "buttons": 
              {
                "type": "postback",
                "title": "XEM CHI TIẾT",
                "payload": "VIEW_2",
              }, 
          },
          {
              "title": "Logitech G-Series Gaming Mouse",
              "subtitle": "Số lượng kho của shop lên đến hàng nghìn sản phẩm. Quý khách có thể xem chi tiết tại đây",
              "image_url": IMAGE_MENU_3,
              "buttons": {
                "type": "postback",
                "title": "XEM CHI TIẾT",
                "payload": "VIEW_3",
              },
          },
        ]
      }
    }
  }

  return response;
};
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
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
let handleSendMainproduct = (sender_psid) => {
      return new Promise(async(resolve, reject)=>{
        try{
            let response2 = getMainMenuTemplate();
            await callSendAPI(sender_psid,response2);

            resolve('done');
        }catch(error){
            reject(error)
        }
    })
}
let handleSendTopRateProduct = (sender_psid) =>{
  return new Promise(async(resolve, reject)=>{
    try{
        let response2 = getTopRateTemplate();
        await callSendAPI(sender_psid,response2);

        resolve('done');
        }catch(error){
            reject(error)
        }
    })
}
let handleSendTopSaleProduct = (sender_psid) =>{
  return new Promise(async(resolve, reject)=>{
    try{
        let response2 = getTopSaleTemplate();
        await callSendAPI(sender_psid,response2);

        resolve('done');
        }catch(error){
            reject(error)
        }
    })
}
export default {
    handleGetStarted: handleGetStarted,
    callSendAPI: callSendAPI,
    getUsername: getUsername,
    sendGetStartedTemplate: sendGetStartedTemplate,
    handleSendMainproduct: handleSendMainproduct,
    handleSendTopSaleProduct: handleSendTopSaleProduct,
    handleSendTopRateProduct: handleSendTopRateProduct
}