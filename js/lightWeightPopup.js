/**
** Author: ZAID BIN KHALID
** Website: https://learncodeweb.com
** Version: 0.1
**/


(function($){
	$(document).on("click",".close",function(){ $('.lightWeightPopup').remove(); $('body').removeAttr('style'); });
	$.fn.lightWeightPopup = function(options) {
		
		$(this).on("click",function(){	
			$("body").find('.lightWeightPopup').remove();
			w	=	h	=	u	=	mw	=	mh	=	t	=	'';

			var attrData	=	$(this).data();
			
			if(attrData.width!="" && typeof attrData.width !== "undefined"){	w	=	attrData.width;}
			if(attrData.height!="" && typeof attrData.height !== "undefined"){	h	=	attrData.height;}
			if(attrData.href!="" && typeof attrData.href !== "undefined"){u	=	attrData.href;}
			if(attrData.maxWidth!="" && typeof attrData.maxWidth !== "undefined"){mw	=	attrData.maxWidth;}
			if(attrData.maxHeight!="" && typeof attrData.maxHeight !== "undefined"){mh	=	attrData.maxHeight;}
			if(attrData.title!="" && typeof attrData.title !== "undefined"){t	=	attrData.title;}else{t	=	'Model';}

			console.log(u);

			var settings	=	$.extend({
				href			:	u, //Ajax url
				width			:	w, //Container width
				height			:	h, //Container height
				maxWidth		:	mw, //Container title
				maxHeight		:	mh, //Container close text/icon
				title			:	t, //Model Title
			},options);

			console.log(settings);

			$("body").append('<div class="lightWeightPopup"><div id="lightWeightPopup" tabindex="-1" role="dialog" style="width:'+settings.width+'; height:'+settings.height+'; max-width:'+settings.maxWidth+'; max-height:'+settings.maxHeight+'"><div id="lightWeightPopupHead"><div class="title">'+settings.title+'</div><div class="close"><span>&times;</span></div></div><div id="lightWeightPopupBody" role="document"><div class="loading"><img src="image/loader.gif"><p class="text">Please Wait..!</p></div></div></div></div>');
			$('body').css('overflow','hidden');
			if(attrData.content=='ajax'){
				$.ajax({
					method	:	"POST",
					url		:	settings.href,
					success	:	function(data){
						if(data!=""){
							setTimeout(function(){$('#lightWeightPopupBody').html(data);},1000);
						}
					}
				});
			}
			
			if(attrData.content=='inline'){
				var data	=	$('body').find('.inline').html();
				if(data!=""){
					setTimeout(function(){$('#lightWeightPopupBody').html(data);},1000);
				}
			}
		});
					
	};
}(jQuery));