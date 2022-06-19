$(function(){
  var $aside = $('aside');
  var $button = $aside.find('button');
  var $duration = 300;


  // 속성변경하기, 속성의 값을 반환하기
  // var c = A.attr('b') --> A라는 요소의 b라는 속성의 값을 변수c에 저장
  // A.attr('b', 'c')  --> A라는 요소에 b라는 속성의 값을 c로 변경
  $button.click(function(){
    $aside.toggleClass('open');
    if($aside.hasClass('open')){
      //$aside.stop().animate({left:'-70px'}, $duration, 'easeOutBack');
      $(this).find('img').attr('src', 'img/btn_close.png');
    }
    else{
      //$aside.stop().animate({left:'-350px'}, $duration, 'easeInBack');
      $(this).find('img').attr('src', 'img/btn_open.png');
    }
    
  });
})