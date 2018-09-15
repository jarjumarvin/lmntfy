$(function() {
    console.log("Hello World from Main Javascript")

    var fakeMouse = $(".fake-mouse");
    var topBarInput = $(".browser-frame-top-bar-input");
    var topBarInputField = $(".browser-frame-top-bar-input-url");

    var searchBarInput = $(".browser-frame-content-search-bar-input");
    var searchBarInputField = $(".browser-frame-content-search-bar-input-text");

    var button = $(".browser-frame-content-search-bar-right-button");

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
        fakeMouse.animate({
            top: (searchBarInput.offset().top + 25),
            left: (searchBarInput.offset().left + 15)
        }, 1800, 'swing', function() {
            setTimeout(function(){
                fakeMouse.hide();
                type(searchBarInputField, "사전", 0);
            }, 200);
        });
    }

    function doneTypingQuery() {
        fakeMouse.show();
        fakeMouse.animate({
            top: (button.offset().top + 25),
            left: (button.offset().left + 25)
        }, 1500, 'swing', function() {
            console.log('we done bois');
        });
    }
});
