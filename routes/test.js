var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = require('../model/request');
var Q = require('q');

/* GET home page. */
router.get('/list', function(req, res) {
    var promise = getList();

    promise.then(
        function(collection){
            res.json(collection);
        }, 
        function(){
          res.json({'message': 'Error'});
        }
    );	
});

function getList(){
    
  var deferred = Q.defer();
  var query = Request.find({});

  query.exec(function (err, collection){
    if(err) {
      deferred.reject();
    }
    else {
      deferred.resolve(collection);
    }
  });

    return deferred.promise;
}


function save(object){
    
    var deferred = Q.defer();
    var news = new Request({data: JSON.stringify(object)});
    
    news.save(function (err) 
    {
        if (err){
            deferred.reject();
        }
        else{
            deferred.resolve(news);
        } 
    });
    
    return deferred.promise;
}

router.get('/', function(req, res) { 
    var promise = save(req.query);
    
    promise.then(
        function(shortUrl){
          res.json(shortUrl);
        },
        function(){
            res.json({'message': 'Error'});
        }
    );	
});


module.exports = router;
