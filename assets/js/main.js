document.addEventListener('DOMContentLoaded', function () {
  var internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
