$(function() {
    console.log("Hello World from Main Javascript")
    var query = getUrlParameter('q')
    var fakeMouse = $(".fake-mouse");
    var topBarInput = $(".browser-frame-top-bar-input");
    var topBarInputField = $(".browser-frame-top-bar-input-url");

    var searchBarInput = $(".browser-frame-content-search-bar-input");
    var searchBarInputField = $(".browser-frame-content-search-bar-input-text");

    var browserFrameContent = $(".browser-frame-content")
    var background = $(".browser-frame-background")

    var button = $(".browser-frame-content-search-bar-right-button");

    var instructionOne = $(".search-instruction-one")
    var instructionTwo = $(".search-instruction-two")
    var instructionThree = $(".search-instruction-three")

    fakeMouse.show();
    fakeMouse.animate({
        top: (topBarInput.offset().top + 25),
        left: (topBarInput.offset().left)
    }, 1800, 'swing', function() {
        setTimeout(function(){
            fakeMouse.hide();
            type(topBarInputField, "https://endic.naver.com", 0);
        }, 200);
    });

    function type(element, string, index){
        var val = string.substr(0, index + 1);
        element.text(val);
        if(index < string.length) {
            setTimeout(function(){type(element, string, index + 1); }, Math.random() * 180);
        } else {
            if(element == topBarInputField) {
                doneTypingURL();
            } else {
                doneTypingQuery();
            }
        }
    }

    function doneTypingURL() {
        fakeMouse.show();
        setTimeout(function() {
            instructionTwo.css("visibility", "visible");
            background.hide();
            browserFrameContent.show();
            fakeMouse.animate({
                top: (searchBarInput.offset().top + 25),
                left: (searchBarInput.offset().left + 15)
            }, 2000, 'swing', function() {
                setTimeout(function(){
                    fakeMouse.hide();
                    type(searchBarInputField, query, 0);
                }, 200);
            });
        }, 1000);
    }

    function doneTypingQuery() {
        fakeMouse.show();
        instructionThree.css("visibility", "visible");
        fakeMouse.animate({
            top: (button.offset().top + 25),
            left: (button.offset().left + 25)
        }, 1500, 'swing', function() {
            setTimeout(function() {
                window.location.replace("https://endic.naver.com/search.nhn?sLn=kr&isOnlyViewEE=N&query=" + query)
            }, 300);
        });
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
});
