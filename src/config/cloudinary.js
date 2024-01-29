const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: 'dybtp8sx3', 
    api_key: '983837843389239', 
    api_secret: '***************************' 
  });

  module.exports = cloudinary;