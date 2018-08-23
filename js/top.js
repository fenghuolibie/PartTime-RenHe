$(function(){
  var rollSet = $('#top');
  var offset = rollSet.offset();
  var scrollTop = $(window).scrollTop();
  var fheight = $("#top").height()+$("#top11").height();

  if(offset.top<fheight){
    rollSet.removeClass('div0_top2').addClass('div0_top');}
  else{
    $("#empty").show();
    rollSet.removeClass('div0_top').addClass('div0_top2');
  }

  $(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >$("#top11").height()) {
      $("#empty").show();
      rollSet.removeClass('div0_top').addClass('div0_top2');
    } else {
      $("#empty").hide();
      rollSet.removeClass('div0_top2').addClass('div0_top');
    }
  });

});

$(function(){
  $(window).on('scroll', function(){//监听滚动事件
    checkShow();
  })
  checkShow();
  function checkShow(){//检查元素是否在可视范围内
    for(var i=0;i<$('.wrap').find('img').length;i++){

      var winH = $(window).height();//获取窗口高度
      var scrollH = $(window).scrollTop();//获取窗口滚动高度
      var top = $('.wrap').find('img').eq(i).offset().top;//获取元素距离窗口顶部偏移高度

      if(top < scrollH + winH){
        $('.wrap').find('img').eq(i).attr('src', $('.wrap').find('img').eq(i).attr('data-src'));//在可视范围
      }else{

        return false;//不在可视范围
      }
    }
  }



});