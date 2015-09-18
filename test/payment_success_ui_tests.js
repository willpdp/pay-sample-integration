var renderer = require(__dirname + '/utils/renderer.js').renderer;
var cheerio = require('cheerio');
var assert = require('chai').assert;


describe('The payment success view', function() {
  var expectedAmountFormat = '£50.00'
  var templateData = {
    'title': 'Payment successful',
    'formattedAmount': expectedAmountFormat
  };

  function renderSuccessPage(templateData, checkFunction) {
    renderer('success', templateData, function(htmlOutput) {
      var $ = cheerio.load(htmlOutput);
      checkFunction($);
    });
  }

  it('should render the amount', function(done) {
    renderSuccessPage(templateData, function($) {
      $('.amount').text().should.equal(expectedAmountFormat);
      done();
    });
  });

  it('should render the demo service name', function(done) {
    renderSuccessPage(templateData, function($) {
      $('#service-name').text().should.equal('Demo Service');
      done();
    });
  });

  it('should render the a title', function(done) {
    renderSuccessPage(templateData, function($) {
      $('.form-title').text().should.equal('Payment successful');
      done();
    });
  });
});