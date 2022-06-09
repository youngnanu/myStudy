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
});