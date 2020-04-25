function sendBookingConfirmationMail() {
  var name = document.getElementById('bookingForm')['name'].value;
  var email = document.getElementById('bookingForm')['email'].value;
  var phone = document.getElementById('bookingForm')['phone'].value;
  var model = document.getElementById('bookingForm')['model'].value;
  var issue = document.getElementById('bookingIssue').value;
  var location = document.getElementById('bookingForm')['location'].value;

  const bookingDetails = {
    name,
    email,
    phone,
    model,
    issue,
    location
  };
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    sendBookingAckMail(bookingDetails);
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    //show error message
    // console.log("BOOKING FAILED")
    alert('Your request could not be submitted at this moment. Please try later.');
  });

  XHR.open(
    'POST',
    'https://us-central1-smart-services-7875d.cloudfunctions.net/bookingConfirmation'
  );
  XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  XHR.send(
    `name=${name}&email=${email}&phone=${phone}&model=${model}&issue=${issue}&location=${location}`
  );
}

function sendBookingAckMail(bookingDetails) {
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    //redirect to booking thank you page
    window.location.href = 'booking-thankyou.html';
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    //show error message
    // console.log("BOOKING FAILED")
    alert('Your request could not be submitted at this moment. Please try later.');
  });

  XHR.open(
    'POST',
    'https://us-central1-smart-services-7875d.cloudfunctions.net/bookingAcknowledgment'
  );
  XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  XHR.send(
    `name=${bookingDetails.name}&email=${bookingDetails.email}&phone=${bookingDetails.phone}&model=${bookingDetails.model}&issue=${bookingDetails.issue}&location=${bookingDetails.location}`
  );
}

function sendContactMsgConfirmationMail() {
  var name = document.getElementById('contactForm')['contactName'].value;
  var email = document.getElementById('contactForm')['contactEmail'].value;
  var phone = document.getElementById('contactForm')['phonenumber'].value;
  var message = document.getElementById('contactMsg').value;

  const contactMsgDetails = {
    name,
    email,
    phone,
    message
  };
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    sendContactMsgAckMail(contactMsgDetails);
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    //show error message
    alert('Your message could not be sent at this moment. Please try later.');
  });

  XHR.open('POST', 'https://us-central1-smart-services-7875d.cloudfunctions.net/contactMessage');
  XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  XHR.send(`name=${name}&email=${email}&phone=${phone}&message=${message}`);
}

function sendContactMsgAckMail(contactMsgDetails) {
  var XHR = new XMLHttpRequest();

  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    //redirect to contact thank you page
    window.location.href = 'contact-thankyou.html';
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    //show error message
    alert('Your message could not be sent at this moment. Please try later.');
  });

  XHR.open(
    'POST',
    'https://us-central1-smart-services-7875d.cloudfunctions.net/contactAcknowledgment'
  );
  XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  XHR.send(
    `name=${contactMsgDetails.name}&email=${contactMsgDetails.email}&phone=${contactMsgDetails.phone}&message=${contactMsgDetails.message}`
  );
}
