var commonPopArr =new Array(); // 팝업 ID 배열 전역변수

this.ui=this.ui||(function(){
//*******************************************//
// 교보생명 공통 UI
//*******************************************//
var ui = { //
	init:function(){ // 초기구동
		this.cm.init();
		this.skip.init();
		this.gnb.init();
		this.ly.init();
		this.form.init();
		this.keypad.init();
		this.tooltip.init();
		this.toolpop.init();
		this.fsize.init();
		this.balloon.init();
		this.range.init();
		this.accd.init();
		this.tog.init();
		this.togs.init();
		this.tabs.init();
		this.popup.init();
		this.slides.init();
		this.datepick.init();
		this.monthpick.init();
		this.getSafe.init();
		this.topfix.init();
		this.gnbtopfix.init();
		this.steps.init();
		this.caption.init();
		this.keytab.init();
		this.tbl.init();
		this.inputFocus.init(); // join-step 모바일 전용 키패드 올라올때 인풋에 포커스 *ui 변경 시 삭제(현재 ui 이상...) 
		ui.init=function(){};
	},
	update:function(){ // 페이지 동적으로 뿌린 후 업데이트 ui.update();
		this.datepick.set();
		this.monthpick.set();
		this.range.set();
		this.form.set();
		this.accd.set();
		this.tabs.set();
		this.tog.set();
		this.togs.set();
		this.skip.set();
		this.popup.set();
		this.slides.set();
		this.steps.set();
		this.caption.set();
		this.tbl.set();
	},
	transitionend:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
	skip:{ // 본문으로 스킵
		init:function() {
			this.set();
			this.evt();
		},
		els:'<div id="skip-nav"></div>',
		evt:function(){
			$(document).on("click","#skip-nav a[data-href='#gnb']",function(e){
				$(".header .bt.gnb:visible").focus();
				// $("#gnb").attr("tabindex","-1").focus();
				e.preventDefault();
			});
			$(document).on("click","#skip-nav a[data-href='#container']",function(e){
				$("#container").attr("tabindex","-1").focus();
				$(window).scrollTop(0);
				e.preventDefault();
			});
		},
		set:function(){
			if(!$("#skip-nav").length ) {
				$(".body:not(.ui)").prepend(this.els);
			}
			if( $("#container").length && !$("#skip-nav a[data-href='#container']").length ) {
				$("#skip-nav").append('<a href="javascript:;" data-href="#container" role="button"><span>본문 바로가기</span></a>');
			}
			if( $(".header .bt.gnb:visible").length && !$("#skip-nav a[data-href='#gnb']").length && $("nav.gnb").data("visible")!=false) {
				$("#skip-nav").prepend('<a href="javascript:;" data-href="#gnb" role="button"><span>메뉴 바로가기</span></a>');
			}
		}
	},
	debug:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(window).on("scroll resize load", function() {
				_this.set();
			});
		},
		set:function(){
			var dhtml = '<div id="debug"></div>';
			!$("#debug").length && $("body").prepend(dhtml);
			var wHt = ui.viewport.height();
			var docH= ui.viewport.docHeight();
			var scr = ui.viewport.scrollTop() + wHt + 0;
			var sct = ui.viewport.scrollTop();
			$("#debug").html('SCT : '+ sct + ' ,SCR : '+ scr + ' , DOCH : ' +docH + " , visualViewport : "+ wHt+"  , iosX :  "+JSON.stringify( ui.getSafe ) );
		}
	},
	caption:{ // 테이블 th 내용으로 캡션문구 만들기
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){

		},
		set:function(){
			$(".ut-tbl table").each(function(){
				var thtxt = $(this).find("th");
				var cap ="";
				thtxt.each( function(i) {
					dot = i == 0 ? "": ", ";
					var th = dot + $(this).text();
					cap = cap + th;
				});
				var capti = cap + " 로 구성된 테이블입니다.";
				$(this).find("caption .cap").text(capti);
			});
		}
	},
	viewport:{ // 부라우저 뷰포트 사이즈 구하기
		height:function(){
			return parseInt( window.visualViewport ? visualViewport.height : window.innerHeight );
		},
		width:function(){
			return parseInt( window.visualViewport ? visualViewport.width : window.innerWidth );
		},
		docHeight:function(){
			return parseInt( document.documentElement.scrollHeight || document.body.clientHeight );
		},
		scrollTop:function(){
			var num = window.visualViewport ? visualViewport.pageTop : document.documentElement.scrollTop;
			return parseInt( num <= 0 ? 0 : num );
		},
		scrollLeft:function(){
			var num = window.visualViewport ? visualViewport.pageLeft :document.documentElement.scrollLeft;
			return parseInt( num <= 0 ? 0 : num );
		}
	},
	keypad:{ // 키패드 올라왔는지 내려갔는지 추측해보자
		init:function(){
			this.set();
			this.evt();
		},
		viewh:null,
		set:function(){
			this.viewh = ui.viewport.height();
			// console.log( this.viewh );
			var testElement = document.createElement('p');
			testElement.style.position = 'fixed';

			function isKeyboardVisible() {
				testElement.style.top = 0;
				return !!testElement.offsetTop;
			}

			setTimeout(function() {
				// console.log(  isKeyboardVisible() ? 'Keyboard is visible' : 'Keyboard is not visisble');
				if( isKeyboardVisible() ){
					$("body").addClass("is-keypad");
					$("body.ui .keystat").html('<b>KeyShow</b>');
				}else{
					$("body").removeClass("is-keypad");
					$("body.ui .keystat").html('');
				}
			}, 500);
		},
		evt:function(){
			var _this = this;
			$(document).on({
				"focus":function(e){
					//$("body").addClass("is-keypad");
				},
				"blur":function(e){
					//$("body").removeClass("is-keypad");
				}
			},"input:not([type=radio] , [type=checkbox] , [type=file]),textarea");
			$(window).on("resize", function(){
				var viewh_now = ui.viewport.height();
				if (viewh_now < _this.viewh - 100 ) {
					$("body").addClass("is-keypad");
					$("body.ui .keystat").html('<b>KeyShow</b>');
				}else{
					$("body").removeClass("is-keypad");
					$("body.ui .keystat").html('');
				}
			});
		}
	},
	keytab:{ /* 웹접근성 팝업안에서 탭키이동 */
		init:function(){
			// ui.keytab.set( $("body") );
		},
		set:function($els){
			$(document).on("keydown",function(){
				var pbd = $els;
				var pls = pbd.find("button:not([disabled]) , input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
				var peF = pls && pls.first();
				var peL = pls && pls.last();

				pls.length ? peF.on("keydown", function(event) {
					// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
					if (event.shiftKey && (event.keyCode || event.which) === 9) {
						// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
						event.preventDefault();
						peL.focus();
					}
				}) : pbd.attr("tabindex", "0").focus().on("keydown", function(event){
					tabDisable = true;
					if ((event.keyCode || event.which) === 9) event.preventDefault();
					// Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
				});

				peL.on("keydown", function(event) {
					if (!event.shiftKey && (event.keyCode || event.which) === 9) {
						// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
						event.preventDefault();
						peF.focus();
					}
				});
			});
		}
	},
	cm:{ // 공통
		init:function(){
			window.addEventListener('resize', () => { 
				document.querySelector(':root').style
				  .setProperty('--vh', window.innerHeight/100 + 'rem');
			});
		}
	},
	tbl:{ // 테이블 스크롤 고정   /guide/test.html
		init:function(){
			this.set();
		},
		set:function(){
			$(".ut-tbl.fixed-x").each(function(){

				if( $(this).find(".tbl-dumy").length) {
					$(this).find(".tbl-real .tbl-screen").remove();
					$(this).find(".tbl-real .tblist").unwrap();
					$(this).find(".tbl-dumy").remove();
				}

				var $tbl = $(this).find(">.tblist");

				$(this).append('<div class="tbl-dumy" aria-hidden="true"></div>');

				$tbl.clone().appendTo( $(this).find(".tbl-dumy") );
				$tbl.wrap('<div class="tbl-real"></div>');
				$(this).find(".tbl-real").prepend('<div class="tbl-screen"></div>');
				var fixWidth = $(this).find(".tbl-real th.fixed").outerWidth();
				$(this).find(".tbl-dumy").css("width",fixWidth+"rem");
				$(this).find(".tbl-real .tbl-screen").css("width",fixWidth+"rem");

				var utWidth  = $(this).outerWidth();
				var tbWidth  = $(this).find(".tbl-real").prop('scrollWidth');
				if (utWidth < tbWidth) {
					$(this).find(".tbl-dumy").removeClass("hide");
				}else{
					$(this).find(".tbl-dumy").addClass("hide");
				}

				// console.log(fixWidth, $(this).outerWidth()   )  ;
			});
		}
	},
	prd:{ // /mo/html/prd/UI-PPRINPD6121MS.html

	},
	isUA:function(t){ // 디바이스 구분
		t = t.split(" ");
		for (var i = 0; i < t.length; i++) {
			result = navigator.userAgent.indexOf(t[i]) > -1 ? true : false ;
			if (!result) {
				return result ;
			}
		}
		return result ;
	},
	getSafe:{ // 아이폰X 여백값
		init:function(){
			var _this = this;
			var computed, div = document.createElement('div');
			div.style.padding = 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
			document.body.appendChild(div);
			computed = getComputedStyle(div);
			_this.top= parseInt(computed.paddingTop) || 0;
			_this.right= parseInt(computed.paddingRight) || 0;
			_this.bottom= parseInt(computed.paddingBottom) || 0;
			_this.left= parseInt(computed.paddingLeft) || 0;
			document.body.removeChild(div);
		}
	},
	param:(function(a) { // URL에서 파라미터 읽어오기  ui.param.***
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; i++){
				var p=a[i].split('=');
				if (p.length != 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(window.location.search.substr(1).split('&')),
	gnb_old: { // GNB - old 스크롤 방식 탭방식으로 변경전 사용함 (나중에 삭제)
		init: function() {
			//ui.gnb.using("open");
			var _this = this;
			
			this.cateScroll();

			$(document).on("click", ".header .bt.gnb", function() {
				if( $("body").hasClass("is-pop-gnb")) {
					_this.using("close");
				} else {
					_this.using("open");
				}
			});
			
			$(document).on("click", ".gnb-screen , nav.gnb .bt.close", function() {
				_this.using("close");
			});

			$("nav.gnb .cateCont ul li a").each(function(){
				var subCk = $(this).closest("li").find("ul").length;
				if(subCk>0) $(this).addClass("sub");
			});

			// 2022-05-20 4,5depth 존재시 첫번째 ul에 적용 =>.first()
			$(document).on("click", "nav.gnb .cateCont ul li a.sub", function() {
				$(this).toggleClass("open");
				$(this).closest("li").find("ul").first().slideToggle("fast");
			});

			var menu = $('.menu-wrap .menu li');
			var	menuCont = $('.cateCont');
			var cateCnt = $('.cateCont').length;
			var wH = $(window).innerHeight();
			var headerH = $('nav.gnb .phd .in').innerHeight(); 
			var infoH = $('nav.gnb .pct .info').innerHeight();
			//menuCont.eq(cateCnt-1).css("height",wH-(headerH+infoH));
			
			var lastContH = menuCont.eq(cateCnt-1).innerHeight();
			if(lastContH > wH) wH = (lastContH + wH) - (lastContH - wH);
			menuCont.eq(cateCnt-1).css("height",wH);

			menu.on('click','a', function(e){
				//없어도 동작하나 animate효과등 별도로 주기위해 작성
				var target = $(this).parent();
				var idx = target.index();
				var h = [];

				for(var k=0;k<=idx;k++){ 
					h[k] = menuCont.eq(k).innerHeight(); 
				}
				h.unshift(0);//처음카테고리 영역 높이는 더하지 않음
				h.pop();
				var hsum = h.reduce((a, b) => a + b, 0);
				if(idx==0) hsum = 0;

				var is_fixed = $(this).closest(".menu-wrap");
				var mw_top = $("#gnb .phd .in").innerHeight() + $("#gnb .pct .info").innerHeight() - 48

				if(!$(is_fixed).hasClass("fixed")) {
					$('#gnb .pct').animate({ scrollTop: mw_top},500);
					setTimeout(() => {
						$(".list.other").addClass("fixed");
						$(".menu-wrap").addClass("fixed");
						$('.cates').animate({ scrollTop: hsum},500).addClass("bind");
						$(this).closest("li").addClass("active").siblings("li").removeClass("active");
					}, 500);
					console.log('not_fixed')
				} else {
					$('.cates').animate({ scrollTop: hsum},500).addClass("bind");
					$(this).closest("li").addClass("active").siblings("li").removeClass("active");
					// if(idx==0) {
					// 	$(".menu-wrap").css("top", mw_top);
					// 	$("#wrap.wrap").css("padding-bottom","calc("+(floatbtHT)+"rem + env(safe-area-inset-bottom))");
					// }
					// else {
					// 	$('.cates').animate({ scrollTop: hsum},500).addClass("bind");
					// 	$(this).closest("li").addClass("active").siblings("li").removeClass("active");
					// }
					console.log('fixed');
					console.log(idx);
				}
				return false;
			});

			// // [D] 2022-05-02 전체메뉴
			// $(".menu-wrap .menu .bt").on("click", function(e) {
			// 	var headerH = $("#gnb .phd .in").innerHeight();
			// 	var infoH = $("#gnb .pct .info").innerHeight();
			// 	var baseH = headerH+infoH-48;

			// 	if(!$(this).hasClass("bt-fresh")) {
			// 		$(this).closest("li").addClass("active").siblings("li").removeClass("active");
			// 		$('#gnb .pct').animate({ scrollTop: baseH},500).addClass("bind");
			// 	}
			// });

			$("#gnb:not(.abt) .pct").on("scroll",function(){
				var scrTop = $(this).scrollTop();
				var headerH = $("#gnb .phd .in").innerHeight();
				var infoH = $("#gnb .pct .info").innerHeight();
				var baseH = headerH+infoH-48;

				if (scrTop > baseH) {
					$(".menu-wrap").addClass("fixed");
					$(".list.other").addClass("fixed");
				}
			});
		},
		cateScroll:function(){
			var _this = this;

			var menu = $('.menu-wrap .menu li');
			var	menuCont = $('.cateCont');
			var lastPs = 0;
			$('#gnb:not(.abt) .cates').on("scroll",function(){
				var catesTop = $('.cates').scrollTop(); 
				var headerH = $('.phd .in').innerHeight(); 
				//var infoH = $('.pct .info').innerHeight();
				var gap = 32;//cateCont 상단여백, 없으면 클릭 active index와 차이가 남

				//console.log("cates scroll:"+catesTop);
				if(catesTop === 0) {
					$(".menu-wrap").removeClass("fixed");
					$(".list.other").removeClass("fixed");
				}
				
				$.each(menuCont, function(idx, item){
					var target = menuCont.eq(idx);
					var targetTop = target.offset().top;
					//var baseH = headerH + infoH + gap;
					var baseH = headerH + gap;
					//console.log("(0):"+menuCont.eq(0).offset().top+", (1):"+menuCont.eq(1).offset().top+", (2):"+menuCont.eq(2).offset().top+", (3):"+menuCont.eq(3).offset().top+", (4):"+menuCont.eq(4).offset().top+", (5):"+menuCont.eq(5).offset().top+", (scrolltop):"+catesTop);
					
					if($(".cates").hasClass("bind")){
						setTimeout(function(){ $(".cates").removeClass("bind"); }, 500);
					}
					else {
						if (targetTop<baseH) { 
							menu.removeClass('active');
							menu.find("a").css("outline","0"); 
							menu.eq(idx).addClass('active');
						} 
						else {
							//console.log(targetTop);
						}
						if (!(baseH <= catesTop)) { 
							menu.eq(0).addClass('active');
						}
					}
				});
			});
		},
		using: function(opt) {
			if( opt === "open") {
				ui.popup.open('gnb',{
					"direct":"right",
					ocb:function(){
						ui.update();
					},
					ccb:function(){
						$(".header .bt.gnb").focus();
					}
				});
			}
			if( opt === "close") {
				ui.popup.close('gnb');
			}
		}
	},
	gnb: { // GNB tab 방식
		init: function() {
			//ui.gnb.using("open");
			var _this = this;
			
			this.cateScroll();

			$(document).on("click", ".header .bt.gnb", function() {
				if( $("body").hasClass("is-pop-gnb")) {
					_this.using("close");
				} else {
					_this.using("open");
				}
			});
			
			$(document).on("click", ".gnb-screen , nav.gnb .bt.close", function() {
				_this.using("close");
			});

			$("nav.gnb .cateCont ul li a").each(function(){
				var subCk = $(this).closest("li").find("ul").length;
				if(subCk>0) $(this).addClass("sub");

				if($(this).hasClass("sub")){ 
					$(this).append('<span class="btxt"></span>');
					if($(this).hasClass("open")){
						$(this).find(">.btxt").text("닫기");
						$(this).closest("li").attr("aria-expanded",true);
					}else{
						$(this).find(">.btxt").text("열기");
						$(this).closest("li").attr("aria-expanded",false);
					}
				}
			});

			// 2022-05-20 4,5depth 존재시 첫번째 ul에 적용 =>.first()
			$(document).on("click", "nav.gnb .cateCont ul li a.sub", function() {
				// $(this).toggleClass("open");
				// $(this).closest("li").find("ul").first().slideToggle("fast");
				// $(this).closest("li").siblings("li").find(".sub").removeClass("open");
				// $(this).closest("li").siblings("li").find("ul").slideUp("fast");
				if($(this).hasClass("open")){
					$(this).removeClass("open");
					$(this).closest("li").find("ul").first().slideUp("fast");
					$(this).find(">.btxt").text("열기");
					$(this).closest("li").attr("aria-expanded",false);
					console.log(this);
				}else{
					$("nav.gnb .cateCont ul li a.sub").removeClass("open");
					$("nav.gnb .cateCont ul li a.sub").closest("li").find("ul").slideUp(0);
					$(this).addClass("open");
					$(this).closest("li").find("ul").first().slideDown("fast");
					$(this).find(">.btxt").text("닫기");
					$(this).closest("li").attr("aria-expanded",true);
					console.log(this);
				}
			});
			
			
			var menu = $('.menu-wrap .menu li');

			menu.on('click','a', function(e){
				var target = $(this).parent();
				var idx = target.index();

				var is_fixed = $(this).closest(".menu-wrap");
				var mw_top = $("#gnb .phd .in").innerHeight() + $("#gnb .pct .info").innerHeight() - 48

				if(!$(is_fixed).hasClass("fixed")) {
					$('#gnb .pct').animate({ scrollTop: mw_top},500);
					setTimeout(() => {
						$(".list.other").addClass("fixed");
						$(".menu-wrap").addClass("fixed");
					}, 500);
					// console.log('not_fixed')
				} else {
					if(idx==0 && target.hasClass("active")) {
						$(".list.other").removeClass("fixed");
						$(".menu-wrap").removeClass("fixed");
						$('#gnb .pct').animate({ scrollTop: mw_top},0);
						$('#gnb .pct').animate({ scrollTop: 0},500);
					}
					else if(!target.hasClass("active")) {
						$('.cates').animate({ scrollTop: 1},0)
						// 서브메뉴 리셋
						$("nav.gnb .cateCont ul li a.sub").removeClass("open");
						$("nav.gnb .cateCont ul li a.sub").closest("li").find("ul").slideUp(0);
					}
					// console.log('fixed');
				}
				// return false;
			});
			
		},
		cateScroll:function(){
			$("#gnb:not(.abt) .pct").on("scroll",function(){
				var scrTop = $(this).scrollTop();
				var baseH = $("#gnb .phd .in").innerHeight() + $("#gnb .pct .info").innerHeight() - 48;
				if (scrTop > baseH) {
					$(".menu-wrap").addClass("fixed");
					$(".list.other").addClass("fixed");
				}
			});

			$('#gnb:not(.abt) .cates').on("scroll",function(){
				var catesTop = $('.cates').scrollTop(); 
				if(catesTop === 0) {
					$(".menu-wrap").removeClass("fixed");
					$(".list.other").removeClass("fixed");
				}
			});

		},
		using: function(opt) {
			if( opt === "open") {
				ui.popup.open('gnb',{
					"direct":"right",
					ocb:function(){
						ui.update();
					},
					ccb:function(){
						$(".header .bt.gnb").focus();
					}
				});
			}
			if( opt === "close") {
				ui.popup.close('gnb');
			}
		}
	},
	ly:{ // 레이아웃
		init:function(){
			var _this = this;
			this.floating.init();
			this.botnav.init();
			this.height();
			this.set();
			$(window).on("load resize",function(){
				_this.height();
				_this.set();
			});
		},
		evt:function(){

		},
		height:function(){
			var $container = $(".wrap .container:visible");
			var winH = ui.viewport.height();
			var menebarH = $(".wrap .menubar>.inr:visible").outerHeight() || 0;
			var headH = $(".wrap .header>.inr:visible").outerHeight() || 0;
			var pageH = $(".wrap .pagehead:not(.hauto)>.inr:visible").outerHeight() || 0;
			var floatbtH = $(".wrap .container .floatbots>.inr:visible").outerHeight() || 0;
			var footH = $(".wrap .footer>.inr:visible").outerHeight() || 0;
			//console.log(winH , headH , footH );
			var contPad =  parseInt ( $container.css("padding-bottom") )  + parseInt ( $container.css("padding-top") );
			$container.css("height", "100%" );
			$container.find(".contents.h100p").css("height", parseInt( winH - headH - footH - menebarH - pageH - floatbtH - contPad ) );
		},
		set:function(){
			if( $("#container:visible").length ){
				var cls = $("#container:visible").attr("class").replace(/container|page/g,"");
				$("body").addClass(cls);
			}
			var menubar = $(".wrap nav.menubar:visible").length;
			var header  = $(".wrap .header>.inr:visible").length;
			var floatbt = $(".wrap .container .floatbots>.inr:visible").length;
			var floatbtHT = $(".wrap .container .floatbots>.inr:visible").outerHeight();
			var floatbno_hide = $(".wrap .container .floatbots.no-hide").length;
			var footer  = $(".wrap .footer:visible").length;



			if( menubar ){
				$("body").addClass("is-menubar");
			}else{
				$("body").removeClass("is-menubar");
			}
			if( header ){
				$("body").addClass("is-header");
			}else{
				$("body").removeClass("is-header");
			}
			if( floatbno_hide ){
				$("body").addClass("no-hide-floatbots");
			}else{
				$("body").removeClass("no-hide-floatbots");
			}
			if( floatbt ){
				// console.log(floatbtHT);
				$("body").addClass("is-floatbots");
				$("#wrap.wrap").css("padding-bottom","calc("+(floatbtHT)+"rem + env(safe-area-inset-bottom))");
				$("body:not(.main) #wrap.wrap").css("padding-bottom","calc("+(floatbtHT*2)+"rem + env(safe-area-inset-bottom))"); // //2022-05-26 메인예외 하단 여백 추가
			}else{
				$("body").removeClass("is-floatbots");
				$("#wrap.wrap").css("padding-bottom","");
			}
			if( footer ){
				$("body").addClass("is-footer");
			}else{
				$("body").removeClass("is-footer");
			}
		},
		floating:{ // 우하단 고정되있는 버튼들
			init:function(){
				this.evt();
				// this.ptreg.init();
			},
			evt:function(){
				var _this = this;
				$(document).on("click", ".floatnav .bt.top",  function(){
					_this.gotop();
				});

				$(document).on("click", ".floatnav .bt.qmenu",  function(){
					_this.openMenu();
				});

				$(window).on("scroll load", function(e){
					if( $("html").is(".is-lock") ) {
						e.preventDefault();
						return false;
					}
					_this.istop();
				});
			},
			gotop:function(){  // 탑버튼 누르면  페이지 위로 스르륵
				var els = $(this);
				if (els.hasClass("disabled")) return false;
				$("body,html").animate({ scrollTop: 0 }, 200, function() {
					els.removeClass("disabled");
					$("body").attr("tabindex","-1").focus();
				});
				els.addClass("disabled");
			},
			istop:function(){  // 스크롤 내릴때 탑버튼 보였다 안보였다
				var scr = ui.viewport.scrollTop();
				if (scr >= 50) {
					$(".floatnav").addClass("is-top");
				} else {
					$(".floatnav").removeClass("is-top");
				}
				if( ui.isUA("NAVER") || ui.isUA("Whale") || ui.isUA("DaumApps")) {
					$(".floatnav").removeClass("is-top");
				}
			},
			openMenu:function(){  // 퀵메뉴
				if($(".quicknav").hasClass("open")){
					$(".floatnav .bt.top").css("visibility","visible");
					$(".quicknav").removeClass("open");
					$(".quicknav .bt.qmenu").removeClass("close2");
					$("body,html").removeClass("is-lock");
				}
				else {
					$(".floatnav .bt.top").css("visibility","hidden");
					$(".quicknav").addClass("open");
					$(".quicknav .bt.qmenu").addClass("close2");
					$("body,html").addClass("is-lock");
				}
			}
		},
		botnav:{  // 하단 메뉴
			show:function(){
				// $("body").removeClass("is-menubar-hide");
				$("body.is-floatbots").removeClass("is-floatbots-hide");

				$(".floatnav").removeClass("hide");
			},
			hide:function(){
				// $("body").addClass("is-menubar-hide");
				$("body.is-floatbots").addClass("is-floatbots-hide");

				$(".floatnav").addClass("hide");
			},
			init:function(){

				$.fn.scrollStopped = function(callback) { // 스크롤 스톱 scroll stop event
					$(this).scroll(function(){
						var self = this, $this = $(self);
						if( $this.data('scrollTimeout') ){
							clearTimeout($this.data('scrollTimeout'));
						}
						$this.data('scrollTimeout', setTimeout(callback,250,self));
					});
				};
				var _this = this;
				var prevPosition = 0;
				var dnVar = 0;
				var upVar = 0;
				var scrStopEvent = null;

				$(window).on("load pageshow scroll", function(e){  // 스크롤 내리는 중 OR 올리는중
					if( $("html").is(".is-lock-end") ) {
						e.preventDefault();
						return false;
					}
					var gap = 3;
					var initPosition = ui.viewport.scrollTop();
					// console.log(initPosition , prevPosition);
					// console.log(dnVar - upVar);
					if( initPosition > prevPosition ){
						dnVar ++ ;
						// console.log("dn" , dnVar);
						//스크롤다운중;
						upVar = 0;
						$("body").addClass("is-scroll-down").removeClass("is-scroll-up");
						// console.log(dnVar,upVar , upVar-dnVar);
						if( upVar-dnVar < -gap ) {
							$("body.is-floatbots").addClass("is-floatbots-hide");
							_this.hide();
						}
						$(window).scrollStopped(function(){
							// console.log("scroll 스톱");
							clearTimeout(scrStopEvent);
							scrStopEvent = window.setTimeout(function(){
								// console.log("2초 있다 다시 나타나라고?");
								_this.show();
								clearTimeout(scrStopEvent);
							},2000);
						});
					}else {
						upVar ++ ;
						// console.log("up" , upVar);
						//스크롤 업중;
						$("body").addClass("is-scroll-up").removeClass("is-scroll-down");
						dnVar = 0;
						if ( dnVar-upVar < 0 ) {

							_this.show();
						}
					}
					prevPosition = initPosition ;

					if( $("html").is(".is-lock") ) {
						return false;
					}
					var docH = ui.viewport.docHeight();
					var scr = ui.viewport.scrollTop() + ui.viewport.height() ;
					// console.log(docH,scr);
					if(docH <= scr +gap ){
						// console.log("바닥");

						_this.show();
					}else{
						// _this.hide();
					}
					if (ui.viewport.scrollTop() > 1) {
						$("body").addClass("is-head-shadow");
					}else{
						$("body").removeClass("is-head-shadow");
					}
				});


			}
		}
	},
	steps:{  // UI-CRPMGNL4191AS.html
		init:function(){
			this.set();
		},
		set:function(){
			$(".ut-steps.d").each(function(){
				var $this = $(this);
				var $box = $(this).find(".box");
				var $bar = $this.find(".bar");
				var tot = $this.find(".tot .b").text();
				var num = $this.find(".num .b").text();
				// var rest = tot - num ;
				var rest = num / tot * 100 ;
				// console.log(num, tot ,rest);

				if( parseInt(tot) <= 2 ){  //  전체 스텝이 2단계 이하일때 프로그래스 숨김처리;
					$(this).closest(".ut-steps").hide();
					$(this).closest(".ut-topfix").addClass("none");
				}else{  //  전체 스텝이 3단계 부터 타이틀만 숨김
					$(this).closest(".ut-steps").find(".tit").addClass("blind");
				}

				$bar.css({"width":rest+"%"});
				$box.attr({"role":"img","aria-label":"총 "+tot+"단계 중 현재 "+num+"단계"});
			});
		}
	},
	tbsld :{  // 모바일에서 안쓰는거 지워야지
		init:function(){

		},
		evt:function(){

		},
		set:function(id){
			var _this = this;
			_this.slide.using(id);

			// 2022-06-10 슬라이드에 사용되는 툴팁에 aria-labelledby 추가
			function ui_tooltip_label() {
				let opt_tabsld = document.querySelector('.ut-tabsld'); //#tabsld_calc
				let opt_tooltip = opt_tabsld.querySelectorAll('.ut-tooltip');
				let opt_num = 0;
				opt_tooltip.forEach(function(item) {
					let opt_btn = item.querySelector('.bt-tooltip');
					opt_num++;
					opt_btn.setAttribute( 'aria-labelledby', 'tbstip-0' + opt_num );
				});
			}
			ui_tooltip_label();
		},
		slide:{
			// els: ".ut-slide-dot .swiper-container",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				spaceBetween:20,
				autoHeight:true,
				loop: false,
			},
			using: function(id) {
				var _this = this;
				_this[id] = new Swiper( "#"+id+" .swiper-container", this.opt);

				// 2022-06-10 슬라이드 체인지 툴팁 닫기
				_this[id].on('slideChange', function () {
					let ut_tooltip = document.querySelectorAll('.ut-tooltip');
					ut_tooltip.forEach(function(item) {
						item.classList.remove('open')
					});
					console.log(ut_tooltip);
				});
			}
		},
	},
	topfix:{ // 스크롤시 상단고정할것
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(window).on("load scroll resize",function(e){
				_this.set();
			});
			$(".pop-layer .pct").on("load scroll resize",function(e){
				_this.pop();
			});
		},
		set:function(){
			var headHt = $(".header>.inr:visible").height() || 0;
			var wsc = ui.viewport.scrollTop();
			var fixedbox = $(".ut-topfix");
			var fixedHt = $(".ut-topfix>.inr").outerHeight();
			var fixedTop;
			if( typeof fixedbox.offset() != "undefined" ){
				fixedTop = fixedbox.offset().top;
				fixedbox.css("min-height",fixedHt);
			}
			// 2022-06-21 step fixed 되는 경우 있어서 주석처리
			// else if( Math.ceil(fixedTop - headHt) < wsc ){ //2022-05-26 320 해상도에서 소수점 차이로 fixed가 들어가는 문제 수정 
			// 	fixedbox.addClass("fixed");
			// 	fixedbox.find(">.inr").css("top",headHt); 
			// }
			else{
				fixedbox.removeClass("fixed");
				fixedbox.find(">.inr").css("top","");
			}
			// console.log(headHt , fixedTop , wsc );
		},
		pop:function(){
			var headHt = $(".pop-layer .phd>.in:visible").height() || 0;
			var wsc = $(".pop-layer .pct").scrollTop();
			var fixedbox = $(".pop-layer .pct .ut-topfix");
			var fixedHt = $(".pop-layer .pct .ut-topfix>.inr").outerHeight();
			var fixedTop;
			if( typeof fixedbox.offset() != "undefined" ){
				fixedTop = fixedbox.offset().top;
				fixedbox.css("min-height",fixedHt);
			}
			if( fixedTop - headHt < wsc ) {
				fixedbox.addClass("fixed");
				fixedbox.find(">.inr").css("top",headHt);
			}else{
				fixedbox.removeClass("fixed");
				fixedbox.find(">.inr").css("top","");
			}
			// console.log(headHt , fixedTop , wsc );
		}
	},
	gnbtopfix:{ // 스크롤시 상단고정할것
		init:function(){
			//this.evt();
			//this.set();
		},
		evt:function(){
			var _this = this;
			$("nav.gnb .pct").on("load scroll resize",function(e){
				_this.set();
			});

			// $("nav.gnb .menu").on("click scroll resize",function(e){
			// 	console.log("evt");
			// });
		},
		set:function(){
			var headHt = $("nav.gnb .phd>.in:visible").height() || 0;
			var wsc = $("nav.gnb .menu").scrollTop();
			var fixedbox = $("nav.gnb .menu");
			var fixedHt = $("nav.gnb .menu").outerHeight();
			var fixedTop;
			if( typeof fixedbox.offset() != "undefined" ){
				 fixedTop = fixedbox.offset().top;
				// fixedbox.css("min-height",fixedHt);
				console.log("undefined");
			}
			if( fixedTop - headHt < wsc ) {
				fixedbox.addClass("fixed");
				//fixedbox.css("top",headHt);
				$("nav.gnb .pct").css("height","2000");
				//fixedbox.find(".sm").css({"height":"100%","overflow-y":"auto"});
				console.log("1");
			}else{
				// fixedbox.removeClass("fixed");
				// fixedbox.find(">.list").css("top","");

				console.log("2");
			}
			// console.log(headHt , fixedTop , wsc );
		}
	},
	fsize:{ // 폰트크기 조절 UI
		init:function(){
			this.evt();
			this.set();
			// this.size();
		},
		evt:function(){
			var _this = this;
			$(document).on("click","[data-ui-fsize='btn']",function(e){
				var $myui = $(this);
				if( $myui.is(".open") ) {
					_this.close($myui);
				}else{
					_this.open($myui);
					_this.pos(this);
				}
			})
			.on("click", function(e) {
				// console.log(e.target , !$(e.target).is("[data-ui-fsize='btn']") );
				if( !$(e.target).is("[data-ui-fsize='btn'] , [data-ui-fsize='pop'] ") ) {
					$("[data-ui-fsize='btn']").removeClass("open");
					$("[data-ui-fsize='pop']").remove();
				}
			});



		},
		set:function(){
			// $("[data-ui-fsize='btn'] ").attr("aria-expanded",false);
			// $("[data-ui-fsize='btn'].open").attr("aria-expanded",true);
			// console.log(localStorage.fontSize);
			if( localStorage.fontSize == undefined ){
				$("[data-ui-fsize='ctn']").attr("data-font-size","md");
				$("[data-ui-fsize='pop'] .fslt>li.md").addClass("active");
			}
			$("[data-ui-fsize='ctn']").attr("data-font-size",localStorage.fontSize);
		},

		size:function(els){
			var $myui = $(els).closest("[data-ui-fsize='btn']");
			var num = $(els).val();
			localStorage.fontSize = num;
			if( localStorage.fontSize == 'undefined' ) {
				// localStorage.fontSize = 14;
			}else{

			}
			//console.log(num);
			this.close($myui);
		},
		open:function(els){
			var _this = this;
			$(".pop-layer.a:visible .pct").on("scroll.pop",function(){
				$(this).find("[data-ui-fsize='btn'].open").each(function(){
					_this.pos(this);
				});
			});
			$(window).on("scroll.body",function(){
				$(".container .contents [data-ui-fsize='btn'].open").each(function(){
					_this.pos(this);
				});
			});
			var $myui = $(els);
			var fpop =
			'<div data-ui-fsize="pop" tabindex="-1">'+
			'	<ul class="fslt">'+
			'		<li class="sm"><button type="button" value="sm" onclick="ui.fsize.size(this);" class="bt"><i class="blind">글자크기</i><p class="t">작게</p></button></li>'+
			'		<li class="md"><button type="button" value="md" onclick="ui.fsize.size(this);" class="bt"><i class="blind">글자크기</i><p class="t">보통</p></button></li>'+
			'		<li class="lg"><button type="button" value="lg" onclick="ui.fsize.size(this);" class="bt"><i class="blind">글자크기</i><p class="t">크게</p></button></li>'+
			'		<li class="xl"><button type="button" value="xl" onclick="ui.fsize.size(this);" class="bt"><i class="blind">글자크기</i><p class="t">아주크게</p></button></li>'+
			'		<li class="mx"><button type="button" value="mx" onclick="ui.fsize.size(this);" class="bt"><i class="blind">글자크기</i><p class="t">최대</p></button></li>'+
			'	</ul>'+
			'</div>';
			// console.log(localStorage.fontSize);
			$myui.addClass("open");
			if( !$('[data-ui-fsize="pop"]:visible').length ){
				$myui.closest(".contents , .poptents").append(fpop);
			}
			var fsize = localStorage.fontSize || 15;
			$("[data-ui-fsize='pop'] button[value='"+fsize+"']").closest("li").addClass("active").siblings("li").removeClass("active");
			ui.keytab.set( $('[data-ui-fsize="pop"]') );
			$('[data-ui-fsize="pop"]').focus();
			this.set();
		},
		close:function(els){
			var $myui = els;
			$('[data-ui-fsize="btn"]').focus();
			$myui.removeClass("open");
			$('[data-ui-fsize="pop"]').remove();
			this.set();
		},
		pos:function(els){

			// 메뉴 포지션
			// console.log(els);
			var isPop = $(els).closest(".poptents").length;
			var $pop =   $(els).closest(".pop-layer:visible");
			var elsHt = $(els).outerHeight() + 10;
			var ctnHt = $("[data-ui-fsize='pop']:visible").outerHeight() ;
			var ltp = $(els).offset().top;
			var cht = $pop.find(".pbd").outerHeight()*0.5 || ui.viewport.height()*0.5 ;
			var sct = $pop.find(".pct").scrollTop() || ui.viewport.scrollTop() ;


			var t =  $(els).offset().top + elsHt  - ui.viewport.scrollTop();
			var l = - $(els).offset().left + 20;
			// console.log(l,t , elsHt);

			if( isPop )  ltp = ltp + sct ;
			// console.log(ltp , sct ,cht , ltp - sct );
			if( cht > ltp - sct + 30 ) {

				$(els).closest("[data-ui-fsize='btn']").removeClass("bot"); // console.log("상");
			}else{
				$(els).closest("[data-ui-fsize='btn']").addClass("bot"); // console.log("하");

				t = t - ctnHt - elsHt - 10;
			}
			$("[data-ui-fsize='pop']").css({"top":t});
		}
	},
	tooltip:{ // 툴팁레이어
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click",".ut-tooltip .bt-tooltip:not([aria-labelledby])",function(e){
				var $myui = $(this).closest(".ut-tooltip");
				if( $myui.is(".open") ) {
					_this.close($myui);
				}else{
					_this.open($myui);
					_this.pos(this);
				}
			}).on("click",".ut-tooltip .tpclose",function(e){
				var $myui = $(this).closest(".ut-tooltip");
				_this.close($myui);

			})
			.on("click", function(e) {
				if(!$(e.target).closest(".ut-tooltip").length ) {
					$(".ut-tooltip").removeClass("open");
				}
			});

			$(window).on("scroll",function(){
				$(".ut-tooltip.open .bt-tooltip").each(function(){
					_this.pos(this);
				});
			});
			$(".pop-layer.a:visible .pct").on("scroll",function(){
				$(".ut-tooltip.open .bt-tooltip").each(function(){
					_this.pos(this);
				});
			});
		},
		set:function(){
			$(".ut-tooltip .bt-tooltip:not([aria-labelledby])").attr("aria-expanded",false);
			$(".ut-tooltip.open .bt-tooltip:not([aria-labelledby])").attr("aria-expanded",true);
		},
		open:function(els){
			var $myui = els;
			$(".ut-tooltip").removeClass("open");
			$myui.addClass("open").find(".bt-tooltip");
			!$myui.find(".tpclose").length && $myui.find(">.toolctn").append('<button type="button" class="tpclose">도움말닫기</button>');
			this.set();
			ui.keytab.set(  $myui.find(".toolctn")    );
			$myui.find(".toolctn").attr("tabindex","-1").focus();
		},
		close:function(els){
			var $myui = els;
			$myui.removeClass("open").find(".bt-tooltip").focus();
			this.set();
		},
		pos:function(els){

			// 메뉴 포지션
			// console.log(els);
			var isPop = $(els).closest(".poptents").length;
			var $pop =   $(els).closest(".pop-layer:visible");
			var elsHt = $(els).outerHeight() + 10;
			var ctnHt = $(els).closest(".ut-tooltip").find(".toolctn").outerHeight() ;
			var ltp = $(els).offset().top;
			var cht = $pop.find(".pbd").outerHeight()*0.5 || ui.viewport.height()*0.5 ;
			var sct = $pop.find(".pct").scrollTop() || ui.viewport.scrollTop() ;


			var t =  $(els).offset().top + elsHt  - ui.viewport.scrollTop();
			var l = - $(els).offset().left + 20;
			// console.log(l,t , elsHt);

			// 2022-04-13 계산기팝업(슬라이드안에 툴팁이 있을 경우)
			var isCalcSlide = $(els).closest("#tabsld_calc").length;//.ut-tabsld
			var sectH = $(els).closest("section").outerHeight();//.sect.prds
			var incSlideIndex = $(els).closest(".swiper-slide").index();
			var hideSlide = $(els).closest("#tabsld_calc").find(".swiper-wrapper li.hide").length;
			if(hideSlide) incSlideIndex = incSlideIndex -1;
			
			var baseLeft="";
			if(isCalcSlide) {
				//baseLeft = "0";
				// baseLeft = incSlideIndex * ($(window).width() - 20); //2022-05-18 주석/05-23원복
				// t =  $(els).offset().top + ctnHt - sectH;
				// $(els).closest(".swiper-container").css("overflow","visible");
				
				//2022-06-09 슬라이드 툴팁 가운데 정렬 (현재 aria-labelledby 추가 / 사용 안함)
				// t =  "50%";
				// baseLeft = "50%";
				// $(els).closest(".ut-tooltip").find(".toolctn").css({"transform":"translate(-50%, -50%)"});
			}
			else baseLeft = "20rem";

			//if( isPop )  ltp = ltp + sct ; // 2022-04-27 주석, 바닥페이지 스크롤 하단에서 팝업을 열경우 팝업내 툴팁위치 오류
			//console.log(ltp , sct ,cht , ltp - sct );
			if( cht > ltp - sct + 30 ) {
				$(els).closest(".ut-tooltip").removeClass("bot");
				//console.log("상");
			}else{
				$(els).closest(".ut-tooltip").addClass("bot");
				//console.log("하");

				t = t - ctnHt - elsHt - 10;
			}
			$(els).closest(".ut-tooltip").find(".toolctn").css({"left":baseLeft,"top":t});
		}
	},
	toolpop:{ // 툴팁레이어 팝업
		init:function(){
			this.evt();
		},
		evt:function(){
			var _this = this;
			$(document).on("click",".bt-tooltip[aria-labelledby]",function(e){
				var id = $(this).attr("aria-labelledby");
				_this.html = $(this).next(".toolctn").html();
				$(this).next(".toolctn").attr("aria-hidden",true);
				_this.open(id);

			});
		},
		open:function(id){
			var _this = this;
			// console.log(this.html);
			$(".ut-tooltip").removeClass("open");
			var pop =   '<article class="pop-layer b pop-tooltip ut-tooltip" id="'+id+'">'+
						'	<div class="pbd">'+
						'		<div class="phd blind">'+
						'			<div class="in">'+
						'				<h1 class="ptit blind">도움말</h1>'+
						'			</div>'+
						'		</div>'+
						'		<div class="pct">'+
						'			<main class="poptents"><div class="toolctn">'+this.html+'</div></main>'+
						'		</div>'+
						'		<button type="button" class="btn-pop-close"><i class="blind">닫기</i></button>'+
						'	</div>'+
						'</article>';


			$("body").append(pop);
			ui.popup.open(id,{
				"direct":"none",
				ccb:function(){
					$(".bt-tooltip[aria-labelledby='"+id+"']").focus();
					$(".pop-tooltip").remove();
				}
			});
		}
	},
	balloon:{ // 말풍선
		init:function(){
			this.set();
			this.evt();
		},
		evt:function(){
			$(document).on("click",".ut-balloon .close",function(e){
				$(this).closest(".ball").addClass("hide");
			});
		},
		set:function(){
			$("[data-ui-balloon]").each(function(){
				var $ball = $(this);

				$ball.find(".msg").length ? msg = $ball.find(".msg").html() : msg = $ball.html();
				var opt = $ball.attr("data-ui-balloon");
				var cls = opt.replace(","," ");
				// console.log(opt,msg,cls);
				$ball.addClass(cls);
				var box =
					'<div class="ball">'+
					'	<span class="msg">'+msg+'</span>'+
					'	<button type="button" class="close">말풍선닫기</button>'+
					'</div>';

				$ball.addClass("ut-balloon").html(box);
			});
		}
	},
	range:{
		init:function(){
			this.set();
		},
		set:function(){
			$(".ut-barslide.a").each(function(){
				var $this  = $(this);
				!$this.find(".ui-slider-handle").length && $this.find(".barslide").append('<div class="ui-slider-handle"><span class="hantxt"></span></div><em class="bar"></em>');
				var hantxt = $this.find(".hantxt");
				var bardis = $this.find("em.bar");
				var amt    = $this.find("input.amt");
				var step   = parseInt( $this.find("input.step").val() );
				var val    = parseInt( $this.find("input.amt").val() );
				var min    = parseInt( $this.find("input.min").val() );
				var max    = parseInt( $this.find("input.max").val() );
				setHandle(val,min,max);
				function setHandle(val,min,max){
					var wid = (val-min) / (max-min) * 100;
					// console.log(val);
					bardis.css("width", wid  + "%");
					hantxt.html( ui.commas.add(val) + '<i class="w">원</i>');
					amt.val(val);
				}
				$this.find(".barslide").slider({
					value: val,
					min: min,
					max: max,
					step: step,
					create:function( event, ui ){
						setHandle(val,min,max);
					},
					slide:function( event, ui ){
						var val = ui.value;
						setHandle(val,min,max);
					},
					stop: function( event, ui ){
						var val = ui.value;
						amt.trigger("change");
					}
				});
			});

			$(".ut-barslide.b").each(function(){
				var $this  = $(this);
				!$this.find(".barslide .hantxt").length && $this.find(".barslide").html('<span class="hantxt"></span>');
				var hantxt = $this.find(".hantxt");
				var amt0   = $this.find("input.amt0");
				var amt1   = $this.find("input.amt1");
				var step   = parseInt( $this.find("input.step").val() );
				var val0   = parseInt( $this.find("input.amt0").val() );
				var val1   = parseInt( $this.find("input.amt1").val() );
				var min    = parseInt( $this.find("input.min").val() );
				var max    = parseInt( $this.find("input.max").val() );
				setHandle(val0,val1,min,max);
				function setHandle(val0,val1,min,max){
					hantxt.html( ui.commas.add(val0) + '<i class="w">원</i> ~ '+ ui.commas.add(val1) + '<i class="w">원</i>'  );
					// console.log(val0,val1);
					amt0.val(val0);
					amt1.val(val1);
				}
				$this.find(".barslide").slider({
					range: true,
					min: min,
					max: max,
					values: [ val0, val1 ],
					step: step,
					create:function( event, ui ){
						setHandle(val0,val1,min,max);
					},
					slide: function( event, ui ) {
						var val0 = ui.values[0];
						var val1 = ui.values[1];
						setHandle(val0,val1,min,max);
					},
					stop: function( event, ui ){
						var val0 = ui.values[0];
						var val1 = ui.values[1];
						amt0.trigger("change");
						amt1.trigger("change");
					}
				});

			});

		}
	},
	commas:{
		add:function(str){
			return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		del:function(str){
			return parseInt(str.replace(/,/g , ''));
		}
	},
	form:{  //  폼요소
		init:function(){
			this.select.init();
			this.checked.init();
			this.input.init();
			this.intdel.init();
			this.wintdel.init();
			this.email.init();
			this.commas.init();
			this.chktog.init();
			this.attach.init();
		},
		set:function(){
			this.select.set();
			this.checked.set();
			this.input.set();
			this.intdel.set();
			this.wintdel.set();
			this.email.set();
			this.commas.set();
			this.chktog.set();
			this.attach.set();
		},
		checked:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("change","label.radio>input, label.checkbox>input",function(e){
					_this.set();
				});
			},
			set:function(){
				$("label.radio,label.checkbox").each(function(){
					var $rdochk = $(this);
					$rdochk.find(">input").attr("aria-hidden","true");

					if( $rdochk.is(".radio") ){  // 라디오
						$rdochk.attr("role","radio");

						if ($rdochk.find(">input").is(":checked") == true ) {
							$rdochk.attr("aria-checked",true);
						}else{
							$rdochk.attr("aria-checked",false);
						}
					}
					if( $rdochk.is(".checkbox") ){ // 체크박스
						$rdochk.attr("role","checkbox");
						if(	$rdochk.find(">input").is(":checked") ){
							$rdochk.attr("aria-checked",true);
						}else{
							$rdochk.attr("aria-checked",false);
						}
					}
				});
			},
		},
		select:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;

				$(document).on("click",".select .btsel",function(){
					if( $(this).closest(".select").is(".open") ){
						_this.close(this);
					}else{
						_this.open(this);
					}
				});
				$(document).on("click",".select>.slist>li button",function(e){
					_this.close(this);
				});
				$(document).on({
					"focus":function(){
						$(this).closest(".select").addClass("focus");
					},
					"blur":function(){
						$(this).closest(".select").removeClass("focus");
					}
				},".select .btsel , .select.def select");
				$(document).on("click", function(e) {
					if(!$(e.target).closest(".select").length ) {
						$(".select").removeClass("open");
					}
				});
			},
			set:function(){
				$(".select").each(function(){

					if( $(this).find(">.lb:not(.blind)").length ) {
						$(this).removeClass("no-lb");
					}else{
						$(this).addClass("no-lb");
					}

					if( $(this).is(".def") ) {return;}

					if( !$(this).find(".btsel").length ) {
						$(this).find(">select").before('<button class="btsel" type="button" title="선택하기"></button>');
					}
					if( !$(this).is(".set").length ) {
						$(this).addClass("set");
					}
					var $btSel = $(this).find(".btsel");
					var tit = $(this).find(">.lb").text() || $(this).find("select").attr("title") || "옵션선택";
					var sel = $(this).find("select").val();
					var txt = $(this).find("select option:selected").text() ;
					var dis = $(this).find("select").prop("disabled");
					// console.log(list ,sel ,txt ,dis);

					$(this).find("select").attr("tabindex","-1").attr({"aria-hidden":true});

					$btSel.text(txt).attr("aria-expanded",false).attr("title",tit);
					if( dis == true ) {
						$(this).addClass("disabled");
						$btSel.prop("disabled",true);
					}else{
						$(this).removeClass("disabled");
						$btSel.prop("disabled",false);
					}
				});
			},
			open:function(els){
				// console.log(els);
				var btnWidth = $(els).outerWidth();
				// console.log( btnWidth );
				$(".select").find(".slist").remove();
				var list = [];
				$(els).closest(".select").find("select option").each(function(){
					list.push( { v:$(this).val() ,t:$(this).text() } );
				});
				$(els).attr("aria-expanded",true);

				var blist="";
				for(var i in list) {
					blist += '<li><button type="button" class="bt" value="'+list[i].v+'">'+list[i].t+'<i class="blind">선택하기</i></button></li>';
				}
				var sel = $(els).closest(".select").find("select").val();

				var spop = '<ul class="slist">'+blist+'</ul>';
				$(els).closest(".select").append(spop);
				$(els).closest(".select").find(".slist").css("min-width",btnWidth-4);
				$(els).closest(".select").find(".slist button[value='"+sel+"']").attr("title","선택됨").closest("li").addClass("active").siblings("li").removeClass("active");

				$(".select").removeClass("open");
				$(els).closest(".select").addClass("open").find(".slist li.active .bt");
				ui.keytab.set( $(els).closest(".select").find(".slist") );

				this.pos(els);
			},
			close:function(els){
				var sel = $(els).attr("value");
				var txt = $(els).html();
				$(els).closest(".select").find(".btsel").attr("aria-expanded",false);
				$(els).closest(".select").removeClass("open");
				$(els).closest(".select").find("select>option[value='"+sel+"']").prop("selected",true);
				$(els).closest(".select").find("select").val(sel).prop("selected",true);
				$(els).closest(".select").find(".btsel").html(txt).find(".blind").remove() ;
				$(els).closest(".select").find("select").trigger("change");
				$(els).closest(".select").find(".btsel").attr("tabindex","0").focus();
				$(els).closest(".select").find(".slist").remove();
			},
			pos:function(els){
				// 메뉴 포지션

				// 2022-06-21 윈도우 확대 축소에 따른 포지션 수정 (상대좌표로 수정)
				let isPop = $(els).closest(".pct").length;

				// 팝업이 아닐때
				if( !isPop ) {
					let ltp = $(els).offset().top;
					let cht = $(".pop-layer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
					let sct = $(".pop-layer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
					// console.log(ltp , sct ,cht , ltp - sct );
					if( cht > ltp - sct + 30 ) {
						$(els).closest(".select").removeClass("bot"); // console.log("상");
					} else {
						$(els).closest(".select").addClass("bot"); // console.log("하");
					}
				}

				// 팝업일때
				if( isPop ) {
					let ltp = $(els).offset().top - $(els).closest(".pct").offset().top;
					let cht = $(".pop-layer:visible .pct").height();
					let comp = cht - ltp;
					let lim = cht / 3;
					// 스크롤 크기
					let sltE = $(els).closest(".select").find(".slist");
					let sltH = sltE.height();
					if( comp < lim ) {
						$(els).closest(".select").addClass("bot");
					} else if( cht < sltH ) { // 팝업크기가 스크롤 보다 작을때
						// console.log('sH:' + sltH);
						sltE.css({"max-height": cht / 2 });
				  } else {
						$(els).closest(".select").removeClass("bot");
					}
					// console.log('size:'+ cht);
					// console.log('ltp:' + ltp);
					// console.log('comp:' + comp);
					// console.log('lim:' + lim);
				}

			}
		},
		input:{
			init:function(){
				this.evt();
				this.set();
			},
			comsChk:function(els){ // 입력필드에 값이 있는지 첵크
				$(els).find("input , textarea").each(function(){
					var val = $(this).val();
					if( val == "" ){
						val = false;
						$(this).closest(".input , .textarea").removeClass("coms");
					}else{
						val = true;
						$(this).closest(".input , .textarea").addClass("coms");
						return false;
					}
				});
			},
			set:function(){
				var _this = this;


				$(".input , .textarea").each(function(){
					// var valength = $(this).closest(".input , .textarea").find("input , textarea").val();
					// console.log(valength);
					var $this = $(this).find("input, textarea");
					var els = this;
					//_this.comsChk(els);
					if($(this).hasClass("coms") == false) _this.comsChk(els);//처음부터 coms를 가지고 있으면 placeholder가 보이게 변경
					// var comsStat ;
					// if( $(this).val() == ""  ) {
					// 	comsStat = false;
					// }else{
					// 	comsStat = true;
					// }

					// console.log(comsStat);
					// if( $this.val() == "" ){
					// 	$(this).removeClass("coms");
					// }else{
					// 	$(this).addClass("coms");
					// }


					if( $this.attr("disabled") ){
						// console.log(		$this.val() );
						$(this).addClass("disabled");
					}else{
						// console.log(		$this.val() );
						$(this).removeClass("disabled");
					}
					if( $this.attr("readonly") ){
						// console.log(		$this.val() );
						$(this).addClass("readonly");
					}else{
						// console.log(		$this.val() );
						$(this).removeClass("readonly");
					}
					if( $(this).find(">.lb:not(.blind)").length ) {
						$(this).removeClass("no-lb");
					}else{
						$(this).addClass("no-lb");
					}
					if( $this.is(":focus") ) {
						$(this).addClass("focus");
					}
				});
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".input .lb, .textarea .lb",function(e){
					$(this).closest(".input , .textarea").find("input, textarea").first().focus();
				});
				$(document).on("focus",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").addClass("focus");

					// 2022-04-19 input에 focus가 갈 경우 폼요소 위치 변경
					// 2022-04-26 UI-PPRRPNL6314AS.html 팝업이 안뜬다고 함 // 일단 주석
					// var isBottomPop = $(this).closest(".pop-layer.bottom").length;// bottom type popup input 클릭시 예외 처리
					// var btnCk = $(this).closest(".input").find(":button").length;// 셀렉트같지만 버튼일 경우 예외처리
					// if(!btnCk && !isBottomPop){
					// 	var isTopFixed = $(this).closest(".contents").find(".ut-topfix").length;
					// 	var isPop = $(this).closest(".poptents").length;
					// 	var ipPs = "";
					// 	if(isTopFixed) {
					// 		var topFixedH = $(".ut-topfix .inr").innerHeight();
					// 		var gap = "10";
					// 		ipPs = $(this).offset().top - $(this).innerHeight() - topFixedH - gap;
					// 	}
					// 	else ipPs = $(this).offset().top - $(this).innerHeight();
						
					// 	// 2022-04-21 ios scrollTop 이슈 테스트
					// 	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
					// 		window.scrollTo({top:ipPs, behavior:'smooth'});
					// 	}else{
					// 		if(isPop) {
					// 			var ipPs2 = $('.pct').scrollTop() + $(this).offset().top - 60;
					// 			$('.pct').animate({ scrollTop: ipPs2 },0);
					// 		}
					// 		else $("body,html").animate({ scrollTop: ipPs },0);
					// 	}
					// }
					

				});
				$(document).on("blur",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").removeClass("focus");
					// console.log( $(this).val() );
					var els = $(this).closest(".input , .textarea");
					_this.comsChk(els);
					// if( $(this).val() == "" ){
					// 	$(this).closest(".input , .textarea").removeClass("coms");
					// }else{
					// 	$(this).closest(".input , .textarea").addClass("coms");
					// }
				});
			}
		},
		intdel:{ // .input.del 박스에 글자 삭제
			init:function(){
				this.evt();
				this.set();
			},
			set:function(){
				var _this = this;
				$(this.inpThis).each(function(){
					if ($(this).closest(".input").is(".xset")) {

						$(this).trigger("input");
					}
					_this.xpadd(this);
				});
			},
			inpThis:".input>input",
			inpEls:".input.xdel>input",
			evt:function(){
				var _this = this;
				$(document).on("input focus",this.inpEls,function(e){
					var els = this;
					if( $(els).val() == ""   ) {
						_this.xhide(els);
					}else{
						_this.xshow(els);
					}
				});
				$(document).on("blur",this.inpEls,function(e){
					var els = this;
					setTimeout( function(){
						if( $(this).closest(".input").is(".xset") ){
							console.log("asfd" , els , $(this).closest(".input").is(".xset"));
							_this.xhide(els);

						}
					},300);
				});
				$(document).on("click",".input .btdel",function(e){
					var els = this;
					var myDel = $(this);
					myDel.closest(".input").find("input,textarea").val("").focus().trigger('input');
					_this.xhide(els);
				});
			},
			xpadd:function(els){
				var _this = this;
				//2022-04-28 예외처리
				$(els).closest(".input:not(.ipsch)").find(">input").css({"padding-right":_this.posit(els) });
				$(els).closest(".input:not(.ipsch)").find(".btdel").show().css({ "right":_this.posit(els) });
			},
			xshow:function(els){
				$(this.inpEls).closest(".input:not(.xset)").removeClass("del").find(".btdel").remove();
				var _this = this;
				var myInput = $(els);
				// console.log(myInput.val());
				if( myInput.val() != ""  && myInput.closest(".input").find(".btdel").length == 0  ) {
					myInput.closest(".input").addClass("del").append('<button type="button" class="btdel" tabindex="-1">삭제</button>');
				}

			},
			xhide:function(els){
				var myInput = $(els);
				myInput.closest(".input").removeClass("del").find(".btdel").remove();
				myInput.closest(".input:not(.ui-prcset) input").css({ "padding-right":this.posit(els) });
			},
			posit:function(els){
				var myInput = $(els);

				var rpost = myInput.closest(".input").is(".b") ? 0 : 0 || 0 ;
				var ibts  = myInput.closest(".input").find(".ibts");
				var btpos = ibts.length ? ibts.width()+20+ rpost : "";
				return btpos;
			}
		},
		wintdel:{ // .input.del 박스에 글자 삭제
			init:function(){
				this.evt();
				this.set();
			},
			set:function(){
				var _this = this;
				$(this.winpThis).each(function(){
					if ($(this).closest(".input").is(".wxset")) {

						$(this).trigger("input");
					}
					_this.wxpadd(this);
				});
			},
			winpThis:".input>input",
			winpEls:".input.wxdel>input",
			evt:function(){
				var _this = this;
				$(document).on("input focus",this.winpEls,function(e){
					var els = this;
					if( $(els).val() == ""   ) {
						_this.wxhide(els);
					}else{
						_this.wxshow(els);
					}
				});
				$(document).on("blur",this.winpEls,function(e){
					var els = this;
					setTimeout( function(){
						if( $(this).closest(".input").is(".wxset") ){
							console.log("asfd" , els , $(this).closest(".input").is(".wxset"));
							_this.wxhide(els);

						}
					},300);
				});
				$(document).on("click",".input .wbtdel",function(e){
					var els = this;
					var myDel = $(this);
					myDel.closest(".input").find("input,textarea").val("").focus().trigger('input');
					_this.wxhide(els);
				});
			},
			wxpadd:function(els){
				var _this = this;
				//2022-04-28 예외처리
				$(els).closest(".input:not(.ipsch)").find(">input").css({"padding-right":_this.posit(els) });
				$(els).closest(".input:not(.ipsch)").find(".wbtdel").show().css({ "right":_this.posit(els) });
			},
			wxshow:function(els){
				$(this.inpEls).closest(".input:not(.wxset)").removeClass("wdel").find(".wbtdel").remove();
				var _this = this;
				var myInput = $(els);
				// console.log(myInput.val());
				if( myInput.val() != ""  && myInput.closest(".input").find(".wbtdel").length == 0  ) {
					myInput.closest(".input").addClass("wdel").append('<button type="button" class="wbtdel" tabindex="-1">삭제</button>');
				}

			},
			wxhide:function(els){
				var myInput = $(els);
				myInput.closest(".input").removeClass("wdel").find(".wbtdel").remove();
				myInput.closest(".input:not(.ui-prcset) input").css({ "padding-right":this.posit(els) });
			},
			posit:function(els){
				var myInput = $(els);
				var rpost = myInput.closest(".input").is(".b") ? 0 : 0 || 0 ;
				var ibts  = myInput.closest(".input").find(".ibts");
				var btpos = ibts.length ? ibts.width()+20+ rpost : "";
				return btpos;
			}
		},

		email:{
			init:function(){
				this.evt();
				// this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".ut-email .ebts .bt",function(e){
					_this.set(this);
				});
			},
			set:function(els){
				var domain =  $(els).val();
				// console.log(domain);
				$(els).attr("title","선택됨").closest("li").addClass("active").siblings("li").removeClass("active").find("button").removeAttr("title");
				$(els).closest(".ut-email").find(".emcom>input").val(domain).trigger("focus");
			}
		},
		commas:{ // .input.commas 3자리마다 콤마찍기
			init:function(){
				this.evt();
				this.set();
			},
			els:".input.commas input , .ui-prcset input.amt",
			evt:function(){
				var _this = this;
				$(document).on("input focus",_this.els,function(e){
					_this.set();
				});
			},
			set:function(){
				var _this = this;
				$(_this.els).each(function(){
					var $input = $(this);
					var value = $input.val();
					$input.attr("pattern","\\d*");

					if( value != "" ) {
						value = ui.commas.add( ui.commas.del( $input.val() ) );
						$input.val(value);
					}
					// 순서변경 : 2022-06-03
					if( value == 0 ) {
						$input.val("");
					}
					var org = +ui.commas.del( $input.val() ) || "";
					$input.attr( "data-val" , org ).attr("value",value).data("val",org);
					$input.closest(".input").find(".hideamt").val(  org );
					// console.log( $input.data("val") , $input.val() );
					if( $input.val() == "" ) {
						$input.closest(".input").removeClass("del").find(".btdel").remove();
					}
					// console.log( $input.closest(".input").is(".ui-prcset") );
					if( $input.closest(".input").is(".ui-prcset") ){
						ui.form.prcset.set();
					}
				});
			}
		},
		chktog:{
			init:function(){
				this.evt();
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".checkbox.ct .tog",function(e){
					_this.set(this);
				});
			},
			set:function(els){
				var $chktog = $(els).closest(".checkbox.ct");
					if( $chktog.is(".open") ) {
						$chktog.removeClass("open");
						$(els).text("열기");
					}else{
						$chktog.addClass("open");
						$(els).text("닫기");
					}
			}
		},
		attach:{
			init:function(){
				this.set();
			},
			set:function(){
				$(document).on({
					"focus":function(){
						$(this).closest(".btn-attach").addClass("focus");
					},
					"blur":function(){
						$(this).closest(".btn-attach").removeClass("focus");
					},
				},".btn-attach .file");

				$(document).on("focus",".btn-attach .file",function(e){
				});
				$(document).on("blur",".btn-attach .file",function(e){
				});
			}
		}
	},
	loading:{ // 로딩중..
		show: function (id) {
			if (id) {
				$("#"+id).prepend('<div class="ui-loading is-pg" role="dialog"><b class="blind">로딩중...</b><em></em></div>');
			}else{
				if( $(".ui-loading").length ) return;
				var els = '<div class="ui-loading" role="dialog"><b class="blind">로딩중...</b><em></em></div>';
				$("body").prepend(els).addClass("is-loading");

			}
		},
		hide: function (id) {
			if (id) {
				$("#"+id+" .ui-loading").remove();
			}else{
				$(".ui-loading").remove();
				$("body").removeClass("is-loading");
			}
		}
	},
	accd:{ // 아코디언 UI
		init: function() {
			this.using();
			this.set();
		},
		set:function(){
			$(".ut-accd>li>.cbox").hide();
			$(".ut-accd>li.open>.cbox").show();
			$(".ut-accd>li.expt>.cbox").show();
			$(".ut-accd>li>.hbox .btn-tog").each(function(){
				if( !$(this).find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }

				if( $(this).closest("li").is(".open") ){
					$(this).attr("aria-expanded",true).find(">.btxt").text("닫기");
				}else{
					$(this).attr("aria-expanded",false).find(">.btxt").text("열기");
				}
			});
		},
		all:{
			open:function(id){
				var $accd = $(".ut-accd[data-accd-id='"+id+"']");
				var $btn = $("[data-accd='btn'][data-accd-id='"+id+"']");

				$btn.addClass("open");
				$accd.find("li>.cbox").slideDown(100,function(){
					$accd.addClass("open");
					$accd.find("li").addClass("open");
				});
			},
			close:function(id){
				var $accd = $(".ut-accd[data-accd-id='"+id+"']");
				var $btn = $("[data-accd='btn'][data-accd-id='"+id+"']");

				$btn.removeClass("open");
				$accd.find("li>.cbox").slideUp(100,function(){
					$accd.removeClass("open");
					$accd.find("li").removeClass("open");
				});
			}
		},
		ckaccd:function(id){

			var $accd = $(".ut-accd[data-accd-id='"+id+"']");
			var $btn = $("[data-accd='btn'][data-accd-id='"+id+"']");
			var opNum = $accd.find("li.open").length;

			// console.log(id , opNum);
			if (opNum<=0) {
				$btn.removeClass("open");
			}else{
				$btn.addClass("open");
			}

		},
		using: function() {
			var _this = this;
			$(document).on("click","[data-accd='btn']",function(e){
				var id = $(this).attr("data-accd-id");
				if ($(this).is(".open")) {
					_this.all.close(id);
				}else{
					_this.all.open(id);
				}
			});

			$(document).on("click", ".ut-accd>li:not(.expt)>.hbox .btn-tog", function() {
				var type =  $(this).closest(".ut-accd").attr("data-accd");
				var id =  $(this).closest(".ut-accd").attr("data-accd-id");
				var $li =   $(this).closest("li");
				var $cbox = $li.find(">.cbox");
				// console.log(type);
				if( type == "tog" ){
					if( $cbox.is(":hidden") ){
						ui.lock.using(true);
						$cbox.slideDown(100,function(){
							$li.addClass("open").find(".btn-tog").first().attr("aria-expanded",true).find(">.btxt").text("닫기");
							ui.lock.using(false);
							_this.ckaccd(id);
						});
					}else{
						ui.lock.using(true);
						$cbox.slideUp(100,function(){
							$li.removeClass("open").find(".btn-tog").first().attr("aria-expanded",false).find(">.btxt").text("열기");
							ui.lock.using(false);
							_this.ckaccd(id);
						});
					}
				}
				if( type == "accd" ){
					$(this).closest(".ut-accd").find(">li.open").not("li.expt").find(">.cbox").slideUp(100,function(){
						$(this).closest(".ut-accd").find(">li.open").removeClass("open").find(".btn-tog").first().attr("aria-expanded",false).find(">.btxt").text("열기");
						_this.ckaccd(id);
					});
					if( $cbox.is(":hidden") ){
						ui.lock.using(true);
						$cbox.slideDown(100,function(){
							$li.addClass("open").find(".btn-tog").first().attr("aria-expanded",true).find(">.btxt").text("닫기");
							ui.lock.using(false);
							_this.ckaccd(id);
						});
					}
				}
			});
		}
	},
	togs:{ // 토글클래스  UI
		init: function() {
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click","[data-tog-cls='btn']",function(e){
				var val  = $(this).attr("data-tog-val") || "open";
				var $btn = $(this);
				var $box = $(this).closest("[data-tog-cls='box']");
				var $ctn = $box.find("[data-tog-cls='ctn']").first();
				var isPop = $(this).closest(".poptents").length;
				if( $box.is("."+val) ) {
					$ctn.slideUp(100,function(){
						$box.removeClass(val);
						$btn.removeClass(val).attr("aria-expanded",false).find(".btxt").text("열기");
						$ctn.removeClass(val);
					});
				}else{
					$ctn.slideDown(100,function(){
						$box.addClass(val);
						$btn.addClass(val).attr("aria-expanded",true).find(".btxt").text("닫기");
						$ctn.addClass(val);
						//2022-04-19 가이드박스 열릴때, scroll이 화면 맨 하단으로
						// if($box.hasClass('ut-gudbox')){
						// 	if(isPop) $('.pct').css('overflow-y','auto').scrollTop($('.poptents').innerHeight());
				 		// 	else $('body,html').scrollTop($('body,html').innerHeight());
						// }

						if($box.hasClass('ut-gudbox')){
							var popScrTop = $('.poptents').scrollTop();
							var bodyScrTop = $('.body,html').scrollTop();
							console.log(bodyScrTop);
							var ctnH = $ctn.innerHeight();
							var bodyH = $('body,html').innerHeight();
							if(isPop) $('pct').css('overflow-y','auto').animate({ scrollTop: popScrTop-ctnH},500);
							else $('body,html').animate({ scrollTop: bodyScrTop+ctnH},500);
							
						}
					});
				}
			});
		},
		set:function(){
			$("[data-tog-cls='box']").each(function(){
				var $box = $(this);
				var val  = $(this).attr("data-tog-val") || "open";
				$box.find("[data-tog-cls='ctn']").hide();
				$box.filter(".open").find("[data-tog-cls='ctn']").show();
				//$box.filter(".open").find("[data-tog-cls='btn']").addClass(val);// 2022-03-30 default open시 내부영역 모든 토글 버튼 방향이 고정되는 현상
				$box.filter(".open").find("[data-tog-val='']").addClass(val);
				$box.filter(".open").find("[data-tog-cls='ctn']").addClass(val);
			});

			$("[data-tog-cls='btn']").each(function(){
				var $btn = $(this);
				if( !$btn.find(".btxt").length ){ $btn.append('<span class="btxt"></span>'); }

				if( $btn.is(".open") ){
					$btn.attr("aria-expanded",true).find(".btxt").text("닫기");
				}else{
					$btn.attr("aria-expanded",false).find(".btxt").text("열기");
				}
			});

		},
		open:function(id){

		},
		close:function(id){

		}
	},
	tog:{ // 토글 UI
		init: function() {
			this.evt();
			this.set();
			if( ui.param.tog ) this.set( ui.param.tog );
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tog='btn']", function(e) {
				var id = $(this).data("ui-tog-val");
				var bt = $(this);
				// console.log(id);
				if( bt.hasClass("open") ) {
					_this.close(id);
				}else{
					_this.open(id);
				}
				e.preventDefault();
			});
		},
		set:function(id){
			$("[data-ui-tog='ctn']").hide();
			$("[data-ui-tog='ctn'].open").show();
			var _this = this;
			$("[data-ui-tog='btn']").each(function(idx){
				var $btn = $(this);
				if(!$btn.find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }

				if( $btn.is(".open") ){
					$btn.attr("aria-expanded",true).find(".btxt").text("닫기");
				}else{
					$btn.attr("aria-expanded",false).find(".btxt").text("열기");
				}
			});
		},
		open:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").addClass("open").attr("aria-expanded",true).find(".btxt").text("닫기");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideDown(100,function(){
				$(this).addClass("open");
			});
		},
		close:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").removeClass("open").attr("aria-expanded",false).find(".btxt").text("열기");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideUp(100,function(){
				$(this).removeClass("open");
			});
		}
	},
	tabs:{ // 탭 UI
		init: function() {
			var _this = this;
			this.evt();
			$(window).on("pageshow",function(){
				_this.set();
				_this.posit();
			});
		},
		set:function(speed){
			$(".ut-tabs>.menu").attr({"role":"tablist"});
			$("[data-ui-tab-btn]").each(function(){
				var tid = $(this).attr("aria-controls");
				// $(this).attr({"aria-controls":tid});
				var $li = $(this).closest("li");
				$li.find(".bt").attr({"role":"tab"});
				$li.is(".active") ? $li.find(".bt").attr({"aria-selected":"true"}) : $li.find(".bt").attr({"aria-selected":"false"});
				if( $li.is(".active") ){
					var val = $(this).attr("aria-controls");
					var ctn = $(this).data("ui-tab-btn");
					if($(this).attr("data-ui-tab-btn") !== "tab_gnb") {
						$("[data-ui-tab-ctn="+ctn+"]").removeClass("active");
						$("[data-ui-tab-ctn][aria-labelledby='"+val+"']").addClass("active");
					}
				}
			});
			$("[data-ui-tab-ctn]").each(function(){
				var tid = $(this).attr("aria-controls");
				$(this).attr({"aria-labelledby":tid , "role":"tabpanel" });
			});
			this.posit(speed);
			ui.ly.set();
		},

		posit:function(speed){
			var _this = this;
			speed = speed ? speed :  0;
			$(".ut-tabs").each(function(){
				var $tb     = $(this);
				var tbWid     = $(this).outerWidth();
				var tbScWid   = $tb.prop('scrollWidth');
				var $act    = $tb.find("li.active");
				var actMg    = parseInt( $tb.find("li.active").css("margin-left") );
				var $actWid = $act.outerWidth();
				var $actL   = $act.position() ? $act.position().left : 0;
				// var move    = ( ($actWid) - (tbScWid*0.5) + $actL );
				var move    = (  $actL  + $actWid*0.5 - tbWid*0.5 + actMg );
				// console.log(tbScWid , tbWid , $actL , $actWid , " = ",move);
				// $tb.scrollLeft(  move  );
				$tb.animate({ scrollLeft: move },speed, function() {

				});
			});
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tab-btn]", function(e){
				_this.using(this);
				_this.set(200);
			});
		},
		using:function(els){
			var val  = $(els).attr("aria-controls");
			var ctn = $(els).data("ui-tab-btn");
			// console.log(val, ctn);
			$("[data-ui-tab-btn="+ctn+"]").removeClass("active").closest("li").removeClass("active");

			$(els).addClass("active").closest("li").addClass("active");
			if($(els).attr("data-ui-tab-btn") !== "tab_gnb") {
				$("[data-ui-tab-ctn="+ctn+"]").removeClass("active");
				$("[data-ui-tab-ctn][aria-labelledby='"+val+"']").addClass("active");
			}
		}
	},
	datepick:{ // 년월일 선택 달력피커 jQuery-ui
		init:function(){


			$("input.datepicker").on("focus",function(){
				// $(this).blur();
				// $(this).prop("readonly",true);
				// $(this).attr("tabindex","-1");
				// $(this).next(".ui-datepicker-trigger").focus();
			});

			$(document).on("click",".ui-datepicker-next",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-next").attr({"tabindex":"0"}).focus();
				});
			});
			$(document).on("click",".ui-datepicker-prev",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-prev").attr({"tabindex":"0"}).focus();
				});
			});
			$(document).on("change click",".ui-datepicker-year",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-year").attr("title","년도선택").focus();
				});
			});

			this.set();
		},
		set:function(params){
			var _this = this;
			this.opts = $.extend({
				id:"",
				// minDate: '-3M',
	  			// maxDate: '+28D',
				showOn: "button",
				showButtonPanel: true,
				changeYear:true ,
				// changeMonth:true,
				buttonText: "날짜선택",
				// showMonthAfterYear: true,
				prevText: "이전 달",
				nextText: "다음 달",
				closeText: "닫기",
				dateFormat:"yy.mm.dd",
				yearRange: 'c-50:c+20',
				// yearSuffix: "년",
				showOtherMonths: true,
     			selectOtherMonths: false,
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames : [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				beforeShow: function(els,id) {
					// console.log($(this).attr("id"));
					$(".ui-datepicker").wrap('<div class="ui-datepickwrap"></div>');
					setTimeout(function(){
						ui.keytab.set( $("#ui-datepicker-div") );
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						$("#ui-datepicker-div").attr("tabindex","-1").focus();
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$("#ui-datepicker-div .ui-state-active").attr({"title":"선택됨"});
						$("#ui-datepicker-div .ui-state-highlight").attr({"title":"오늘날짜"});
						$(".ui-datepicker-year").attr("title","년도선택");
						//_this.setYY(els,id);
						$(".ui-datepickwrap").addClass("open");
						ui.lock.using(true);
					});

					// 2022.04.05 달력버튼 누르면 style초기화 test
					// $(".ut-range .radiobox.c").addClass("reset");
					// $(".ut-range .radiobox.c .radio").on("click",function(){
					// 	$(this).parent().removeClass("reset");
					// });
				},
				onSelect :function(date,els){
					// console.log(date,els);
					// $(this).trigger("change");
					// $(this).focus();
					$(this).removeClass("init");
				},
				onChangeMonthYear  :function(els,id){

					setTimeout(function(){
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$(".ui-datepicker-year").attr("title","년도선택").focus();
						//_this.setYY(els,id);
					});
				},
				onClose:function(date,els){
					// console.log(date,els);
					// ui.lock.using(false);
					// $("#"+els.id).focus();
					$(".ui-datepickwrap").removeClass("open");
					setTimeout(function(){
						$(".ui-datepicker").unwrap(".ui-datepickwrap");
						ui.lock.using(false);
						$("#"+els.id).next("button").focus().closest(".ut-date").addClass("coms");
					},200);
				}
			}, params);
			if( this.opts.id ) {
				$("#"+this.opts.id+":not([disabled]):not([readonly])").datepicker(this.opts).addClass("datepicker");
			}else{
				$("input:not([disabled]):not([readonly]).datepicker").datepicker(this.opts);
			}
			$("input:not([disabled]):not([readonly]).datepicker").attr("pattern","\\d*");
			// $("input:not([disabled]):not([readonly]).datepicker").prop("readonly",true);
			$("input.datepicker.st").next(".ui-datepicker-trigger").text("시작날짜선택");
			$("input.datepicker.ed").next(".ui-datepicker-trigger").text("종료날짜선택");
		},
		setYY:function(els,id){
			var dtit = $(els).attr("title") || "날짜선택";
			// console.log(dtit);
			if( !$(".ui-datepicker .dtit").length ) $(".ui-datepicker").prepend('<h4 class="dtit">'+dtit+'</h4>');
			var btsy = '<div class="btsy">'+
							'<button class="bt prev" type="button">이전</button>'+
							'<button class="bt next" type="button">다음</button>'+
						'</div>';
			if( !$(".ui-datepicker-header .btsy").length ) $(".ui-datepicker-header").prepend(btsy);
		}
	},
	monthpick:{ //  년월 선택
		init:function(){
			this.evt();
			this.set();
		},
		dgt:function(mm){
			mm = parseInt(mm);
			mm < 10 ? mm = "0"+mm : mm;
			return mm;
		},
		evt:function(){
			var _this = this;


			$(document).on("click",".bt-month",function(e){
				// $(this).prev("input").trigger("click");
			});
			$(document).on("click","input.monthpicker+.bt-month",function(e){
				var $month = $(this).closest(".ut-date").find(".monthpicker");
				var id = $month.attr("id");
				var mm, yy;
				var val = $month.val();
				if( val != ""){
					yy = val.split('.')[0];
					mm = val.split('.')[1];
				}else{
					var date = new Date();
					yy = date.getFullYear();
					mm = date.getMonth()+1;
				}
				mm = _this.dgt(mm);
				_this.open(id,yy,mm);
			});
			$(document).on("click",".ut-pop-month .cdts .lst>li .mt",function(e){
				var id = $(this).closest(".ut-pop-month").attr("data-id");
				var yy = $(".ut-pop-month .yy").text();
				var mm = $(this).attr("data-val");
				mm = _this.dgt(mm);
				_this.close(id,yy,mm);
			});
			$(document).on("click",".ut-pop-month .hdts .bt.prev",function(e){
				$(".ut-pop-month .yy").text( parseInt(  $(".ut-pop-month .yy").text() ) -1 );
				var id = $(this).closest(".pop-month").data("id");
				_this.setm(id);
			});
			$(document).on("click",".ut-pop-month .hdts .bt.next",function(e){
				$(".ut-pop-month .yy").text( parseInt(  $(".ut-pop-month .yy").text() ) +1 );
				var id = $(this).closest(".pop-month").data("id");
				_this.setm(id);
			});
		},
		open:function(id,yy,mm){
			var _this = this;
			var date = new Date();
			mt = date.getMonth()+1;

			// console.log(yy, mm, id , mt);
			$("body").append(_this.pop);
			$(".ut-pop-month").attr("data-id",id);
			$(".ut-pop-month .yy").text(yy);
			ui.popup.open('pop-month',{
				ocb:function(){

				},
				ccb:function(){
					// _this.close(id,yy,mm);
					$("#"+id).next(".bt-month").focus();
					$(".ut-pop-month").remove();
				}
			});
			_this.setm(id);
		},
		setm:function(id){
			var _this = this;
			var todays={}, current={};
			var $input = $("input#"+id);
			var minDate = $input.attr("data-min") || "0000.00";
			var minYY = minDate.split('.')[0];
			var minMM = minDate.split('.')[1];
			var maxDate = $input.attr("data-max") || "9999.12";
			var maxYY = maxDate.split('.')[0];
			var maxMM = maxDate.split('.')[1];
			var val = $("input#"+id).val();
			var date = new Date();
			todays.yy = date.getFullYear();
			todays.mm = date.getMonth()+1;

			current.yy = val.split('.')[0];
			current.mm = val.split('.')[1];

			// 2022-06-17 월 10 이하일때 앞자리 0 추가
			current.mm = _this.dgt(current.mm);
			// console.log(current.mm);

			// console.log(todays.yy, todays.mm, id , current.yy ,current.mm , minYY , minMM , maxYY , maxMM ,"기간 - "+ minDate +"~"+ maxDate);
			var selyy = $(".ut-pop-month .yy").text();
			$(".ut-pop-month .lst").attr("data-yy",selyy);
			$(".ut-pop-month .lst>li").removeClass("today active");
			$(".ut-pop-month .lst[data-yy='"+todays.yy+"'] li:nth-child("+todays.mm+")").addClass("today");
			$(".ut-pop-month .lst[data-yy='"+current.yy+"'] li .mt[data-val='"+current.mm+"']").closest("li").addClass("active");
			$(".ut-pop-month .lst>li").each(function(){
				var selmm = $(this).find(">.mt").attr("data-val");
				// console.log(current.yy);
				$(this).attr("data-date",selyy+selmm);
				var thisDate = parseInt( $(this).attr("data-date") );
				// console.log(minYY+minMM, maxYY+maxMM , thisDate);
				if( minYY+minMM < thisDate+1  && maxYY+maxMM > thisDate-1 ) {
					$(this).removeClass("disabled").find(".mt").prop("disabled",false);
				}else{
					$(this).addClass("disabled").find(".mt").prop("disabled",true);
				}
			});
			// console.log(  minYY +" "+ selyy +" "+ maxYY );
			if( minYY < selyy ){
				$(".ut-pop-month  .bt.prev").prop("disabled",false);
			}else{
				$(".ut-pop-month  .bt.prev").prop("disabled",true);
			}
			if( maxYY > selyy ){
				$(".ut-pop-month  .bt.next").prop("disabled",false);
			}else{
				$(".ut-pop-month  .bt.next").prop("disabled",true);
			}
			ui.keytab.set( $(".ut-pop-month").find(".pbd") );
		},
		close:function(id,yy,mm){
			var _this = this;
			mm = _this.dgt(mm);
			// console.log(yy, mm, id);
			ui.popup.close('pop-month',{
				ccb:function(){
					$("#"+id).val(yy+"."+mm).next(".bt-month").focus().closest(".ut-date").addClass("coms");
				}
			});
		},
		pop:'<article class="pop-layer c pop-month ut-pop-month" id="pop-month">'+
			'	<div class="pbd">'+
			'		<div class="phd">'+
			'			<div class="in">'+
			'				<h1 class="ptit blind">월 선택</h1>'+
			'			</div>'+
			'		</div>'+
			'		<div class="pct">'+
			'			<main class="poptents">'+
			'				<div class="hdts">'+
			'					<div class="yy"></div>'+
			'					<button type="button" class="bt prev">이전 년도</button>'+
			'					<button type="button" class="bt next">다음 년도</button>'+
			'				</div>'+
			'				<div class="cdts">'+
			'					<ul class="lst">'+
			'						<li><button type="button" data-val="01" class="mt"><b class="t">1</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="02" class="mt"><b class="t">2</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="03" class="mt"><b class="t">3</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="04" class="mt"><b class="t">4</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="05" class="mt"><b class="t">5</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="06" class="mt"><b class="t">6</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="07" class="mt"><b class="t">7</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="08" class="mt"><b class="t">8</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="09" class="mt"><b class="t">9</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="10" class="mt"><b class="t">10</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="11" class="mt"><b class="t">11</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="12" class="mt"><b class="t">12</b> <i class="m">월</i></button></li>'+
			'					</ul>'+
			'				</div>'+
			'			</main>'+
			'		</div>'+
			'		<button type="button" class="btn-pop-close"><i class="blind">닫기</i></button>'+
			'	</div>'+
			'</article>',
		set:function(){
			$(".monthpicker").each(function(idx){
				var id = $(this).attr("id");
				id ? id : $(this).attr("id","input_month_"+idx);
				var $month = $(this);
				var $monbt = $month.next(".bt-month");
				$monbt.length ? $(this).addClass("set") : $month.after('<button type="button" class="bt-month">월선택하기</button>') ;
			});
		}
	},
	lock:{ // 스크롤 막기,풀기
		sct:0,
		stat:false,
		els:".pop-layer:visible  , .ui-confrim:visible , .ui-alert:visible",
		container:".container , .header , .footer , .floatnav",
		set:function(){
			if(	$(this.els).length <= 0 ){
				this.using(false);
			}
		},
		using:function(opt){

			if( opt === true && this.stat === false ){
				$(this.container).attr("aria-hidden","true");
				this.stat = true;
				ui.lock.sct = $(window).scrollTop();
				$("body , html").addClass("is-lock is-lock-end");
				$("html").css({"top":""+(-ui.lock.sct)+"px"});
				$(this.els).bind("touchmove scroll", function(e){ e.preventDefault(); });
			}
			if( opt === false && $(this.els).length <= 0 && $("body").is(".is-lock") ){
				this.stat = false;
				$("body , html").removeClass("is-lock");
				$("html").css({"top":""});
				$(window).scrollTop( ui.lock.sct );
				$(this.els).unbind("touchmove scroll");
				setTimeout(function(){
					$("body , html").removeClass("is-lock-end");
				},50);
				$(this.container).removeAttr("aria-hidden");
			}
		}
	},
	banner:{

	},
	slides:{ // 스와이프 슬라이드
		init:function(){
			this.set();
		},
		set:function(){
			var _this = this;

			$(this.dot.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}
				_this.dot.using(id);
			});
			$(this.num.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}
				_this.num.using(id);
			});

			$(this.play.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}
				_this.play.using(id);
			});
		},
		dot:{  //
			els: ".ut-slide-dot .swiper-container:not(.swiper-container-initialized)",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				zoom: {
					maxRatio: 1,
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using: function(id) {
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		num:{  //
			els: ".ut-slide-num .swiper-container:not(.swiper-container-initialized)",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					type:"fraction"
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using:function(id) {
				if( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		play:{
			els:".ut-slide-play .swiper-container:not(.swiper-container-initialized)",
			opt:{
				observer: true,
				observeParents: true,
				watchOverflow:true,
				simulateTouch:false,
				freeMode: false,
				slidesPerView: 1,
				slidesPerGroup:1,
				spaceBetween:0,
				autoHeight:true,
				pagination: {
					el: '.dots',
					clickable: true
				},
				loop: false,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				}
			},
			slide:{},
			using:function(id){
				var _this = this;
				var sld = "[data-slide-id="+id+"]";
				if( $(sld).find(".swiper-slide").length <= 1 ) {
					_this.opt.loop = false;
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
					$(sld).find(".control .plys").hide();
					$(sld).find(".control .dots").html("");
				}else{
					_this.opt.loop = true;
					$(sld).find(".control").show();
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
				}

				$(document).on("click","[data-slide-id="+id+"] .plys .bt",function(e){
					if( $(this).is(".play") ){
						$(this).removeClass("play").text("재생");
						ui.slides[id].autoplay.stop();
					}else{
						$(this).addClass("play").text("정지");
						ui.slides[id].autoplay.start();
					}
				});
			}
		},
	},
	alert:function(msg,params){ // 커스텀 알럿

		var opt = $.extend({
			msg:msg,
			tit:"",
			cls:"",
			ycb:"",
			ybt:"확인"
		}, params);

		if( $(".ui-alert").length ) return;

		ui.lock.using(true);
		// console.log(opt.tit);

		var lyAlert =
		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-alert ' + opt.cls + '">' +
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
		'		<div class="pbt">'+
		'			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		// '		<button type="button" class="btn-close">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyAlert).addClass("is-alert");
		if (opt.tit) {
			$(".ui-alert>.pbd>.phd").addClass("is-tit");
		}


		$(".ui-alert").find(".btn-confirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});
		$(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

		function alertClose(){
			$(".ui-alert").remove();
			$("body").removeClass("is-alert");
			if( $(".pop-layer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
		/* 웹접근성 팝업안에서 탭키이동 */
		ui.keytab.set( $(".ui-alert").find(".pbd") );
		$(".ui-alert").focus();
	},
	confirm:function(msg,params){ // 커스텀 컨펌

		var opt = $.extend({
			msg:msg,
			tit:"",
			cls:"",
			ycb:"",
			ybt:"확인",
			ncb:"",
			nbt:"취소"
		}, params);

		if( $(".ui-confrim").length ) return;

		ui.lock.using(true);

		var lyConfirm =
		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-confrim ' + opt.cls + '">' +
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
		'		<div class="pbt">'+
		'			<button type="button" class="btn btn-cancel">'+ opt.nbt +'</button>'+
		'			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		// '		<button type="button" class="btn-close">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyConfirm).addClass("is-confrim");
		if (opt.tit) {
			$(".ui-confrim>.pbd>.phd").addClass("is-tit");
		}


		$(".ui-confrim").find(".btn-confirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});

		$(".ui-confrim").find(".btn-cancel").on("click",function(){
			window.setTimeout(opt.ncb);
		});

		$(".ui-confrim").find(".btn-confirm, .btn-close , .btn-cancel").on("click",confirmClose);

		function confirmClose(){
			$(".ui-confrim").remove();
			$("body").removeClass("is-confrim");
			if( $(".pop-layer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}


		/* 웹접근성 팝업안에서 탭키이동 */
		ui.keytab.set( $(".ui-confrim").find(".pbd") );

		$(".ui-confrim:visible").focus();


	},
	toast:function(msg,params){ // 토스트창
		var _this = this;
		_this.opt = $.extend({
			msg:msg,
			cls:"",
			sec:2000,
			bot:"",
			ccb: null,
			zIndex:1000,
			setTime:true
		}, params);

		if ( $(".pop-toast:visible").length ) { return; }

		var lyToast =
		'<article role="alert" aria-live="assertive" class="pop-toast ' + _this.opt.cls + '">' +
		'	<div class="pbd">' +
		'		<div class="pct">' + _this.opt.msg + '</div>' +
		'		<button type="button" class="btn-close""></button>' +
		'	</div>' +
		'</article>';

		$("body").append(lyToast).addClass("is-toast");

		$(".pop-toast").find(".btn-close").on("click",function(){
			toastClose("close");
		});

		window.setTimeout(function() {
			$(".pop-toast:visible").addClass("on").css({"padding-bottom" : _this.opt.bot , "z-index" : _this.opt.zIndex});
		});

		if(_this.opt.setTime){
			toastClose();
		}
		function toastClose(sec){
			if(sec == "close"){
				_this.opt.sec = 0;
				clearTimeout(_this.timer);
			}
			_this.timer = setTimeout(function() {
				$(".pop-toast:visible").removeClass("on").on(ui.transitionend,function(){
					// console.log("fsd");
					$(".pop-toast").remove();
					$("body").removeClass("is-toast");
					if( typeof _this.opt.ccb == "function" ){
						_this.opt.ccb();
					}
				});
			}, _this.opt.sec);
		}


	},
	popup:{ // 레이어팝업
		init: function() {
			var _this = this;
			$(document).on("click", ".pop-layer .btn-pop-close:not('.no-close')", function() {
				var id = $(this).closest(".pop-layer").attr("id");
				_this.close(id);
			});

			// $(document).on("click", ".pop-layer:not('.no-close')", function(e) {
			// 	var id = $(this).closest(".pop-layer").attr("id");
			// 	// console.log(e.target);
			// 	if ( $(e.target).is(".pop-layer") ) {
			// 		_this.close(id);
			// 	}
			// });
			_this.resize();
			$(window).on("load resize",function(){
				_this.resize();
			});
		},
		callbacks:{},
		open: function(id,params) {
			// console.log(id,params);
			commonPopArr.push(id); // 팝업 ID 배열
			var _this = this;

			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				direct: "bottom",
				zIndex: "",
			}, params);

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;

			ui.lock.using(true);

			$("body").addClass("is-pop"+ "is-"+id);


			$("#" + id).attr("role","dialog").attr("aria-modal","true").addClass(_this.opt.direct).css({ zIndex: _this.opt.zIndex }).fadeIn(10,function(){
				$(this).attr({"aria-labelledby":id+"-title"});
				$(this).find(".phd .ptit").attr("tabindex","0");
				$(this).find(".phd .ptit").attr({"id":id+"-title"});
				$(this).addClass("on").attr("tabindex","0").focus();
				_this.resize();
				_this.scroll(id);
				$(this).find(">.pbd").on(ui.transitionend,function(){
					if(_this.callbacks[id].open)  _this.callbacks[id].open();
					$(this).off(ui.transitionend);
				});
			});

			window.setTimeout(function(){
				_this.resize();
			});

			/* 웹접근성 팝업안에서 탭키이동 */
			ui.keytab.set( $("#" + id).find(".pbd") );
		},
		close: function(id,params) {
			commonPopArr.pop(); // 팝업 ID 배열
			var _this = this;
			_this.closOpt = $.extend({
				ccb: null,
			}, params);

			$("#"+id).removeClass("on").on(ui.transitionend,function(){
				_this.resize();
				$(this).hide().removeClass(_this.opt.direct);
				// if( typeof _this.callbacks[id].close == "function" ){ _this.callbacks[id].close(); }
				try{ _this.callbacks[id].close(); }catch(error){}
				// if( typeof _this.closOpt.ccb == "function") { _this.closOpt.ccb(); }
				try{ _this.closOpt.ccb(); }catch(error){}

				if( !$(".pop-layer:visible").length ){
					ui.lock.using(false);
					$("body").removeClass("is-pop").removeClass("is-"+id);
					$("body").removeClass("is-pop-pbt");
				}
				$(this).off(ui.transitionend);
			}).css({"z-index":""});
		},
		set:function(){
			this.resize();
			this.scroll();
		},
		resize:function(){
 			$(".pop-layer:visible").each(function(){
				var $pop = $(this);
				var pctnH =  $pop.outerHeight();
				var pbtnH =  $pop.find(".pbt:visible").outerHeight() || 0 ;
				var ptopH =  $pop.find(".tops:visible").outerHeight() || 0 ;
				var floatH =  $pop.find(".floatbots>.inr:visible").outerHeight() || 0 ;
				var phdH = $pop.find(".phd").outerHeight();
				
				// console.log(pbtnH,floatH);
				pctnH = pctnH - ( phdH || 0 );
				if( $pop.is(".a") ){ $pop.find(".pbd>div.pct").css({"height": pctnH }); }
				if( $pop.is(".b") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - pbtnH - 40 });}
				if( $pop.is(".c") ){
					// 2022-16-17 높이체크 안함
					$pop.find(".pbd>div.pct").css({"max-height": pctnH - ptopH - 30});

					// 2022-06-17 스크롤이 없을때 overflow-y : visible
					// let chkH = $pop.find(".pbd>div.pct .poptents").outerHeight();
					// if (pctnH < chkH ) {
					// 	$pop.find(".pbd>div.pct").css({"max-height": pctnH - ptopH - 30, "overflow-y": "auto"});
					// } else {
					// 	$pop.find(".pbd>div.pct").css({"overflow-y": "visible" });
					// }
					// let observer_el = document.querySelector('.pct');
					// let observer_el = this.querySelector('.pct');
					// let pephd = this.querySelector('.phd');
					// const observer = new ResizeObserver(entries => {
					// 	for (let entry of entries) {
					// 		const {height} = entry.contentRect;
					// 		pephd.innerText = ` 높이: ${height}`;
					// 		let obH = height;
					// 		if (pctnH < obH ) {
					// 			$pop.find(".pbd>div.pct").css({"max-height": pctnH - ptopH - 30, "overflow-y": "auto"});
					// 		}
					// 	}
					// });
					// observer.observe(observer_el);
					// console.log($pop);
					// console.log($pop.outerHeight());
					// console.log(pctnH);
					// console.log(observer_el);
					// resizeObserver.observe(observer_el, { box : 'border-box' });
					// console.log(typeof(observer_el));

				}
				if( $pop.find(".pbt:visible").length || $pop.find(".floatbots>.inr:visible").length ) {
					$("body").addClass("is-pop-pbt");
					$pop.addClass("is-pop-pbt");

					// 2022-05-26 .pbt or .floatbots.inr 영역별 여백 구분
					var pbtCnt = $pop.find(".pbt:visible").length;
					var pdBottom = floatH+phdH+(phdH/2); // .floatbots.inr, (phdH/2)은 320이하때문에 추가
					if(pbtCnt>0) pdBottom = pbtnH+floatH; //.pbt

					$pop.filter(".a,.c").find(".pct").css({"padding-bottom":"calc("+pdBottom+"rem + env(safe-area-inset-bottom))"});
					
				}else{
					$("body").removeClass("is-pop-pbt");
					$pop.removeClass("is-pop-pbt");
					$pop.filter(".a,.c").find(".pct").css({"padding-bottom":""});
				}
				// 2022-05-31 개발화면 바닥 컨텐츠 가림 해결 (바닥페이지를 팝업으로 사용해서 어쩔 수 없이 만듬)
				// $("input", "textarea", "select").on("focus",function(){
				// 	$pop.filter(".a,.c").find(".coptents").addClass("add-padding"); 
				// });
				// $("input", "textarea", "select").on("blur",function(){
				// 	$pop.filter(".a,.c").find(".coptents").removeClass("add-padding"); 
				// });

			});
		},
		scroll:function(id){
			var _this = this;
			var prevPosition = 0;
			var dnVar = 0;
			var upVar = 0;
			var gap = 3;
			$("#"+id+" .pct").on("scroll",function(){
				var _this = this;
				var scrTop = $(this).scrollTop();
				// console.log(id," = scrol = " , $(this).scrollTop());
				var initPosition = scrTop;
				// console.log(initPosition , prevPosition);
				// console.log(dnVar - upVar);
				if( initPosition > prevPosition ){
					dnVar ++ ;
					// console.log(id + " dn");
					//스크롤다운중;
					upVar = 0;
					$("#"+id+"").addClass("is-pop-scroll-down");
					// console.log(dnVar,upVar , upVar-dnVar);
					if( upVar-dnVar < -gap ) {
						$("#"+id+"").addClass("is-pop-pbt-hide");
					}
				}else {
					upVar ++ ;
					// console.log(id + " up");
					//스크롤 업중;
					dnVar = 0;
					$("#"+id+"").removeClass("is-pop-scroll-down");
					if( dnVar-upVar < 1 ) {
						$("#"+id+"").removeClass("is-pop-pbt-hide");
					}
				}
				prevPosition = initPosition ;

				if (scrTop > 10) {
					$("#"+id+"").addClass("is-pop-head-shadow");
				}else{
					$("#"+id+"").removeClass("is-pop-head-shadow");
				}

				// 바닥첵크
				var docH = $("#"+id+" .poptents").outerHeight();
				var scr = scrTop + $("#"+id+" .pct").outerHeight();
				// console.log(docH,scr);
				if(docH <= scr + gap ){
					// console.log("바닥");
					$("#"+id+"").removeClass("is-pop-scroll-down");
					$("#"+id+"").removeClass("is-pop-pbt-hide");
				}else{
					//
				}
				var scrStopEvent = null;
				$(this).scrollStopped(function(){
					// console.log("scroll 스톱");
					clearTimeout(scrStopEvent);
					scrStopEvent = window.setTimeout(function(){
						// console.log("2초 있다 다시 나타나라고?");
						$("#"+id+"").removeClass("is-pop-scroll-down");
						$("#"+id+"").removeClass("is-pop-pbt-hide");
						clearTimeout(scrStopEvent);
					},2000);
				});

			});

		}
	},
	cookie:{ // 쿠키 설정
		set:function(cname, cvalue, exdays){
			var d = new Date();
			d.setTime( d.getTime() + (exdays * 60 * 60 * 1000) );
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		get:function(cname){
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		del:function(cname){
			document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
		}
	},
	format:{ // input_format
		init:function(target) { 
			target.value = target.value.replace(/[^0-9]/g, '');
			const value = target.value.split('');
			let type = target.className;
			if(type.indexOf('datepicker')!== -1){ 
				// type.includes('datepicker')
				const textArr = [
					[0, 4],
					[0, value.length > 7 ? 2 : 1],
					[0, 2]
				];
				target.value = textArr
				.map(function(v)  { 
					return value.splice(v[0], v[1]).join("") 
				})
				.filter(function(text) { 
					return text 
				})
				.join(".");

				// 쿼크값 방지
				let chk = target.value.length
				if (chk === 9){
					let chk_a = target.value.split('.');
					let num1 = Number(chk_a[0]);
					let num3 = Number(chk_a[2]);
					if (!(num1 > 0 && num3 > 0 && num3 <= 31)) {
						target.value = '';	
					}
				}
				else if (chk === 10){
					let chk_a = target.value.split('.');
					let num1 = Number(chk_a[0]);
					let num2 = Number(chk_a[1]);
					let num3 = Number(chk_a[2]);
					if (!(num1 > 0 && num2 > 0 && num2 <= 12 && num3 > 0 && num3 <= 31)) {
						target.value = '';	
					}
				}
			}
			else if(type.indexOf('monthpicker')!== -1){
				const textArr = [
					[0, 4],
					[0, 2],
				];
				target.value = textArr
				.map(function(v)  { 
					return value.splice(v[0], v[1]).join("") 
				})
				.filter(function(text) { 
					return text 
				})
				.join(".");

				// 쿼크값 방지
				let chk = target.value.length
				if(chk === 6){
					let chk_a = target.value.split('.');
					let num1 = Number(chk_a[0]);
					if (!(num1 > 0)) {
						target.value = '';
					}
				}
				else if(chk === 7){
					let chk_a = target.value.split('.');
					let num1 = Number(chk_a[0]);
					let num2 = Number(chk_a[1]);
					if(!(num1 > 0 && num2 > 0 && num2 <= 12)) {
						target.value = '';
					}
				}
			}
			else { 
				const textArr = [
					[0, value.length > 9 ? 3 : 2],
					[0, value.length > 10 ? 4 : 3],
					[0, 4]
				];
				target.value = textArr
				.map(function(v)  { 
					return value.splice(v[0], v[1]).join("") 
				})
				.filter(function(text) { 
					return text 
				})
				.join("-");
			}
			
		},
	},
	inputFocus:{ // 키패드 올라올때 인풋에 포커스 이동
		init:function(){
			this.focus();
		},
		focus:function(){
			const _cit = document.querySelectorAll(".container:not(.no-focus) .input:not(.ipsch), .container:not(.no-focus) .textarea"); //contents_input ,contents_textarea
			const _lit = document.querySelectorAll(".pop-layer:not(.gnb) .input:not(.ipsch), .pop-layer:not(.gnb) .textarea"); //layer_input ,layer_textarea
			const _litnf = document.querySelectorAll(".pop-layer:not(.no-focus) .input:not(.ipsch), .pop-layer:not(.no-focus) .textarea"); //layer_input ,layer_textarea
			const len_cit = _cit.length;
			const len_lit = _lit.length;
			const len_litnf = _litnf.length;

			// contents_input ,contents_textarea
			if(len_cit) {
				const _hdh = document.querySelector(".header").clientHeight;
				const _space = 16;
				for (let i = 0; i < len_cit; i++) {
					let _el = _cit[i];
					_el.addEventListener("click", function () {
						let pos = (window.pageYOffset + _el.getBoundingClientRect().top) - (_hdh + _space);
						$("html").animate({scrollTop: pos}, 200);
						// window.scrollTo({top:pos, left:0, behavior:"smooth"});
					});
					console.log(_el);
				}
				console.log('_cit');
			}

			// layer_input ,layer_textarea
			if(len_lit && len_litnf) {
				for (let i = 0; i < len_lit; i++) {
					let _el = _lit[i];
					_el.addEventListener("click", function () {
						// const _hd = document.querySelector(".pop-layer:not(.gnb) .phd").clientHeight;
						const _pl = this.closest(".pop-layer");
						const _phd = _pl.querySelector(".phd");
						const _phdh = _phd.clientHeight;
						const _space = 10;
						const _prt = this.closest(".pct");
						const _mdw = _pl.querySelectorAll(".mdw-tabs");
						let pos = (_prt.scrollTop + _el.getBoundingClientRect().top) - (_phdh + _space);
						if(!_mdw.length) {
							if(!_pl.classList.contains('c')) {
								$(".pct").animate({scrollTop: pos}, 200);
							}
							// 예외처리 c타입
							else {
								$(".pct").animate({scrollTop: pos - 30}, 200);
							}
							// console.log('pos : ' + pos);
						}
						// 예외처리 mdw-tabs
						else {
							const _addh = _mdw[0].clientHeight;
							$(".pct").animate({scrollTop: pos - _addh}, 200);
						}
					});
					console.log(_el);
				}
				console.log('_lit');
			}

		},
	},
	html:{} // 이거 지우면안돼는거 였음.
};

// ui.init();
$(document).ready(function(){
	// console.log(typeof ui.html.set);
	if( typeof ui.html.set  == "undefined" ){
		ui.init();
		console.log("ui.init();");
	}else{
		ui.html.include();
		ui.html.times = setInterval(function(){ // console.log("ui.html" ,  ui.html.incCom);
			if (ui.html.incCom) {
				clearInterval(ui.html.times);
				ui.init();
				console.log("ui.init();");
			}
		});
	}
});

//*******************************************//
return ui; })();
