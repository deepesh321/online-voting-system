$(document).ready(function(){
    $("#username").focus(function(){
        $("#username_txt").animate({
            opacity: '0'
        });
    });

});