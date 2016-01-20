'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js'),
    async = require('async'),
    listingsData = '';

function validateFields(listingJSON){
   if (listingJSON.coordinates === undefined) {
    listingJSON.coordinates = {};
    listingJSON.coordinates.latitude = 0;
    listingJSON.coordinates.longitude = 0;
   } 
   if (listingJSON.address === undefined) {
    listingJSON.address = '';
   }

   return listingJSON;
}


mongoose.connect(config.db.uri);
mongoose.connection.on('connected', function() {
    listingsData = fs.readFileSync('./listings.json', 'utf-8');
    listingsData = JSON.parse(listingsData);
    var entries = listingsData.entries;
    async.eachLimit(entries, 10, function(entry, done) {
      console.log('Performing operation for: ' + JSON.stringify(entry) );
      entry = validateFields(entry);
      var currListing = new Listing({
        code: entry.code,
        name: entry.name,
        coordinates: {
          latitude: parseInt(entry.coordinates.latitude, 10), 
          longitude: parseInt(entry.coordinates.longitude, 10)
        },
        address: entry.address
      });
      currListing.save(done);
    }, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('Saved successfully');
      }
    });
});
