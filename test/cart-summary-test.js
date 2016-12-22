var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var CartSummary = require('./../src/cart-summary');
var tax = require('./../src/tax');

describe('CartSummary', function () {
  it('getSubtotal() should return 0 if no items are passed in', function () {
    var cartSummary = new CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  });

  it('getSubtotal() should return the sum of price * quantity for all items', function () {
    var cartSummary = new CartSummary([{
      id: 1,
      quantity: 4,
      price: 50
    }, {
      id: 2,
      quantity: 2,
      price: 30
    }, {
      id: 3,
      quantity: 1,
      price: 40
    }]);

    expect(cartSummary.getSubtotal()).to.equal(300);
  });
});

// To stub out a method in Sinon, call the sinon.stub function and pass it the
// object with the method being stubbed, the name of the method to be stubbed,
// and a function that will replace the original during the test.

describe('getTax', function () {
  beforeEach(function () {
    sinon.stub(tax, 'calculate', function(subtotal, state, done) {
      // setTimeout is used to mimic the asynchronous behavior of this method
      // since in reality it will make an asynchronous API call to a tax service. 
      setTimeout(function () {
        done({
          amount: 30
        });
      }, 0);
    });
  });

  afterEach(function () {
    tax.calculate.restore();
  });

  it('getTax() should execute the callback function with the tax amount', function(done) {
    var cartSummary = new CartSummary([{
      id: 1,
      quantity: 4,
      price: 50
    }, {
      id: 2,
      quantity: 2,
      price: 30
    }, {
      id: 3,
      quantity: 1,
      price: 40
    }]);

    cartSummary.getTax('NY', function(taxAmount) {
      expect(taxAmount).to.equal(30);
      done();
    });
  });

});