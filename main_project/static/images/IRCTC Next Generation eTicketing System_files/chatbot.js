$(document).ready(function(){

    function getBrowserName(){
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    
        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
    
        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    
        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
    
        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
    
        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;
    
        if(isChrome)
        {
          return "Google Chrome";
        }

        if(isFirefox)
        {
          return "Firefox";
        }

        if(isSafari)
        {
          return "Safari";
        }

        if(isIE)
        {
          return "Internet Explorer";
        }
        
        if(isEdge)
        {
          return "Edge";
        }
    }
    window.addEventListener('message', function(event) {

        if(event.data.message === "removeDishaIcon" ){
            gtag('event', 'click', {
                'event_category': 'button',
                'event_label': 'DishIcon Removed'
            });
            console.log("iconremoved");
        }
        if(event.data.message === "minimizeDishaIcon" ){
            gtag('event', 'click', {
                'event_category': 'button',
                'event_label': 'DishIcon Minimized'
            });
            console.log("icon hidden");
        }
        
    });

   // $("#guestPhone").intlTelInput();
   window.addEventListener('message', function(event) { 
  
    // IMPORTANT: Check the origin of the data! 
    if (~event.origin.indexOf('https://assistant.corover.mobi')) { 
        if(event.data.message === "closeWindow" ){
          closeChatWindow();
        }
        if(event.data.message === "resizeFrame" ){
          resizeFrame(525);
        }
    } else { 
        return; 
    } 
  }); 

   //console.log(window.parent.postMessage({message: 'removeDishaIcon'}, '*'));

   $(".hidebot").on("click",function(){
       window.parent.postMessage({message: 'closeWindow'}, '*');
       //parent.closeChatWindow();
   });

    function get_clean_alphanum_string($string){
       //return $string.replace(/[^\w\s]/gi, '');
       return $string.replace(/[<>]/g, '');
    }

    function nextStep(step,ad){
        $(".stepWrap").hide();
        $(step).show();
        $(".advwrp").removeClass("active");
        $(ad).addClass("active");
    }
   
    
    $("#submitQuery-noac button").click(function(){
        var queryInput = $("#queryInput").val();        
        var sanitizedInput = get_clean_alphanum_string(queryInput);
        $("#queryInput").val(sanitizedInput);
        if(queryInput === ""){
            $("#queryInput").addClass("hasError");
        }else{
            $("#queryInput").removeClass("hasError");
            $("#submitQuery-noac").hide();
            //if(parent.location.href.split("/").indexOf("demo") > 0){
                window.parent.postMessage({message: 'resizeFrame'}, '*');
                //parent.resizeFrame(515);
            // }
            
             $("#cb-step-two_b").show();
             $(".advwrp").removeClass("active");
             $(".adwrap-b").addClass("active");
        }
    });

    //default step to be active
    nextStep("#cb-step-three",".adwrap-b");
    //Query submit action
    var queryResults;

    var setUserRecordAPI = "/botAPI/userAuth/"; 
    //var setUserRecordAPI = "/botAPI/SetUserRecord/";    
    var setUserRecordBody = {
        "username": "",
        "country_code": "",
        "phone_number": "",
        "query": "",
        "app_name": "browser",
        "partner": "irctc",
        "channel": "train",
        "location": "",
        "ip_address": "",
        "language": "en",
        "os": "",
        "browser": "",
        "device_token":""
    };
    var setQuestionRecordAPI = "/botAPI/getAnswer/";
   // var setQuestionRecordAPI = "/api/botAPI/getAnswer/";
    var setQuestionRecordBody = {
        "query": "",
        "app_name": "browser",
        "partner": "irctc",
        "channel": "train",
        "selected_question":"",
        "browser": ""
    }; 
    var getQuestionHitAPI = "/getQuestionHit/";
    var getQuestionHitBody = {
        "session_id":"",
        "question_id":"",
        "selected_question":""
    };   
    
    if(location.search !== "" && location.search.split("=")[1]==="mobileApp"){
        setQuestionRecordBody.app_name = "android";
    }

    //send non of the above index
    function noneOfTheAbove(queryData, botAPI){
        //toggleAnswer('.answerViewWrap','.adwrap-c');
        $.ajax({            
            url: botAPI,
            method: "POST",
            data:JSON.stringify(queryData),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authkey', '9a12ab538-9ffe-49a5-7124-bc7d61123f4ab');
                xhr.setRequestHeader('content-type', 'application/json');
            }
          })
          .done(function( data ) {
            //nextStep("#cb-step-four",".adwrap-c");            
        });
    }
    //getQueryAnswer
    function getAnswer(queryData,apiURL){
        $(".wrapper").addClass('innerpage');
        refreshAd();
        $(".apierror").hide();
        $.ajax({            
            url: apiURL,
            method: "POST",
            data:JSON.stringify(queryData),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authkey', '9a12ab538-9ffe-49a5-7124-bc7d61123f4ab');
                xhr.setRequestHeader('content-type', 'application/json');
                $("#loadingGif").show();
            }
          })
          .done(function(data,xhr) {
            selectedQuestion = $("#queryInput2").val();                
            $(".query-results").show();
            $("#loadingGif,#feedbacdialog").hide();
            queryResults = data;
            nextStep("#cb-step-three",".adwrap-b");
            setQuestionRecordBody.session_id = data.session_id;
            getQuestionHitBody.session_id = data.session_id;
            getQuestionHitBody.question_id = data.question_id;
            if(queryResults){
               if(queryResults.questions[0] === queryData.query){
                $(".answerViewWrap-found,#feedback").show();
                $(".answerViewWrap-found .selected-query-item").html(queryResults.questions[0]);
                $(".answerViewWrap-found p.answer").html(queryResults.answers[0]);
                $('#status451,#status404,.resultQueryWrap.qaWrap,.no-q-results,.answerViewWrap.qaWrap').hide();                
               }else{
                $("#status451,#status404,#feedback, #loadingGif,.answerViewWrap-found").hide();
                $('.resultQueryWrap.qaWrap').show();
                showResult(queryResults);
               }                                           
            }else{
               
            }
        })
        .fail(function(xhr) {
            switch(xhr.status) {
                case 404:
                    $("#status451, #loadingGif,#feedback, .answerViewWrap-found,.resultQueryWrap.qaWrap,.answerViewWrap.qaWrap").hide();
                    $("#status404").show();
                    $("#status404 .message").html(xhr.responseJSON.message);
                    break;
                case 451: 
                    $("#status404, #loadingGif,#feedback,.answerViewWrap-found,.resultQueryWrap.qaWrap,.answerViewWrap.qaWrap").hide();
                    $("#status451").show();
                    $("#status451 .message").html(xhr.responseJSON.message);
                    break;
                default:
                    $("#status404,#feedback, #loadingGif,.answerViewWrap-found").hide();
                    $(".apierror").show().delay(3000).fadeOut('fast');
            }            
        });
    }
    
    function showResult(queryResults){
        $("#failedMessage").hide();
        $("#nomatchingresults").hide();
        if(!queryResults.questions){
            $("#nomatchingresults").show();
            $("#nomatchingresults .message").html('rajeev');
            $("#resultsoptiontitle, .cb-query-types").hide();
        }else if(queryResults.errno){
            $("#failedMessage").show();
        }else if(queryResults.questions){
            $('.resultQueryWrap.qaWrap,.no-q-results').hide();
            $("#nomatchingresults").hide();
            $("#resultsoptiontitle,.cb-query-types").show();
            toggleAnswer('.resultQueryWrap','.adwrap-b');
            //queryResults.Answer.push('You can reach us at <a href="mailto:care@irctc.co.in">care@irctc.co.in</a>. Do contact us at 24/7 Hrs. Customer support at 011-39340000');
            $(".cb-query-types li").remove();
            $.each( queryResults.questions, function( key, val ) {
                 var index = key;
                 $(".cb-query-types").append('<li index="'+index+'"><span class="left"><em class="glyphicon glyphicon-play-circle"></em></span><span class="right">'+val+'</span></li>')
                 
            });            
        }
    }

    $("#queryInput2").keypress(function (e) {
        if(e.which == 13) {
            $("#submitQuery2").click();
            e.preventDefault();
        }
        window.parent.postMessage({message: 'queryInput'}, '*');
    });

    //validate input fields
    var isValidInput = false;
    var isValid = function(){
        $(".required").each(function(){
            var type = $(this).attr("for");
            switch (type) {
                case "textarea":
                    if($(this).val().length < 1){
                        $(this).addClass("errorMsg");
                        $(".validation-message", $(this).parent()).show();
                        $(this).focus();
                        isValidInput = false;
                        return false;
                    }else{
                        $(this).removeClass("errorMsg");
                        $(".validation-message", $(this).parent()).hide();
                    }
                     break;
                case "text":
                    if($(this).val().length < 1){
                        $(this).addClass("errorMsg");
                        $(".validation-message", $(this).parent()).show();
                        $(this).focus();
                        isValidInput = false;
                        return false;
                    }else{
                        $(this).removeClass("errorMsg");
                        $(".validation-message", $(this).parent()).hide();
                    }
                    break;    
                case "number":
                    if($(this).val().length < 10){
                        $($(this).parent()).addClass("errorMsg");
                        $(".validation-message", $(this).parent().parent()).show();
                        $(this).focus();
                        isValidInput = false;
                        return false;
                    }else{
                        $($(this).parent()).removeClass("errorMsg");
                        $(".validation-message", $(this).parent().parent()).hide();
                    }
                    break; 
                case "countrycode":                    
                    var c_code = $(this).val();
                    if($(this).val().length < 1){
                        $($(this).parent()).addClass("errorMsg");
                        $(".validation-message", $(this).parent().parent()).show();
                        $(this).focus();
                        isValidInput = false;
                        return false;
                    }else{
                        $($(this).parent()).removeClass("errorMsg");
                        $(".validation-message", $(this).parent().parent()).hide();
                    }
                    break;        
                case "checkbox":
                    if($("input[id='cb-tc']:checked").val() !== "on"){
                        $(".validation-message", $(this).parent()).show();
                        $(this).focus();
                        isValidInput = false;
                        return false;
                    }else{
                        $(".validation-message", $(this).parent()).hide();
                    }
                    break;
                default:
                    $(".validation-message", $(this).parent()).hide();
                    isValidInput = true;
                    return true;                    
            }
        });
   }
   //validate input fields ends

    $("#submitQuery").click(function(){        
        //ga('send','event','button','click'); //Update GA on every query hit
        gtag('event', 'click', {
            'event_category': 'button',
            'event_label': 'Questions Asked'
        });

        var queryInput = $("#queryInput").val();        
        $("#queryInput").val(get_clean_alphanum_string(queryInput));
        queryInput = $("#queryInput").val();  
         var browserName = getBrowserName();
        //set input values to query object
        setQuestionRecordBody.query = queryInput;
        setUserRecordBody.query = queryInput;
        setUserRecordBody.browser = browserName;
        isValid();
        if(isValidInput){
            window.parent.postMessage({message: 'resizeFrame'}, '*');
            //getAnswer(setUserRecordBody,setUserRecordAPI);
            getAnswer(setQuestionRecordBody,setQuestionRecordAPI);
        }    
    });
    var selectedQuestion = "";
    $("#submitQuery2").click(function(){ 
        $(".feedbackiconwrap a").removeClass("active");
        $(".feedbackiconwrap").removeClass("liked");
       // ga('send','event','button','click'); //Update GA on every query hit   
       gtag('event', 'click', {
            'event_category': 'button',
            'event_label': 'Questions Asked'
        });
        var queryInput = $("#queryInput2").val();     
        if(queryInput === ""){
            $("#queryInput2").addClass("errorMsg");
            $("#queryInput2").focus();
        }else{
            $("#queryInput2").removeClass("errorMsg");
            $("#queryInput2").trigger('blur');                    
            $("#queryInput2").val(get_clean_alphanum_string(queryInput));
            queryInput = $("#queryInput2").val(); 
            setQuestionRecordBody.query = queryInput;
            setQuestionRecordBody.selected_question = "";
            getAnswer(setQuestionRecordBody,setQuestionRecordAPI);
        }
    });


    $( "ul.cb-query-types" ).on( "click", "li", function() {
        refreshAd();
        $(".feedbackiconwrap a").removeClass("active");
        $(".feedbackiconwrap").removeClass("liked");
        $("#cb-step-four").addClass("active");
        var curIndex = $(this).attr('index');
        $('.selected-query-item').html(queryResults.questions[curIndex]);
        $('.query-answer').html(queryResults.answers[curIndex]);
        $(".query-answer").linkify();
        if(curIndex === "2"){
            setQuestionRecordBody.selected_question = "3";
			toggleAnswer('.answerViewWrap','.adwrap-c');
            gtag('event', 'click', {
                'event_category': 'button',
                'event_label': 'NOTA'
            });
            noneOfTheAbove(setQuestionRecordBody,setQuestionRecordAPI);
        }else{
         // nextStep("#cb-step-four",".adwrap-c");    
         toggleAnswer('.answerViewWrap','.adwrap-c');        
        }  
        $("#feedback").show();      
    });
    
    $("#cb-step-three .query-none").click(function(){
       // nextStep("#cb-step-five",".adwrap-c");
    });

    $("a.back").click(function(){
        refreshAd();
        toggleAnswer('.resultQueryWrap','.adwrap-b');
        $("#loadingGif,#feedback,#feedbacdialog").hide();
    });

    function toggleAnswer(curItem,ad){
        $(".qaWrap").hide();
        $(curItem).show();
        $(".advwrp").removeClass("active");
        $(ad).addClass("active");
    }

    $(document).keyup(function (e) {
        if(e.which == 8 && $("#cb-step-four").hasClass("active")) {
            $("#cb-step-four").removeClass("active");
            nextStep("#cb-step-three",".adwrap-b");
        }
    });


    $(".logo_chatbot").click(function(){
        window.parent.postMessage({message: 'closeWindow'}, '*');
    });
    $(".reset-query").click(function(){
        nextStep("#cb-step-two");
    });

    $("#tncLink").click(function(){
        $("#term_wrap").show();
    });

    $("#privacyLink").click(function(){
        $("#privacy_wrap").show();
        $("#privacy_wrap").linkify();
    });
 
    function submitQuery(){
        $("#submitQuery2").click();
    }
//############################
    //var apiurl = "res/data/faq-irctc.json";
    var productNames = new Array();
    var getQuestionAPI = "/botAPI/getQuestions/irctc/train";
    $.ajax({            
        url: getQuestionAPI,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('authkey', '9a12ab538-9ffe-49a5-7124-bc7d61123f4ab');
            xhr.setRequestHeader('content-type', 'application/json');
        }
    })
    .done(function( jsonData ) {
        $.each( jsonData, function ( index, product ){
            productNames.push( product );
        });
        $('#queryInput2').typeahead( {
            autoSelect:false, 
            source: productNames,
            onSelect: submitQuery
        });
    })
    .fail(function() {
        console.log("Something went wrong.");
    });  
    $('#queryInput2').on('typeahead:selected', function(evt, item) {
        console.log("ehlp");
    })
//############################
/* Feedback */
var feedbackApi = "/botAPI/feedback";
var feedbackApiBody = {
	"feedback": "GOOD",
	"query" : "",
	"partner": "irctc",
	"message": "awesome",
    "channel": "train",
    "source":'browser'
};

$(".feedbackiconwrap a").click(function(){
    if($(".feedbackiconwrap a.active").length >0){        
        $("#feedbackmessage").removeClass("errorMsg"); 
    }
    else{
        $(".feedbackiconwrap a").removeClass("active");  
         $(this).addClass('active');
         switch($(this).attr('id')) {
            case "fb-verybad":
               feedbackApiBody.query = $("#queryInput2").val();
               feedbackApiBody.feedback = "VERY_BAD";               
               feedbackApiBody.message = "Very Bad";
               $("#feedbackmessage").removeClass('errorMsg');
               $("#fb-others-form").hide();
               $("#feedbacdialog").fadeIn();
               document.getElementById("feedbacdialog").reset();
               gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'Need Improvement'
                });
                refreshAd();
                break;
            case "fb-bad":
               feedbackApiBody.query = $("#queryInput2").val();
               feedbackApiBody.feedback = "BAD";               
               feedbackApiBody.message = "Bad";
               $("#feedbackmessage").removeClass('errorMsg');
               $("#fb-others-form").hide();
               $("#feedbacdialog").fadeIn();
               document.getElementById("feedbacdialog").reset();
               gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'Average'
                });
                refreshAd();
               break;
            case "fb-good":
               feedbackApiBody.query = $("#queryInput2").val();
               feedbackApiBody.feedback = "GOOD";
               feedbackApiBody.message = "Good";
               gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'GOOD'
                });
               sendFeedback();
               refreshAd();
               break;     
            case "fb-vgood": 
               feedbackApiBody.query = $("#queryInput2").val();
               feedbackApiBody.feedback = "VERY_GOOD";
               feedbackApiBody.message = "Very Good"; 
               gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'VERY GOOD'
                });
               sendFeedback();
               refreshAd();
               break; 
            case "fb-excellent":
               feedbackApiBody.query = $("#queryInput2").val();
               feedbackApiBody.feedback = "EXCELLENT"; 
               feedbackApiBody.message = "its awesome";
               gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': 'EXCELLENT'
                });
               sendFeedback();
               refreshAd();
               break;
         }   
         $(".feedbackiconwrap").addClass("liked");         
    }
});

$('[data-toggle=confirmation]').confirmation({
    rootSelector: '[data-toggle=confirmation]',
    container: 'body',
    onConfirm:submitfeedback,
    onCancel:function(){
        $(".feedbackiconwrap").removeClass("liked");
        $(".feedbackiconwrap a").removeClass("active");
        $("#feedbacdialog").hide();
    }
  });
$("#feedbacdialog h3 span").click(function(){
    $(".feedbackiconwrap").removeClass("liked");
    $(".feedbackiconwrap a").removeClass("active");
    $("#feedbacdialog").hide();
});
function sendFeedback(){
    feedbackApiBody.query=selectedQuestion;
    $.ajax({            
        url: feedbackApi,
        method: "POST",
        data:JSON.stringify(feedbackApiBody),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('authkey', '9a12ab538-9ffe-49a5-7124-bc7d61123f4ab');
            xhr.setRequestHeader('content-type', 'application/json');
        }
      })
      .done(function( data ) {
          $("#responsemessage .message").html(data.message); 
          $("#responsemessage").fadeIn().delay(1000).fadeOut();     
    });
}

$("#feedbackoption .fb-option").click(function(){
    var selectedOption = $(this).val();
    if(selectedOption === "others"){
        $("#fb-others-form").show();        
    }else{
        $("#fb-others-form").hide();
        feedbackApiBody.message = selectedOption;
    }
});

function submitfeedback(){
    var selectedOption = $('input.fb-option:checked', '#feedbackoption').val();
    if(selectedOption){
        if(selectedOption === "others"){
            var message = $("#feedbackmessage").val();
            if(message !== ""){
                $("#feedbackmessage").toggleClass("errorMsg"); 
                feedbackApiBody.message = message;
                sendFeedback();
                $("#feedbacdialog").hide();
            }else{
                $("#feedbackmessage").toggleClass("errorMsg");
            }        
        }else{
            sendFeedback();
            $("#feedbacdialog").hide();
        } 
    }
}

$("#feedbackoption li label").click(function(){
    $(".fb-option",$(this).parent("li")).click();
})
/* Feedback ends */

$("#queryInput2").on('keyup', function() {
    var $this = $(this);
    var visible = Boolean($this.val());
    $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
  });
  
  $('.form-control-clear').on('click',function() {
    $("#queryInput2").val('').focus();
    $(this).toggleClass('hidden');
  });
});

var botOpened = function(){
    gtag('event', 'click', {
        'event_category': 'button',
        'event_label': 'ChatBot Opened'
    });
}
function closeMe(id){
    $(id).hide();
}

function refreshAd(){
    var chatbotadframewindow = document.getElementById("chatbotadwindow");
    chatbotadframewindow.src = chatbotadframewindow.src;
}

$("#PNR_Enquiry").click(function(){  
    // alert("PNR");   
    //ga('send','event','button','click'); //Update GA on every hit
    gtag('event', 'click', {
        'event_category': 'outbound',
        'event_label': 'IRCTC PNR Enquiry'
    });});

    $("#Train_Enquiry").click(function(){ 
        // alert("IRCTC Train Enquiry");          
        //ga('send','event','button','click'); //Update GA on every hit
        gtag('event', 'click', {
            'event_category': 'outbound',
            'event_label': 'IRCTC Train Enquiry'
        });});
        $("#Seat_Availability").click(function(){ 
            // alert("IRCTC Seat Availability");        
            //ga('send','event','button','click'); //Update GA on every hit
            gtag('event', 'click', {
                'event_category': 'outbound',
                'event_label': 'IRCTC Seat Availability'
            });});
            $("#Fare_Enquiry").click(function(){   
                // alert("IRCTC Fare Enquiry");      
                //ga('send','event','button','click'); //Update GA on every hit
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': 'IRCTC Fare Enquiry'
                });});