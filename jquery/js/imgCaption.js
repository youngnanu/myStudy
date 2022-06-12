$(function(){
  let $duration = 300;
  let $image = $('#images p');

  /*
    공백이 있음 = find
    공백이 없음 = filter
    #images p span { } --> $image.find('span)
    #images p.strong { }  -->  $image.filter('string)
  */

   //#images p:nth-child(1)  -->  $image.filter(':nth-child(1)')  //공백이 없으므로 filter

 $image.filter(':nth-child(1)').mouseover(function(){
    //$(this).find('span').animate({opacity:1}, $duration);
    //$(this).find('strong').animate({opacity:1}, $duration);
    $(this).find('span, strong').stop().animate({opacity:1}, $duration);
  }).mouseout(function(){
    $(this).find('span, strong').stop().animate({opacity:0}, $duration);
  });

  $image.filter(':nth-child(2)').mouseover(function(){
    $(this).find('span').stop().animate({opacity:1}, $duration);
    $(this).find('strong').stop().animate({opacity:1,left:'0%'}, $duration);
  }).mouseout(function(){
    $(this).find('span').stop().animate({opacity:0}, $duration);
    $(this).find('strong').stop().animate({opacity:0, left:'-200%'}, $duration);
  });

  $image.filter(':nth-child(3)').mouseover(function(){
    $(this).find('span').stop().animate({opacity:1}, $duration);
    $(this).find('strong').stop().animate({opacity:1,bottom:'0px'}, $duration);
    $(this).find('img').stop().animate({top:'-40px'}, $duration);
  }).mouseout(function(){
    $(this).find('span').stop().animate({opacity:0}, $duration);
    $(this).find('strong').stop().animate({opacity:0,bottom:'-80px'}, $duration);
    $(this).find('img').stop().animate({top:'0px'}, $duration);
  });



})();