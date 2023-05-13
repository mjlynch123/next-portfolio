// Add an event listener to each button
document.querySelectorAll('.navBtn').forEach(function(button) {
    button.addEventListener('click', function(event) {
      // Prevent the default behavior of the button
      event.preventDefault();
  
      // Get the ID of the section to scroll to
      var targetId = this.getAttribute('href');
  
      // Scroll to the section using smooth behavior
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });