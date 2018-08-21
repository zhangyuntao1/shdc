(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

chrome.devtools.network.onRequestFinished.addListener(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    // alert(request)
    var _args$ = args[0],
        _args$$request = _args$.request,
        method = _args$$request.method,
        queryString = _args$$request.queryString,
        url = _args$$request.url,
        getContent = _args$.getContent;


    console.log(request);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZTcmMvZGV2dG9vbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLE9BQU8sUUFBUCxDQUFnQixPQUFoQixDQUF3QixpQkFBeEIsQ0FBMEMsV0FBMUMsQ0FDSSxZQUFhO0FBQUEsc0NBQVQsSUFBUztBQUFULFlBQVM7QUFBQTs7QUFDVDtBQURTLGlCQVFKLElBUkk7QUFBQSxnQ0FJTCxPQUpLO0FBQUEsUUFJSyxNQUpMLGtCQUlLLE1BSkw7QUFBQSxRQUlhLFdBSmIsa0JBSWEsV0FKYjtBQUFBLFFBSTBCLEdBSjFCLGtCQUkwQixHQUoxQjtBQUFBLFFBT0wsVUFQSyxVQU9MLFVBUEs7OztBQVdULFlBQVEsR0FBUixDQUFZLE9BQVo7QUFDSCxDQWJMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2hyb21lLmRldnRvb2xzLm5ldHdvcmsub25SZXF1ZXN0RmluaXNoZWQuYWRkTGlzdGVuZXIoXG4gICAgKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgLy8gYWxlcnQocmVxdWVzdClcbiAgICAgICAgY29uc3QgW3tcbiAgICAgICAgICAgIC8vIOivt+axgueahOexu+Wei++8jOafpeivouWPguaVsO+8jOS7peWPinVybFxuICAgICAgICAgICAgcmVxdWVzdDoge21ldGhvZCwgcXVlcnlTdHJpbmcsIHVybH0sXG5cbiAgICAgICAgICAgIC8vIOivpeaWueazleWPr+eUqOS6juiOt+WPluWTjeW6lOS9k1xuICAgICAgICAgICAgZ2V0Q29udGVudCxcbiAgICAgICAgfV0gPSBhcmdzO1xuXG5cbiAgICAgICAgY29uc29sZS5sb2cocmVxdWVzdClcbiAgICB9KTtcbiJdfQ==
