// (function($) { // Begin jQuery
//     $(function() { // DOM ready
//       // If a link has a dropdown, add sub menu toggle.
//       $('nav ul li a:not(:only-child)').click(function(e) {
//         $(this).siblings('.nav-item-drop').toggle();
//         // Close one dropdown when selecting another
//         $('.nav-item-drop').not($(this).siblings()).hide();
//         e.stopPropagation();
//       });
//       // Clicking away from dropdown will remove the dropdown class
//       $('html').click(function() {
//         $('.nav-item-drop').hide();
//       });
//       // Toggle open and close nav styles on click
//       $('#nav-toggle').click(function() {
//         $('nav ul').slideToggle();
//       });
//       // Hamburger to X toggle
//       $('#nav-toggle').on('click', function() {
//         this.classList.toggle('active');
//       });
//     }); // end DOM ready
//   })(jQuery); // end jQuery


var $slider = $(".slider"), $bullets = $(".bullets");
function calculateHeight(){
    var height = $(".slide.active").outerHeight();
    $slider.height(height);
}

$(window).resize(function() {
    calculateHeight();
    clearTimeout($.data(this, 'resizeTimer'));
});

function resetSlides(){
    $(".slide.inactive").removeClass("inactiveRight").removeClass("inactiveLeft");
}

function gotoSlide($activeSlide, $slide, className){
    $activeSlide.removeClass("active").addClass("inactive "+className);
    $slide.removeClass("inactive").addClass("active");
    calculateHeight();
    resetBullets();
    setTimeout(resetSlides, 300);
}

$(".next").on("click", function(){
    var $activeSlide = $(".slide.active"),
    $nextSlide = $activeSlide.next(".slide").length != 0 ? $activeSlide.next(".slide") : $(".slide:first-child");
    console.log($nextSlide);
    gotoSlide($activeSlide, $nextSlide, "inactiveLeft");
});
$(".previous").on("click",  function(){
    var $activeSlide = $(".slide.active"),
    $prevSlide = $activeSlide.prev(".slide").length != 0 ? $activeSlide.prev(".slide") : $(".slide:last-child");

    gotoSlide($activeSlide, $prevSlide, "inactiveRight");
});
$(document).on("click", ".bullet", function(){
    if($(this).hasClass("active")){
        return;
    }
    var $activeSlide = $(".slide.active");
    var currentIndex = $activeSlide.index();
    var targetIndex = $(this).index();
    console.log(currentIndex, targetIndex);
    var $theSlide = $(".slide:nth-child("+(targetIndex+1)+")");
    gotoSlide($activeSlide, $theSlide, currentIndex > targetIndex ? "inactiveRight" : "inactiveLeft");
})
function addBullets(){
    var total = $(".slide").length, index = $(".slide.active").index();
    for (var i=0; i < total; i++){
        var $bullet = $("<div>").addClass("bullet");
        if(i==index){
            $bullet.addClass("active");	
        }
        $bullets.append($bullet);
    }
}
function resetBullets(){
    $(".bullet.active").removeClass("active");
    var index = $(".slide.active").index()+1;
    console.log(index);
    $(".bullet:nth-child("+index+")").addClass("active");
}
addBullets();
calculateHeight();	