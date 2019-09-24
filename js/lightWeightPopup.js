/**
** Author: ZAID BIN KHALID
** Website: https://learncodeweb.com
** Version: 0.1
**/


(function($){
	$(document).on("click","#lightWeightPopupHead",function(){ $('.lightWeightPopup').remove(); });
	$.fn.lightWeightPopup = function(options) {
		
		$(this).on("click",function(){		
			w	=	h	=	u	=	mw	=	mh	=	'';
			var attrData	=	$(this).data();
			if(attrData.width!="" && !typeof attrData.width === "undefined"){	w	=	attrData.width;}
			if(attrData.height!="" && !typeof attrData.height === "undefined"){	h	=	attrData.height;}
			if(attrData.href!="" && !typeof attrData.href === "undefined"){u	=	attrData.href;}
			if(attrData.maxWidth!="" && !typeof attrData.maxWidth === "undefined"){mw	=	attrData.maxWidth;}
			if(attrData.maxHeight!="" && !typeof attrData.maxHeight === "undefined"){mh	=	attrData.maxHeight;}
			var settings	=	$.extend({
				href			:	u, //Ajax url
				width			:	w, //Container width
				height			:	h, //Container height
				maxWidth		:	mw, //Container title
				maxHeight		:	mh, //Container close text/icon
			},options);
			
			console.log(settings);
			
			$("body").prepend('<div class="lightWeightPopup"><div id="lightWeightPopup" style="width:'+settings.width+'; height:'+settings.height+'; max-width:'+settings.maxWidth+'; max-height:'+settings.maxHeight+'"><div id="lightWeightPopupHead"><span>&otimes;</span></div><div id="lightWeightPopupBody"><div class="loading"><img src="image/loader.gif"><p class="text">Please Wait..!</p></div></div></div></div>');
			if(attrData.content=='ajax'){
				$.ajax({
					method	:	"POST",
					url		:	settings.href,
					success	:	function(data){
						if(data!=""){
							setTimeout(function(){$('#lightWeightPopupBody').html(data);},1000);
						}else{
							alert('No data found!');
						}
					}
				});
			}
		});
					
	};
}(jQuery));
