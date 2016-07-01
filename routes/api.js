var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = require('../model/request');
var Q = require('q');
var fs = require('fs');

/* GET home page. */
router.get('/list', function(req, res) {
    var promise = getList2();

    promise.then(
        function(collection){
            res.json(collection);
        },
        function(){
          res.json({'message': 'Error'});
        }
    );
});

router.get('/save', function(req, res) {
    console.log(req.query);
    req.query['time'] = (new Date());
    var promise = save2(req.query);

    promise.then(
        function(shortUrl){
          res.json(shortUrl);
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

function getList2() {
  var deferred = Q.defer();
  var data = getList3();

  if(data) {
    deferred.resolve(data);
  }
  else {
    deferred.reject();
  }
  return deferred.promise;
}

function getList3() {
  return require('../files/data.json');
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

function save2(object) {
  var deferred = Q.defer();
  var filePath = 'files/data.json';
  var data = getList3();

  data.push(object);
  data = JSON.stringify(data);

  fs.writeFile(filePath, data, (error) => {
    if(error) {
      console.log('Error writing: ' + filePath);
      deferred.reject();
    }
    else {
      deferred.resolve(object);
    }
  });

  return deferred.promise;
}

module.exports = router;
