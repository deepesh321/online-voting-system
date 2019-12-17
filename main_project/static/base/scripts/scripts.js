function menu_bar_on() {
    document.getElementById("menu_bar").style.display = "block";
    document.getElementById("profile").style.display = "block";
    document.getElementById("page_overlay_2").style.display = "block";
}

function menu_bar_off() {
    document.getElementById("menu_bar").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("page_overlay_2").style.display = "none";
}

function animate_navbar_back() {
    if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
        document.getElementById("nav_bar").style.backgroundColor = '#008B8B';
        document.getElementById("nav_bar").style.borderBottom = 'none';
    } else {
        document.getElementById("nav_bar").style.background = 'transparent';
        document.getElementById("nav_bar").style.borderBottom = '0.5px solid dimgray';
    }
}

/*======================================Back to top function =============================*/
function scrollFunction() {
    if (document.body.scrollTop > 65 || document.documentElement.scrollTop > 65) {
        document.getElementById("back_to_top").style.display = "block";
    } else {
        document.getElementById("back_to_top").style.display = "none";
    }
}

function scrolltopFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/*=====================================Google map===========================================*/

function stop_scrolling() {
    document.body.style.overflow = 'hidden';
}

function start_scrolling() {
    $("body").css({overflow: 'visible'});
}


/*====================================Copy to clipboard===================================*/

function copy_to_clipboard() {
    if (document.getElementById('copy_to_clipboard_btn').innerText == 'Copy to clipboard') {
        var copyText = document.getElementById("co-ords");
        copyText.select();
        document.execCommand("copy");
        document.getElementById('copy_to_clipboard').innerText = 'assignment_turned_in';
        document.getElementById('copy_to_clipboard_btn').innerText = 'copied';
        alert("Copied the text: " + copyText.value + '\n\n' + 'Paste the co-ords in google maps search bar to get the route from your place');
        setTimeout(change_icon_to_normal, 5000);
    }
}

function change_icon_to_normal() {
    document.getElementById('copy_to_clipboard').innerText = 'file_copy';
    document.getElementById('copy_to_clipboard_btn').innerText = 'Copy to clipboard';
}

/*========================================================================================*/
/*function display_evoting_txt() {
    document.getElementById("evoting").style.display = "block";
}

function remove_evoting_txt() {
    document.getElementById("evoting").style.display = "none";
}
*/
/*function user_profile_animation_in() {
    document.getElementById("profile").style.opacity = "1";
}

function user_profile_animation_out() {
    document.getElementById("profile").style.opacity = "0.8";
}*/

/*===============================Loading Bar=======================================*/
var loading_percent = 5;
var loading_bar_inc = 5;
var time_interval = 100;

function load() {
    $('#loading').animate({width: loading_percent + '%'}, 0);
    $('#loading_home').animate({width: loading_percent + '%'}, 0);
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
        document.getElementById('loading').style.display = 'none';
        document.getElementById('loading_home').style.display = 'none';
        document.getElementById('scrolldown').style.display = 'block';
        document.getElementById('loading_row').style.maxWidth = '70%';
        document.getElementById('loading_row').style.left = '16.5%';
        document.getElementById('landing').style.background = 'rgba(0, 0, 0, 0.5)';
    }
}


/*=================================Menu Bar===================*/
$(function () {
    $(".menu_bar_disp").click(function () {
        $(".menu_bar").animate({left: '0'});
        $(".menu_bar").css({boxShadow: '0 0 30px 0 rgba(0, 0, 0, 1)'});
        $("#page_overlay_2").css({display: 'block'});
        document.getElementById("menu_bar_display_close").style.visibility = 'visible';
        $(".menu_bar_disp_close").animate({left: '25%'});
        $("#menu_bar_open_close").html('&#10096;');
        stop_scrolling()
    });
});

$(function(){
    $(".menu_bar_disp_close").click(function(){
        $(".menu_bar").animate({left: '-25%'});
        $(".menu_bar").css({boxShadow: 'none'});
        $("#page_overlay_2").css({display: 'none'});
        document.getElementById("menu_bar_display_close").style.visibility = 'hidden';
        $(".menu_bar_disp_close").animate({left: '0'});
        $("#menu_bar_open_close").html('&#10097;');
        start_scrolling()
    });
});

$(function(){
    $(".menu_bar_cancel").click(function(){
        $(".menu_bar").animate({left: '-25%'});
        $(".menu_bar").css({boxShadow: 'none'});
        $("#page_overlay_2").css({display: 'none'});
        document.getElementById("menu_bar_display_close").style.visibility = 'hidden';
        $(".menu_bar_disp_close").animate({left: '0'});
        $("#menu_bar_open_close").html('&#10097;');
        start_scrolling()
    });
});


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geo location service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('google_map'), {
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

    document.getElementById('co-ords').value = pos['lat'] + ', ' +pos['lng'];

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
