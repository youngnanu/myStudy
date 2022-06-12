$(function(){
  $('#typo .inner').click(function(){
    //선택자.animate({속성:값,속성:값}, 시간, 이징, 끝나고난뒤다른할일);
    $(this).animate({opacity:0, fontSize:'0px'},1000, 'easeInOutElastic', 
      function(){
        $(this).animate({opacity:1,fontSize:'110px'},500);
      }
    );
  });
  $('ul').on('click', 'li', function(){
    $(this).animate({backgroundColor:'#ccc', color:'#ff0000'}, 1000);
  })

  $('.box1').animate({height:'500px'},1000, function(){
    $(this).animate({height:'200px'}, 500)
  })

  $('.box2').mouseover(function(){
    //stop() --> 이전에 했던것을 무조건 멈추고 다음 함수를 실행  styp(true)가 기본이기때문에 true생략가능
    $(this).stop(true).animate({backgroundColor:'#001235'}, 500);
  }).mouseout(function(){
    $(this).stop(true).animate({backgroundColor:'#945245'}, 500)
  })
});