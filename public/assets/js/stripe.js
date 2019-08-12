var stripe = Stripe("pk_test_karsmt0rzRKNQFzBMmj02VGZ00jgAWpFlU");

var checkoutButton = document.getElementById(
  "checkout-button-sku_Fbe2vWevNEkBlM"
);
checkoutButton.addEventListener("click", function() {
  // When the customer clicks on the button, redirect
  // them to Checkout.
  stripe
    .redirectToCheckout({
      items: [{ sku: "sku_Fbe2vWevNEkBlM", quantity: 1 }],

      // Do not rely on the redirect to the successUrl for fulfilling
      // purchases, customers may not always reach the success_url after
      // a successful payment.
      // Instead use one of the strategies described in
      // https://stripe.com/docs/payments/checkout/fulfillment
      successUrl:
        window.location.protocol + "//quantla.herokuapp.com/success.html",
      cancelUrl:
        window.location.protocol + "//quantla.herokuapp.com/canceled.html"
    })
    .then(function(result) {
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer.
        var displayError = document.getElementById("error-message");
        displayError.textContent = result.error.message;
      }
    });
});
