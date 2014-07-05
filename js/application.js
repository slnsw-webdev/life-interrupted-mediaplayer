// global
var intervalId;
var sessionLength = 3; // no. of minutes

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){}

// idle timer function
$( document ).idleTimer( 15*60*1000 );
$( document ).on( "idle.idleTimer", function(){
	 document.location.href = 'index.html';
});

