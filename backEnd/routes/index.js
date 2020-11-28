var express = require('express');
var router = express.Router();
const fs = require('fs')
var uniqid = require('uniqid');
require('dotenv').config()

//cloudinary config
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'kv1k34000', 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

//azure config
var request = require('sync-request');

let subscriptionKey = process.env.subscriptionKey
let endpoint = 'https://westcentralus.api.cognitive.microsoft.com/face'+ '/v1.0/detect'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function(req, res, next) {
  
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.image.mv(pictureName);
  if(!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    
    let imageUrl = resultCloudinary.secure_url
    const params = {
      returnFaceId: 'true',
      returnFaceLandmarks: 'false',
      returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair',

    };
    const options = {
  
      qs: params,
      body: '{"url": ' + '"' + imageUrl + '"}',
      headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key' : subscriptionKey
      }
    };
    var resAzureAPI = request('POST', endpoint , options);
    var body= resAzureAPI.getBody();
    var resJSON= JSON.parse(body);

    var gender;
    var age;
    var barbe;
    var lunettes;
    var sourir;
    var couleurCheveux;
    

    if(resJSON[0]){
      gender = resJSON[0].faceAttributes.gender == "male" ? 'Homme' : 'Femme';
      age = resJSON[0].faceAttributes.age+" ans";

      if(resJSON[0].faceAttributes.gender==='male'){
       
       if (resJSON[0].faceAttributes.facialHair.beard>0){
          barbe='Un peu barbu'
        }
        else if (resJSON[0].faceAttributes.facialHair.beard>=0.5){
          barbe='Barbu'
        }
        else if (resJSON[0].faceAttributes.facialHair.beard>=0.8){
          barbe='Barbu'
        }else{          
        barbe= 'Pas barbu'
        }
        
      }
      
      if(resJSON[0].faceAttributes.glasses==='ReadingGlasses'){
        lunettes= 'Porte des lunettes'
      }else{
        lunettes= 'Porte pas de lunettes'
      }

      if(resJSON[0].faceAttributes.smile>0.6){
        if(resJSON[0].faceAttributes.gender==='male'){
          sourir= 'Souriant'
        }else{
          sourir= 'Souriante'        
        }
      }
      else if (resJSON[0].faceAttributes.smile>0.8){
        if(resJSON[0].faceAttributes.gender==='male'){
          sourir= 'Très souriant'
        }else{
          sourir= 'Très souriante'
        }
        
      } else{
        if(resJSON[0].faceAttributes.gender==='male'){
          sourir= 'Pas souriant'
        }else{
          sourir= 'Pas souriante'
        }
        
      }
        
       
      
      if(resJSON[0].faceAttributes.hair.invisible===false){
        if(resJSON[0].faceAttributes.hair.hairColor[0].color==='black'){
          couleurCheveux='Cheveux bruns'
        }
        else if (resJSON[0].faceAttributes.hair.hairColor[0].color==='brown'){
          couleurCheveux='Cheveux châtain'
        }
        else if (resJSON[0].faceAttributes.hair.hairColor[0].color==='blond'){
          couleurCheveux='Cheveux blonds'
        }
        else if (resJSON[0].faceAttributes.hair.hairColor[0].color==='red'){
          couleurCheveux='Cheveux roux'
        }else {
          couleurCheveux='Cheveux gris'
        }
      }else{
        couleurCheveux='Chauve'
      }


    }
    

    res.json({url:resultCloudinary.url, age, gender, barbe, lunettes, sourir, couleurCheveux});
  } else {
    res.json({error: resultCopy});
  }

  fs.unlinkSync(pictureName);
  
});
module.exports = router;
