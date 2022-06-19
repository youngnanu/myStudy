$(function(){
  var slides = $('.slideshow img');
  var slideCount = slides.length;
  var currentIndex = 0;

  // 해당시간이 지나면 한번만 할일
  // var timer = setTimeout(할일, 1000);
  // clearTimeout(timer)

  // 일정시간마다 할일
  // var timer = setInterval(할일, 시간)
  // clearInterval(timer);
  // 특정번째 요소를 선택 --> eq()

  slides.eq(0).fadeIn();
  var timer = undefined;  //타이머의 값을 undefined(지정되어 있지 않다)라고 지정합니다.
  if (timer == undefined) { //타이머의 값이 undefined이면 showNextslide를 3.5s 마다 실행하라고 합니다.
    timer = setInterval(showNextSlide, 3500);
  }  
  function showNextSlide(){
    var nextIndex = (currentIndex + 1) % slideCount ;
    slides.eq(currentIndex).fadeOut();
    slides.eq(nextIndex).fadeIn();
    currentIndex = nextIndex;
  }

  slides.mouseenter(function(){
    if (timer) { //타이머의 값이 있으면 즉 setInterval(showNextSlide, 3500)값이 있으면 클리어하고 값을 다시 undefined로 저장.
      clearInterval(timer);
      timer = undefined;				
      }
  }).mouseleave(function(){
    if (!timer) { //타이머의 값이 undefined이면 showNextslide를 3.5s 마다 실행하라고 합니다.
      timer = setInterval(showNextSlide, 3500);
      } 
  })

})