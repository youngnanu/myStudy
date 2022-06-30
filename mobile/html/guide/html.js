ui.html = {
	set:{
		init:function () {
			// this.tit();
			this.menu.init();
			this.uimenu.init();
			this.pops.init();
			this.bar();
			// console.log("ui.html.init();");
			$(document).on("change","input[type=file]",function(e){
				var fUrl = this.value.split("\\");
				var fName = fUrl[fUrl.length - 1];
				console.log( fName  ," = ", this.value );
			});
		},
		tit:function(){
			
			// console.log( document.title == "" || document.title == "UI" ,  document.title );
			var tit;
			if( document.title == "" || document.title == "UI" ){
				tit = $(".header .title .htit").text() || $(".pop-layer .phd .ptit").text() || '' ;
				tit = ""+ tit + " > 교보생명";
				document.title =  tit   ;
				// console.log(document.title);
			}else{
				tit = window.location.pathname.split("/");
				document.title = decodeURI( tit[tit.length - 1] );
			}
		},
		pops:{
			init:function(){
				this.set();
			},
			set:function(){
				if(	!$(".wrap").find(".container").length  &&  !$(".ut-test").length ){
					
					$(".body").append('<div class="pops-html"></div>');

					$(".pop-layer").each(function(){
						var pid = $(this).attr("id");
						// console.log(pid);
						var btn = '<button type="button" class="btn sm g" onclick="ui.popup.open(\''+pid+'\');">ui.popup.open(\''+pid+'\');</button>';
						$(".body .pops-html").append(btn);
					});

				}
			}
		},
		bar:function(){
			$(window).on("load scroll",function(e){
				if( $("html").is(".is-lock") ) {
					e.preventDefault();
					return false;
				}
				var winH = ui.viewport.height();
				var docH = ui.viewport.docHeight();
				var scrT = ui.viewport.scrollTop();
				var pct =  scrT / ( docH - winH ) * 100 ;
				// console.log( winH , docH , scrT ,  pct );
				$("#bar-ht>i").css({"width":pct+"%"});
			});
		},
		uimenu:{ // uimenu 
			init: function() {
				//ui.gnb.using("open");
				this.evt();
				this.list();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("click", ".btn-ui:not(.ing)", function() {
					if ($("body").hasClass("is-uimenu-on")) {
						_this.using("close");
					} else {
						_this.using("open");
					}
				});
				$(document).on("click", ".uiscreen , nav.uimenu>.close", function() {
					_this.using("close");
				});
	
				$(document).on("click","nav.uimenu .menu .list>li>a",function(e){
					var $this = $(this);
					if ($("body").hasClass("is-lock")) {
					}
					// _this.using("close");
					setTimeout(function(){
						var sc_msid = $this.data("btn-sid");
						var sc_msid_top = $("[data-sid="+sc_msid+"]").offset().top - 10 - $(".header").outerHeight() || 0 ;
						// console.log(sc_msid,sc_msid_top);
	
						$("body,html").animate({ scrollTop: sc_msid_top }, 100, function() {
							// els.removeClass("disabled");
						});
					},50);
				});	
			},
			using: function(opt) {
				if (opt === "open") {
					// ui.lock.using(true);
					$(".btn-ui").addClass("ing");
					$("nav.uimenu").after('<div class="uiscreen" tabindex="-1"></div>');
					$("nav.uimenu").show().animate({"left": 0}, 300,function(){
						$(".btn-ui").removeClass("ing");
						//$("nav.uimenu").attr("tabindex","-1").focus();
					});
					$("body").addClass("is-uimenu-on");
					$(".uiscreen").show();
				}
				if (opt === "close") {
					$(".btn-ui").addClass("ing");
					$("nav.uimenu").animate({"left": "-100%"}, 300,function(){
						$("body").removeClass("is-uimenu-on");
						$(".uiscreen").hide().remove();
						$("nav.uimenu").hide();
						$(".btn-ui").removeClass("ing");
						//$(".header .gnb .btn-gnb").attr("tabindex","0").focus();
					});
					// ui.lock.using(false);
				}
			},
			list:function(){
				var _this = this;
				$(".page.ui .sect:visible h3.hdt").each(function(idx){
					// console.log( $(this).text() );
					var mtxt = $(this).text();
					var msid = $(this).closest(".sect").data("sid");
					$("nav.uimenu .menu .list").append('<li><a data-btn-sid="'+msid+'" href="javascript:;">'+mtxt+'</a></li>');
				});
			},
			set:function(){
				var lks = 
					'<div class="help">'+
					'	<a class="lk" href="../../html/guide/ia.html" target="_blank">IA</a>'+
					'	<a class="lk" href="../../../guide/notice.html" target="_blank">도움말</a>'+
					'	<a class="lk" href="./ui1.html">UI-1</a>'+
					'	<a class="lk" href="./ui2.html">UI-2</a>'+
					'</div>';
				$("nav.uimenu .menu").prepend(lks);
			}
		},
		menu:{
			init: function () {
				this.evt();
				this.keyGoUi();
			},
			evt: function () {
				var _this = this;
				var keyM = this.togMenu;
				var keyF2 = this.togUrl;
				var keyF7 = this.togMobile;
				var keyF4 = this.togDev;
				var keyBack = this.keyBack;
				var fStat = true;
				$(document).on({
					focus: function () {
						fStat = false;
						// console.log("f");
					},
					blur: function () {
						fStat = true;
						// console.log("t");
					}
				}, "textarea , input:not([type=radio],[type=checkbox])");
	
				$("body").append('<button type="button" class="btn-link-html">링크열기</button>');
	
				$(document).on("click", ".btn-link-html", this.togMenu);
	
				$(document).on("keydown mousedown", function (e) {
					if( fStat === true ){
						if( e.keyCode == 77 && $("body:not('.link')").length ) { keyM();	} // M 키 이벤트
						if( e.keyCode == 113 ) { keyF2(); } //F2 키 이벤트
						if( e.keyCode == 118 ) { keyF7(); } //F7 키 이벤트
						if( e.keyCode == 115 ) { keyF4(); } //F4 키 이벤트
						if( e.keyCode == 8   ) { keyBack(); } //Back 키 이벤트
					}
				}).on("mousedown", function () {
					$(".link-html").remove();
				});
	
	
				
				$(document).on("click", ".link-html dt>a", function () {
					_this.linkSet(this);
				});
					
	
				if ( !window.localStorage.getItem("linkMenu") ) {
				}
					
	
			},
			linkSet:function(my){

				var ckidObj = {};
				var els = $(my).closest("dt");
	
				//var linkData = $.cookie("linkMenu");
				var linkData = window.localStorage.getItem("linkMenu");
				if (linkData) {
					ckidObj = JSON.parse(linkData);
				}
				var ckid = els.attr("id").replace("linkID", "");
	
				// ckidObj["linkID" + ckid] = true;
				// debug;
				if (els.hasClass("open")) {
					// console.log("dfsssssssss");
					els.next("dd").slideUp(100,function(){
						els.removeClass("open");
					});
					JSON.parse(linkData);
					ckidObj["linkID" + ckid] = false;
					//console.log(ckidObj["linkID"+ckid])
				} else {
					els.next("dd").slideDown(100,function(){
						els.addClass("open");
					});
					ckidObj["linkID" + ckid] = true;
					//console.log(  "linkID"+ckid ,  ckidObj["linkID"+ckid]);
				}
				ckidObj = JSON.stringify(ckidObj);
				window.localStorage.setItem("linkMenu", ckidObj);				
			},
			linkStat: function () {

				// $(".link-html .ia-body dt:not(.open)").addClass("open");
				$(".link-html .ia-body dt").each(function (i) {
					$(this).attr("id", "linkID" + i);
				});

				var linkData = window.localStorage.getItem("linkMenu");
				if (linkData) {
					var linkObj = JSON.parse(linkData); //console.log( linkObj );
					for (var key in linkObj) { //console.log( key );
						if (linkObj[key]) {
							$("#" + key).addClass("open").next("dd").show();
						}else{
							$("#" + key).removeClass("open").next("dd").hide();
						}
					}
				}
				var thisPg = decodeURI( "../.."+window.location.pathname.replace("/kyobo/","/").replace("/ui/","/").replace("/static/","/").replace("/mo/","/").replace("/pc/","/").replace("/admin/","/") );
				console.log(thisPg);
				$(".link-html td.urls").each(function () {
					var link = $(this).find(">a").attr("href");
					//console.log(link);
					if (link) {
						var lk = link.replace("../../", "./");
						$(this).find(">a").text(lk);
					}
					//}
					$(this).find("em").wrapInner('<a href="' + link + '" target="_blank"></a>');
					// console.log(link , thisPg);
					if ( link == thisPg ) {
						// console.log("tr active");
						$(this).closest("tr").addClass("active");
						$(this).closest("dd").prev("dt").addClass("open");
						$(this).closest("dd").show();
					}
				});
				$(".link-html .lev5").each(function () {
					var name = $(this).text();
					if (!name) {
						var pname = $(this).prev(".lev4").text();
						
						$(this).text(pname);
					}
				});


				$(".link-html .pan").on("scroll",function(){
					var linkScr = $(".link-html .pan").scrollTop();
					window.localStorage.setItem("linkScr", linkScr);
				});
				setTimeout(function(){
				
					var $active = $(".link-html tr.active");
					if ( $active.length ) {
						// var linkTxtTop = $active.offset().top - $(".temp-link .pan").outerHeight()*0.5 - $(window).scrollTop();
						var linkTxtTop = $active.offset().top - $(".link-html .pan").outerHeight()*0.5  - $(".link-html .pan").scrollTop()- $(window).scrollTop();
						// console.log(linkTxtTop , $active.offset().top);
						$(".link-html .pan").scrollTop(linkTxtTop );
					}
					$(".link-html tr.active .urls").find("a").focus();
	
				},10);
	
			},
			keyBack:function(){
				console.log("뒤로");
				window.history.back();
			},
			keyGoUi:function(){
				$(document).on("keydown mousedown", function (e) {
					if( e.altKey ){
						// console.log( e.keyCode  ,e.altKey);
						if( e.keyCode == 48 ) { location.href = "../guide/ia.html"; }
						if( e.keyCode == 49 ) { location.href = "../guide/ui1.html"; }
						if( e.keyCode == 50 ) { location.href = "../guide/ui2.html"; }
					}
				});
			},
			togMenu:function(){
				var _this = this;
				if ($(".link-html").length) {
					$(".link-html").remove();
				} else {
					var list =
						'<article class="link-html">' +
							'<div class="pan"></div>' +
						'</article>';
					$("body").append(list);
	
					$(".link-html>.pan").load("../../html/guide/ia.html .ia-body", function () {
						ui.html.include();
						ui.html.load(function(){
							ui.html.set.menu.linkStat();
						});
						setTimeout(function(){
							// ui.html.set.menu.linkStat();
							
						},100);
					});
	
					$(".link-html , .btn-link-html").on("mousedown", function (e) {
						e.stopPropagation();
					});
				}
	
			},
			togMobile:function(){ // F7 키
			},
			togUrl:function(){ // F2 키
	
				var tUrl = window.location.href;
				var tPort = window.location.port;
				var tHost = window.location.host;
				var tName = window.location.hostname;
				var tOrg = window.location.origin;
				var tIp = window.location.hostname;
				// console.log(tPort, tUrl , tName);
				if(tPort == "9084" ||tPort == "9085" || tName == "localhost" || tName == "127.0.0.1"){
					console.log(tUrl.replace(tHost,"tca.kyobo.co.kr"));
					location.href = tUrl.replace(tHost,"tca.kyobo.co.kr").replace("/static/","/ui/");
				}
				if(tOrg == 'http://tca.kyobo.co.kr' || tOrg == 'http://10.27.225.22:9085'){
					location.href = tUrl.replace(tOrg,"http://localhost:9085").replace("/ui/","/static/");
				}
			},
			togDev:function(){ // F4 키
				var tUrl = window.location.href;
				var tPort = window.location.port;
				var tHost = window.location.host;
				var tName = window.location.hostname;
				var tOrg = window.location.origin;
				var tIp = window.location.hostname;
				// console.log(tPort, tUrl , tName);
				if(tPort == "9084" || tName == "localhost" || tName == "127.0.0.1"){
					console.log(tUrl.replace(tHost,"kyobo.devtree.co.kr"));
					location.href = tUrl.replace(tHost,"kyobo.devtree.co.kr");
				}
				if(tOrg == 'http://kyobo.devtree.co.kr' || tOrg == 'http://10.27.225.22:9085'){
					location.href = tUrl.replace(tOrg,"http://localhost:9085");
				}
	
			}
		}
	},
	incCom:false,
	load:function( paramCallback ){
		if( paramCallback ){
			this.loadCallback = paramCallback;
		}
	},
	include:function(){
		var _this = this;
		var $inchtml = $("include");
		var incAmt = 0;
		if ($inchtml.length) {
			$inchtml.each(function(idx){
				var inc = $(this).attr("src");
				// console.log(inc);
				var incopt = $(this).data("include-opt");				
				var incNums = $inchtml.length ;
				$(this).load( inc ,function(response, status, xhr){
					// console.log( inc, idx+1 , incNums,  status, xhr);
					
					if( incopt ){
						console.log( inc ,  incopt );
					}
					if( incopt && incopt.visible == "true"){
						// console.log("show" , $(this));
						$(this).find(">*").show().data("visible",true);
					}
					if( incopt && incopt.visible == "false"){
						$(this).find(">*").hide().data("visible",false);
					}
					
					if( incopt && incopt.class ){
						var incObjEls = {
							".header.is-title"  :".title",
							".header.is-sch"    :".bt.sch",
							".header.is-gnb"    :".bt.gnb",
							".header.is-back"   :".bt.back",
							".header.is-close"   :".bt.close",
							".header.is-fav"   :".bt.fav",
						};
						

						var arrcls = incopt.class.replace(/ /g,"").split(",");
						// console.log(inc , arrcls);
						for (var key in arrcls) {
							var cls = arrcls[key];
							var rks = cls.replace("is-","");
							$(this).find(">*").addClass(cls);
						}
						
						for (var skey in incObjEls){
							var els = incObjEls[skey];
							// console.log(skey,"  =   ",els  , $(this).find(">*"));
							
							$(this).find(">*").find(els).hide();

							if( $(this).find(">*").is(skey) ) {
								// console.log("Ddd",els ,$(this).find(">*"));
								$(this).find(">*").find(els).show();
							}
						}
						
						console.log("1"+incopt.title);
						if(incopt.title == "logo") {
							$(".header .title .htit").html("KYOBO 교보생명");
							$(".header .title").addClass("logo");
						}
						else $(".header .title .htit").html(incopt.title);

					}

					$(this).find(">*").unwrap();
					incAmt ++;
					if( status == "success" ){
						
					}else if( status == "error"){
						_this.incCom = false ;
						console.log("include 실패" , inc );
					}						
					if( incAmt == incNums ) {
						_this.incCom = true ;
						ui.html.set.tit();
						if( typeof _this.loadCallback == "function") _this.loadCallback();
					}
				
				});
			});
		}else{
			_this.incCom = true ;
			ui.html.set.tit();
			if ( typeof _this.loadCallback == "function") _this.loadCallback();
		}
		//console.log("완료" + _this.incCom);
	}
};


$(document).ready(function(){
	ui.html.set.init();
});

