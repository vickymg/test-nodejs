var chai = require('chai');
var expect = chai.expect;
var CartSummary = require('./../src/cart-summary');

describe('CartSummary', function() {
  it('getSubtotal() should return 0 if no items are passed in', function () {
    var cartSummary = new CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  });
});