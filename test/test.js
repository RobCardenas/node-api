var cheerio = require('cheerio');
var request = require('request');
var expect = require('chai').expect;
var users = require("../app.js");

describe('amazon.com', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('https://google.com/', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('Google.com', function() {
  it('should have a title of "Google"', function(done) {
    request('https://google.com/', function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.equal('Google');
      // expect(title).to.equal('Moogle');
      done();
    })
  })
});

// Test number 1 using cheerio
// one success test and one fail
describe('Testing the title element', function() {
  it('title should read "Join our mailing list"', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.equal('Join our mailing list');
      // expect(title).to.equal('Join or die');
      done();
    })
  })
});

// test number 2 using cheerio
// one success test and one fail
describe('Testing h1 elements with a class', function() {
  it('h1 should read "BECOME A MEMBER"', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var h1 = $('.title').text();
      expect(h1).to.equal('BECOME A MEMBER');
      // expect(title).to.equal('BECOME A DONOR');
      done();
    })
  })
});

describe('Testing user_list id', function() {
  it('It should not be empty', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      var $ = cheerio.load(body);
      var userList = $('#user_list').length;
      expect(userList).to.equal(1);
      done();
    })
  })
});

