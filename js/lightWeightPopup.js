/**
** Author: ZAID BIN KHALID
** Website: https://learncodeweb.com
** Version: 0.1
**/

function closeDilog(action){
	if(action=="inline"){ 
		var inlineData	=	$('#lwpBody').html();
		setTimeout(function(){ $('body').find('.lwp-inline').html(inlineData);},100);
	}
	$('.lwp').remove();
}

(function($){
	$.fn.lightWeightPopup = function(options) {
		var dset	=	{};
		
		$(this).on("click",function(){
			
			$("body").find('.lwp').remove();
			w	=	h	=	u	=	mw	=	mh	=	t	=	'';
			
			var dset	=	$(this).data();
			
			if(dset.width!="" && typeof dset.width !== "undefined"){	w	=	dset.width;}
			if(dset.height!="" && typeof dset.height !== "undefined"){	h	=	dset.height;}
			if(dset.href!="" && typeof dset.href !== "undefined"){u	=	dset.href;}
			if(dset.maxWidth!="" && typeof dset.maxWidth !== "undefined"){mw	=	dset.maxWidth;}
			if(dset.maxHeight!="" && typeof dset.maxHeight !== "undefined"){mh	=	dset.maxHeight;}
			if(dset.title!="" && typeof dset.title !== "undefined"){t	=	dset.title;}else{t	=	'Model';}

			var settings	=	$.extend({
				href			:	u, //Ajax url
				width			:	w, //Container width
				height			:	h, //Container height
				maxWidth		:	mw, //Container title
				maxHeight		:	mh, //Container close text/icon
				title			:	t, //Model Title
			},options);

			$("body").append('<div class="lwp"><div id="lwp" tabindex="-1" role="dialog" style="width:'+settings.width+'; height:'+settings.height+'; max-width:'+settings.maxWidth+'; max-height:'+settings.maxHeight+'"><div id="lwpHead"><div class="title">'+settings.title+'</div><div class="close" onclick="closeDilog(\''+dset.content+'\')"><span>&times;</span></div></div><div id="lwpBody" role="document"><div class="loading"><img src="image/loader.gif"><p class="text">Please Wait..!</p></div></div></div></div>');
			
			$('body').addClass('lwp-hidden');
			if(dset.content=='ajax'){
				$.ajax({
					method	:	"POST",
					url		:	settings.href,
					success	:	function(data){
						if(data!=""){
							setTimeout(function(){$('#lwpBody').html(data);},1000);
						}
					}
				});
			}
			
			if(dset.content=='iframe'){
				nH	=	$('#lwpBody').height()-50;
				setTimeout(function(){ $('#lwpBody').html('<iframe frameborder="0" style="height:'+nH+'px;" allowfullscreen class="lwpIframe" src="'+settings.href+'"></iframe>');},1000);
			}
			
			if(dset.content=='inline'){
				var data	=	$('body').find('.lwp-inline').html();
				if(data!=""){
					setTimeout(function(){$('#lwpBody').html(data);},1000);
				}
				$('body').find('.lwp-inline').html('');
			}
			
		});
		
	};
}(jQuery));