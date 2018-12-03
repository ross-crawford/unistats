// Wrap all functionality in document ready function
$(document).ready(function() {
  // responsive navbar icon to change from bars to cross on open/close
  $(".menu-toggle").click(function() {
    $("nav").toggleClass("active");
    if ($(".menu-toggle > i").hasClass("fa-bars")) {
      $(".menu-toggle > i").removeClass("fa-bars");
      $(".menu-toggle > i").addClass("fa-times");
    } else {
      $(".menu-toggle > i").removeClass("fa-times");
      $(".menu-toggle > i").addClass("fa-bars");
    }
  });

  // Scroll top button (and about active link for home page)
  let prevScrollPos = window.pageYOffset;
  window.onscroll = () => {
    currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 600) {
      $("#about-link").addClass("active");
      $(".gotop").slideDown();
    } else {
      $("#about-link").removeClass("active");
      $(".gotop").slideUp();
    }
  };
});
