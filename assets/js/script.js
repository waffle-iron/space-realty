$(document).ready(function() {

	//Initializing Semantic UI Components
	$('.dropdown').dropdown();
	$('.ui.checkbox').checkbox();
	$('.ui.radio.checkbox').checkbox();

	//Smooth-scrolling Hash Links
	$('a').on('click', function(event) {
		if (this.hash !== '') {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 600, function() {
				window.location.hash = hash;
			})
		}
	});

	//Scale Video Header
	scaleVideoContainer();
	initBannerVideoSize('.video-container .filter');
	initBannerVideoSize('.video-container video');

	$(window).on('resize', function() {
		scaleVideoContainer();
		scaleBannerVideoSize('.video-container .poster img');
		scaleBannerVideoSize('.video-container .filter');
		scaleBannerVideoSize('.video-container video');
	});

	//Set Background Audio Volume
	$('audio').prop('volume', 0.02);

});

//Video Header Functions
function scaleVideoContainer() {
	var height = $(window).height() + 5;
	var unitHeight = parseInt(height) + 'px';
	$('.homepage-hero-module').css('height', unitHeight);
}

function initBannerVideoSize(element) {
	$(element).each(function() {
		$(this).data('height', $(this).height());
		$(this).data('width', $(this).width());
	});
	scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element) {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height() + 5,
		videoWidth,
		videoHeight;

	$(element).each(function() {
		var videoAspectRatio = $(this).data('height') / $(this).data('width');
		$(this).width(windowWidth);

		if (windowWidth < 1000) {
			videoHeight = windowHeight;
			videoWidth = videoHeight / videoAspectRatio;
			$(this).css({
				'margin-top': 0,
				'margin-left': -(videoWidth - windowWidth) / 2 + 'px'
			});

			$(this).width(videoWidth).height(videoHeight);
		}

		$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

	});
}

//Calculator Function
function updateForm() {
	var form = $('form').form('get values'),
		total = 0;

	for (var key in form) {
		if (key === 'bedroom') {
			switch (form[key]) {
				case '1': total += 1.0; break;
				case '2': total += 2.5; break;
				case '3': total += 3.7; break;
				case '4': total += 6.2; break;
				case '5': total += 7.8; break;
				case '6': total += 9.2; break;
			}
		}
		if (key === 'bathroom') {
			switch (form[key]) {
				case '1': total += 0.5; break;
				case '2': total += 0.8; break;
				case '3': total += 1.2; break;
				case '4': total += 3.8; break;
				case '5': total += 5.5; break;
				case '6': total += 6.2; break;
			}
		}
		if (key === 'squarefootage') {
			switch (form[key]) {
				case '1000': total += 10.2; break;
				case '2000': total += 15.3; break;
				case '3000': total += 22.4; break;
				case '4000': total += 35.3; break;
				case '5000': total += 51.2; break;
				case '6000': total += 66.2; break;
			}
		}
		if (key === 'lottype') {
			switch (form[key]) {
				case 'basic': total += 5.2; break;
				case 'premium': total += 12.1; break;
				case 'luxurious': total += 18.6; break;
				case 'historic': total += 50.4; break;
				case 'custom': total += 30.5; break;
			}
		}
		if (key === 'acreage') {
			switch (form[key]) {
				case '1': total += 10.0; break;
				case '2': total += 20.0; break;
				case '3': total += 30.0; break;
				case '4': total += 40.0; break;
				case '5': total += 50.0; break;
				case '6': total += 60.0; break;
			}
		}
		if (form[key] === 'on') {
			switch (key) {
				case 'oven': total += 5.0; break;
				case 'floor': total += 7.2; break;
				case 'security': total += 12.3; break;
				case 'gym': total += 8.9; break;
				case 'wifi': total += 1.5; break;
				case 'pool': total += 17.9; break;
				case 'garage': total += 3.4; break;
				case 'pad': total += 20.4; break;
				case 'shield': total += 33.2; break;
				case 'garden': total += 0.8; break;
			}
		}
	}
	total = Math.floor(total * 10e6);
	total = total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

	$('#total h3').text("Estimated Price $" + total).transition('pulse');
}

function clearForm() {
	$('form').form('clear');
	$('#total h3').text("Estimated Price $0");
	$('#total h3').transition('pulse');
}
