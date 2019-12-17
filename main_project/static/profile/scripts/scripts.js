
(function ($) {

    "use strict";
	
	

	// LINE PROGRESS BAR
	enableLineProgress();
	
	// RADIAL PROGRESS BAR
	enableRadialProgress();
	
	// ACCORDIAN
	panelAccordian();

	$(window).on('load', function(){
		
		// ISOTOPE PORTFOLIO WITH FILTER
		if(isExists('.portfolioContainer')){
			var $container = $('.portfolioContainer');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
		 
			$('.portfolioFilter a').click(function(){
				$('.portfolioFilter .current').removeClass('current');
				$(this).addClass('current');
		 
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				 });
				 return false;
			}); 
		}
	
	});
	
	
	$('a[href="#"]').on('click', function(event){
		return;
	});
	
	
	if ( $.isFunction($.fn.fluidbox) ) {
		$('a').fluidbox();
	}
	
	var countCounterUp = 0;
	
	var a = 0 ;
	
	countCounterUp = enableCounterUp(countCounterUp);
	
	$(window).on('scroll', function(){
		
		countCounterUp = enableCounterUp(countCounterUp);
	
	});
	
	
})(jQuery);

function panelAccordian(){
	
	var panelTitle = $('.panel-title');
	panelTitle.on('click', function(){
		$('.panel-title').removeClass('active');
		$(this).toggleClass('active');
		
	});
	
}

function enableRadialProgress(){
	
	$(".radial-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Circle(this, {
			color: '#aaa',
			strokeWidth: 3,
			trailWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			text: {
				
			},
			from: { color: '#aaa', width: 1 },
			to: { color: '#FEAE01', width: 3 },
			// Set default step function for all animate calls
			step: function(state, circle) {
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if (value === 0) {
					circle.setText('');
				} else {
					circle.setText(value);
				}

			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableLineProgress(){
	
	$(".line-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Line(this, {
			strokeWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			color: '#FEAE01',
			trailColor: '#eee',
			trailWidth: 1,
			svgStyle: {width: '100%', height: '100%'},
			text: {
				style: {
					
				},
			},
			from: {color: '#FFEA82'},
			to: {color: '#ED6A5A'},
			step: (state, bar) => {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableCounterUp(a){
	
	var counterElement;
	
	if(isExists('#counter')){ counterElement = $('#counter'); }
	else{ return; }
		
	var oTop = $('#counter').offset().top - window.innerHeight;
	if (a == 0 && $(window).scrollTop() > oTop) {
		$('.counter-value').each(function() {
			var $this = $(this),
				countDuration = $this.data('duration'),
				countTo = $this.attr('data-count');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			},{

				duration: countDuration,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}

			});
		});
		a = 1;
	}

	return a;
}

function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}


//==============================Animate navigation bar=====================
function animate_navigation_bar() {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70){
        document.getElementById('navigation-bar').style.top = '0';
        document.getElementById('heading-wrapper').style.opacity = '0.5';
        document.getElementById('heading-wrapper').style.opacity = '0.5';
    }
    else {
        document.getElementById('navigation-bar').style.top = '-72px';
        document.getElementById('heading-wrapper').style.opacity = '1';
    }
}

/*===============================Loading Bar=======================================*/
var loading_percent = 5;
var loading_bar_inc = 5;
var time_interval = 100;

function load_page() {
    $('#loading_progress').animate({width: loading_percent + '%'}, 0);

    loading_percent += loading_bar_inc;

    if (loading_percent <= 100) {
        loading_bar_inc /= 1.2;
        if ($(document).ready()){
            loading_bar_inc = 5;
            time_interval = 10;
        }
        setTimeout(load, time_interval);
    }

    else {
        start_scrolling();
        document.getElementById('loading_progress').style.display = 'none';
    }
}


// Edit Username
function edit_username(username) {
    document.getElementById('username_text').style.display = 'none';
    document.getElementById('username_input').style.display = 'inline';
    document.getElementById('username_input').focus();
    document.getElementById('username_input').select();
    document.getElementById('username_input').value = username;
    document.getElementById('username_edit').style.display = 'none';
    document.getElementById('username_edit_cancel').style.display = 'inline';
    document.getElementById('username_edit_confirm').style.display = 'inline';
}

function cancel_editing_username() {
    document.getElementById('username_text').style.display = 'inline';
    document.getElementById('username_input').style.display = 'none';
    document.getElementById('username_edit').style.display = 'inline';
    document.getElementById('username_edit_cancel').style.display = 'none';
    document.getElementById('username_edit_confirm').style.display = 'none';
}


// Google Maps

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geo location service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('google_map_profile'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10,
    });

    // Try HTML5 geolocation.
    var pos = {
        lat: 13.5576742,
        lng: 80.0255356,
    };

    document.getElementById('lat_lng').innerHTML = '<b>Lattitude:</b> <input id="lat" value="' + pos['lat'] + '" readonly>' +
        '<span style = "margin-left: 10%"><b>Longitude:</b> <input id="lng" value="' + pos['lng'] + '" readonly>'
        + '</span>';

    document.getElementById('co-ordinates').value = pos['lat'] + ', ' +pos['lng'];

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon:'{% static "images/pin.png" %}',
        animation:google.maps.Animation.BOUNCE,
    });
    map.setCenter(pos);

    // Apply new JSON when the user selects a different style.
    styleSelector.addEventListener('change', function() {
        map.setOptions({styles: styles[styleSelector.value]});
    });
}
