$(function(){
  var $duration = 300;
  var $button = $('#buttons2 button');
 
  //자바스크립트 문법
  // var $buttons = document.getElementsByTagName('button');
  //console.log($buttons); //배열로 들어옴
  // $buttons[0].style.top = '-40px';
  // $buttons[1].style.top = '0px';
  // $buttons[2].style.top = '40px';
  // $buttons[3].style.top = '80px';

  // 반복문으로
  // for(let i=0; i<$buttons.length; i++){
  //   $buttons[i].style.top = i * 40 - 40 + 'px';
  // }


  // jquery 반복문 선택자.each(function)
  //var $button = $('#button2 button'); -> 제이쿼리는 자동 배열로 들어감
 
  $button.each(function(idx){
    console.log(idx);
    var newtop = idx * 40 - 40 + 'px';
    $(this).css({top: newtop});
  })
  .mouseover(function(){
    $(this).find('img:first-child').stop().animate({opacity:0}, $duration);
    $(this).stop().animate({backgroundColor:'#ffcc00',color:'#fff'},$duration);
    $(this).find('img:nth-child(2)').stop().animate({opacity:1}, $duration);
  })
  .mouseout(function(){
    $(this).stop().animate({backgroundColor:'#ffffff', color:'#01b169'},$duration);
    $(this).find('img:first-child').stop().animate({opacity:1}, $duration);
    $(this).find('img:nth-child(2)').stop().animate({opacity:0}, $duration);
  });

});