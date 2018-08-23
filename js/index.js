function turnicon(){
	$("#turnleft").css("opacity","1");
	$("#turnright").css("opacity","1");}

function outicon(){
	$("#turnleft").css("opacity","0");
	$("#turnright").css("opacity","0");}

window.onload=function(){
	
	lunbo();
	fudong();
	selectbtn();
	
}

function selectbtn(){
	$(".main-select ul li").each(function(){
		$(this).hover(function(){
			$(this).find("img").hide();
			$(this).find("button").show();
			},function(){
				$(this).find("img").show();
			    $(this).find("button").hide();
				});
		});
	
	}


function fudong(){
	var rollSet = $('#top');
	var offset = rollSet.offset();                     //获取加载出页面后浮动栏当前位置
	var scrollTop = $(window).scrollTop();            //滚动条滚动了的高度
	var fheight = $("#top").height();    //想要停止位置距顶部的距离

	if(offset.top<fheight){  
		rollSet.removeClass('div0_top2').addClass('div0_top');}
	else{
		$("#empty").show();
		rollSet.removeClass('div0_top').addClass('div0_top2');
	}
	
    //处理滚动页面后
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >0) {     //浮动栏处于停止移动位置下方时
			   $("#empty").show();
                rollSet.removeClass('div0_top').addClass('div0_top2');
        } else {
			 $("#empty").hide();
            rollSet.removeClass('div0_top2').addClass('div0_top');
        }
    });
 }

$(window).resize(function(){
    $(".content ul li").css("width",$(window).width());

});


function lunbo(){
	var i,left,right,box,boxli,boxleng,width,dot,first,last,IsAuto;
	i = 0;    
	left = $("#turnleft"); 	
	right = $("#turnright");	
	box = $(".content ul");	
	boxli = $(".content li");	
	dotbox = $(".sel ul");	
	dot = $(".sel ul li");	
	width = boxli.width();	
	boxleng = boxli.length;	
	boxli.css({width:width});	
	dot.eq(0).addClass("on");
	boxli.eq(0).addClass("bar1");
		
	boxli.each(function(index) {
       zindex = boxleng-(index+1);
	   $(this).css({"z-index":zindex})
    });
	
	IsAuto = true;

	left.click(function(){
		if(box.is(":animated")){return}
		i--;
		if(i<0){i=boxleng-1};
		boxanimate();
		
	})
	
	right.click(function(){
		if(box.is(":animated")){return}
		i++;
		boxanimate();
	})
	
	function boxanimate(){
		if(i>boxleng-1){i=0}		
		boxli.addClass("bar");
		setTimeout(function(){
			boxli.removeClass("bar");
			boxli.removeClass("bar1").eq(i).addClass("bar1");
			boxli.stop().animate({opacity:0,"z-index":"1"},300).eq(i).stop().animate({opacity:1,"z-index":boxleng},300);
			bannerdot(i)
		},100)	
	}
	
	function bannerdot(i){
		if(i>boxleng-1){i=0}
		dot.removeClass("on").eq(i).addClass("on");
	}

	dot.mouseenter(function(){
		i = $(this).index();
		bannerdot(i);
		boxanimate(i);
	})
	
	setInterval(function(){
		if(IsAuto){
			i++;
			boxanimate();
			bannerdot(i)
		}
	},2000)
	
	box.hover(function(){
		IsAuto = false;
	},function(){
		IsAuto = true;
	})
	
	dotbox.hover(function(){
		IsAuto = false;
	},function(){
		IsAuto = true;
	})
	
	left.hover(function(){
		IsAuto = false;
	},function(){
		IsAuto = true;
	})
	
	right.hover(function(){
		IsAuto = false;
	},function(){
		IsAuto = true;
	})
	
	
	}