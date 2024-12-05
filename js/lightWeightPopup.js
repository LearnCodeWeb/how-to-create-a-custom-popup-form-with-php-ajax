/**
** Author: ZAID BIN KHALID
** Website: https://learncodeweb.com
** Version: 0.1
**/

function closeDilog(action, callback) {
	if (action === "inline") {
		var inlineData = $('#lwpBody').html();
		setTimeout(function () {
			$('body').find('.lwp-inline').html(inlineData);
			$('body').removeClass('lwp-hidden');
		}, 100);
	}
	$('.lwp').remove();
	$('.lwp-overlay').remove();
	if (callback && typeof callback === "function") {
		callback();
	}
}

(function ($) {
	$.fn.lightWeightPopup = function (options) {
		$(this).on("click", function () {
			openPopup($(this), options);
		});
	};

	function openPopup(trigger, options) {
		var dset = trigger.data();
		$("body").find('.lwp').remove();

		var settings = {
			href: dset.href || '',
			width: dset.width || '',
			height: dset.height || '',
			maxWidth: dset.maxWidth || '',
			maxHeight: dset.maxHeight || '',
			title: dset.title || 'Model',
			overlay: dset.overlay || false,
			modelFixed: dset.modelFixed || false
		};

		var windowHeight = window.innerHeight - 160;

		// Extend settings with options passed to the plugin
		settings = $.extend({}, settings, options);

		// Prepare styles for popup
		var styles = generatePopupStyles(settings, windowHeight);

		// Append popup and overlay
		$("body").append(generatePopupMarkup(settings, styles));

		// Handle overlay click
		if (settings.overlay) {
			$('.lwp-overlay').on('click', function () {
				closeDilog(dset.content, options.closeComplete);
			});
			// Prevent closing when clicking inside the `.lwp` content area
			$('.lwp').on('click', function (event) {
				event.stopPropagation(); // Prevent the click event from reaching the overlay
			});
		}

		// Bind close button event
		$('.lwp .close').on('click', function () {
			closeDilog(dset.content, options.closeComplete);
		});

		// Trigger beforeOpen callback
		if (options.beforeOpen && typeof options.beforeOpen === 'function') {
			options.beforeOpen();
		}

		// Trigger openComplete after the popup is appended
		if (options.openComplete && typeof options.openComplete === 'function') {
			setTimeout(options.openComplete, 500); // Ensuring it's called after popup opens
		}

		// Load content based on type
		loadPopupContent(dset.content, settings);
	}

	function generatePopupStyles(settings, windowHeight) {
		var styles = {
			width: settings.width ? 'width:' + settings.width + ';' : '',
			height: settings.height ? 'height:' + settings.height + ';' : '',
			maxWidth: settings.maxWidth ? 'max-width:' + settings.maxWidth + ';' : '',
			maxHeight: settings.maxHeight ? 'max-height:' + settings.maxHeight + ';' : '',
			modelFixed: settings.modelFixed === 'fixed' ? 'style="height:' + windowHeight + 'px"' : ''
		};
		return styles;
	}

	function generatePopupMarkup(settings, styles) {
		return '<div class="lwp-overlay">' +
			'<div class="lwp" tabindex="-1" role="dialog" style="' + styles.width + ' ' + styles.height + ' ' + styles.maxWidth + ' ' + styles.maxHeight + '">' +
			'<div id="lwp" style="' + styles.width + ' ' + styles.height + ' ' + styles.maxWidth + ' ' + styles.maxHeight + '">' +
			'<div id="lwpHead">' +
			'<div class="title">' + settings.title + '</div>' +
			'<div class="close"><span>&times;</span></div>' +
			'</div>' +
			'<div id="lwpBody" role="document" ' + styles.modelFixed + '>' +
			'<div class="loading"><img src="https://cdn.jsdelivr.net/gh/LearnCodeWeb/lightWeightPopup@v-0.1/image/loader.gif"><p class="text">Please Wait..!</p></div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';
	}

	function loadPopupContent(contentType, settings) {
		var $popupBody = $('#lwpBody');

		if (contentType === 'ajax') {
			$.ajax({
				method: "POST",
				url: settings.href,
				success: function (data) {
					if (data) {
						setTimeout(function () { $popupBody.html(data); }, 1000);
					}
				}
			});
		}

		if (contentType === 'iframe') {
			var lwpHead = parseInt($('#lwpHead').innerHeight());
			var lwp = parseInt($('#lwp').innerHeight());
			var bh = lwp - lwpHead;
			setTimeout(function () {
				$popupBody.html('<iframe frameborder="0" class="lwpIframe" style="height:' + bh + 'px; width:100%;" src="' + settings.href + '"></iframe>');
			}, 1000);
		}

		if (contentType === 'inline') {
			var data = $('body').find('.lwp-inline').html();
			if (data) {
				setTimeout(function () {
					$popupBody.html(data);
				}, 1000);
			}
			$('body').find('.lwp-inline').html('');
		}
	}

})(jQuery);
