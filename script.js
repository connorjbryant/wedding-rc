$(function(){
    console.log("hello");

    $("#clock").countdown('2027/05/02 23:59:59', function(event) {
        $(this).html(event.strftime(''
            + '<div class="t-block"><span class="t-num">%D</span><span class="t-lbl">days</span></div>'
            + '<div class="t-block"><span class="t-num">%H</span><span class="t-lbl">hrs</span></div>'
            + '<div class="t-block"><span class="t-num">%M</span><span class="t-lbl">min</span></div>'
        ))
        .on('finish.countdown', function(){
            $(this).html('<span class="t-done">The wait is over! Rochelle and Connor are married now.</span>');
        });
    });
});