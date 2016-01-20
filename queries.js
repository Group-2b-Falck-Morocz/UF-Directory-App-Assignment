var Listing = require('./ListingSchema.js'),
    mongoose = require('mongoose'),
    config = require('./config.js');

mongoose.connect(config.db.uri);
/* Fill out these functions using Mongoose queries*/
var findLibraryWest = function(callback) {
  Listing.find({name: 'Library West'}, function(err, listing) {
    if (err){
      console.log(err);
      return;
    } else {
      console.log('Here are the deets for Library West:\n' + JSON.stringify(listing));
    }

  });
};

var removeCable = function() {
  Listing.find({code: 'CABL'}, function(err, listing) {
      if (err) throw err;

      console.log(JSON.stringify(listing));

      listing[0].remove(function(err) {
        if (err) throw err;
        console.log('Successfully removed: ' + listing[0].name);
      });

  });
};

var updatePhelpsLaboratory = function() {
  Listing.find({code: 'PHL'}, function(err, listing) {
    listing.address = 'Gainvesville-ish';
    console.log(JSON.stringify(listing));
    listing[0].save(function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('\n\n\nUpdated: ' + listing[0].name); 
      }
    });
  });
};

var retrieveAllListings = function() {
  Listing.find({}, function(err, listings) {
    for (var i in listings) {
      console.log(listings[i]);
    }
  });
};

mongoose.connection.on('connected', function() {
  findLibraryWest();
  removeCable();
  updatePhelpsLaboratory();
  retrieveAllListings();
});
  