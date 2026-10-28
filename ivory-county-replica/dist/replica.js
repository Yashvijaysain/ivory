(function () {
  var whatsappNumber = '919654322224';

  function openWhatsApp(message) {
    var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');
      if (!href || href.length < 2) return;
      var target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  var brochurePopup = document.getElementById('brochure-popup');
  var brochureForm = document.getElementById('brochure-download-form');
  var brochureName = document.getElementById('brochure-name');
  var brochurePhone = document.getElementById('brochure-phone');
  var brochureConsent = document.getElementById('brochure-consent');
  var brochureError = document.getElementById('brochure-form-error');
  var lastFocusedElement = null;

  function openBrochurePopup() {
    if (!brochurePopup) return;
    lastFocusedElement = document.activeElement;
    brochurePopup.classList.remove('is-complete');
    brochurePopup.hidden = false;
    document.body.classList.add('brochure-popup-open');
    window.setTimeout(function () {
      if (brochureName) brochureName.focus();
    }, 120);
  }

  function closeBrochurePopup() {
    if (!brochurePopup) return;
    brochurePopup.hidden = true;
    document.body.classList.remove('brochure-popup-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  window.openBrochurePopup = openBrochurePopup;

  document.querySelectorAll('[data-brochure-open]').forEach(function (control) {
    control.addEventListener('click', openBrochurePopup);
  });

  if (brochurePopup) {
    brochurePopup.querySelectorAll('[data-brochure-close]').forEach(function (control) {
      control.addEventListener('click', closeBrochurePopup);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !brochurePopup.hidden) {
        closeBrochurePopup();
      }
    });
  }

  if (brochureForm) {
    brochureForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var nameValue = String(brochureName.value || '').trim();
      var phoneValue = String(brochurePhone.value || '').trim();
      var phoneDigits = phoneValue.replace(/\D/g, '');
      brochureError.textContent = '';

      if (nameValue.length < 2) {
        brochureError.textContent = 'Please enter your name.';
        brochureName.focus();
        return;
      }

      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        brochureError.textContent = 'Please enter a valid phone number.';
        brochurePhone.focus();
        return;
      }

      if (!brochureConsent.checked) {
        brochureError.textContent = 'Please accept the contact consent and Privacy Policy.';
        brochureConsent.focus();
        return;
      }

      openWhatsApp('Hello, I am ' + nameValue + '. I would like project information for Ivory County. My callback number is ' + phoneValue + '.');
      brochurePopup.classList.add('is-complete');
      brochureForm.reset();
    });
  }

  var inquiryForm = document.getElementById('global_form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = String(inquiryForm.elements.Name.value || '').trim();
      var mobile = String(inquiryForm.elements.Mobile.value || '').trim();
      var email = String(inquiryForm.elements['E-Mail'].value || '').trim();
      var message = String(inquiryForm.elements.Message.value || '').trim();
      var consent = inquiryForm.elements.Consent;
      var status = inquiryForm.querySelector('.replica-form-message');
      var mobileDigits = mobile.replace(/\D/g, '');
      status.textContent = '';

      if (name.length < 2 || mobileDigits.length < 10 || mobileDigits.length > 15 || !email || !inquiryForm.elements['E-Mail'].checkValidity()) {
        status.textContent = 'Please enter a valid name, mobile number and email address.';
        return;
      }

      if (!consent.checked) {
        status.textContent = 'Please accept the contact consent and Privacy Policy.';
        consent.focus();
        return;
      }

      var whatsappMessage = 'Hello, I am ' + name + '. I am interested in Ivory County. Please contact me on ' + mobile + '. My email is ' + email + '.';
      if (message) whatsappMessage += ' Message: ' + message;
      openWhatsApp(whatsappMessage);
      status.textContent = 'WhatsApp is opening so you can send your enquiry directly.';
      inquiryForm.reset();
    });
  }
})();
