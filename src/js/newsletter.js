const formSubmitted = sessionStorage.getItem("formSubmitted");

if (formSubmitted) {
  // Display message
  document.getElementById("subscriptionMessage").style.display = "block";

  // Clear only the 'formSubmitted' item from sessionStorage
  sessionStorage.removeItem("formSubmitted");
}

document
  .getElementById("subscribeButton")
  .addEventListener("click", function () {
    // Display the subscription message
    document.getElementById("subscriptionMessage").style.display = "block";
  });

    sessionStorage.setItem("formSubmitted", "true");


window.addEventListener('beforeunload', function () {
  sessionStorage.removeItem('formSubmitted');
});   
  