$(function(){
  var container = $('.slideshow'),
      slideGroup = container.find('.slideshow_slides'),
      slides = slideGroup.find('a'),
      nav = container.find('.slideshow_nav'),
      indicator = container.find('.indicator'),
      slideCount = slides.length,
      indicatorHtml = '',  //<a href="">1</a> 넣을예정
      currentIndex = 0,
      duration = 500,
      easing = 'easeInOutExpo',
      interval = 3500,
      timer;
      // console.log(slides); 
      slides.each(function(i){
        var newLeft = i * 100 + '%';
        $(this).css({left:newLeft});
        indicatorHtml += '<a href="#">' + (i + 1) + '</a>';
      });
      indicator.html(indicatorHtml);

      function gotoSlide(index){
        slideGroup.animate({left:-100 * index + '%'}, duration, easing);
        currentIndex = index;
      }
      indicator.find('a').click(function(e){
        e.preventDefault();
        var idx = $(this).index();
        gotoSlide(idx);
      });

      nav.find('a').click(function(e){
        e.preventDefault();
        if($(this).hasClass('prev')){
            gotoSlide(currentIndex - 1);
          }
        else{
          gotoSlide(currentIndex + 1);
        }
        navStatus();
      });
      function navStatus(){
        if(currentIndex == 0){
          nav.find('.prev').addClass('disabled');
        }else {
          nav.find('.prev').removeClass('disabled');
        }
        if(currentIndex == slideCount - 1){
          nav.find('.next').addClass('disabled');
        }else {
          nav.find('.next').removeClass('disabled');
        }
      }

      // gotoSlide(2);
})