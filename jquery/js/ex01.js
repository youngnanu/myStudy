$(function(){
  // $('#typo').on('mouseover', function(){
  //   $('#typo').css({
  //     backgroundColor: '#ccc',
  //     color:'#ff0000'
  //   })
  // }).on('mouseout', function(){
  //   $('#typo').css({
  //     backgroundColor: '#3498db',
  //     color:'#fff'
  //   })
  // });
  
  //위 코드를 줄이면
  // $('#typo').mouseover(function(){
  //   $('#typo').css({
  //     backgroundColor: '#ccc',
  //     color:'#ff0000'
  //   })
  // }).mouseout(function(){
  //   $('#typo').css({
  //     backgroundColor: '#3498db',
  //     color:'#fff'
  //   })
  // });

  //===============================
  // $(this) -> 이벤트가 일어난 그것
  $('#typo, h1').mouseover(function(){
    $(this).css('background', 'green');
  });
  $('#typo, h1').mouseout(function(){
    $(this).css('background', 'lightblue');
  });


});