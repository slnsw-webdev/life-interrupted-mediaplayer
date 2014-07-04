// global
var intervalId;
var sessionLength = 3; // no. of minutes

// files
var media_files = [];
media_files[0] = "AnneDonnell_Christmas_Day_celebrations.mp3";
media_files[1] = "AnneDonnell_Bombings_and_homesickness.mp3";
media_files[2] = "AnneDonnell_Crossing_the_Equator.mp3";
media_files[3] = "WilliamBurrell_stretcher-bearers_experience.mp3";
media_files[4] = "Silas_on_the_troopship_Ceramic.mp3";
media_files[5] = "Silas_On_the_way_to_Gallipoli.mp3";
media_files[6] = "Silas_Landing_at_Gallipoli.mp3";
media_files[7] = "FrankHurley_Experiencing_flying.mp3";
media_files[8] = "JimMarshall_Leaving_home.mp3";
media_files[9] = "JimMarshall_Leaving_home-2.mp3";
media_files[10] = "JimMarshall_On_leave_in_London.mp3";
media_files[11] = "JackHutton_A_laconic_look.mp3";
media_files[12] = "LangfordColleyPriest_Daily life.mp3";
media_files[13] = "LangfordColleyPriest_Stretcher-bearer.mp3";
media_files[14] = "LouisVasco_love_of_France.mp3";
media_files[15] = "LouisVasco_study_in_blues.mp3";
media_files[16] = "LouisVasco_last_letters.mp3";
media_files[17] = "MauriceEvans_My_horse.mp3";
media_files[18] = "WesleyChoat_Letter_to_the_Principal_Librarian.mp3";
media_files[19] = "WesleyChoat_La_Belle_France.mp3";
media_files[20] = "WesleyChoat_prisoner_of_war.mp3";
media_files[21] = "Emden_sydney_short.mp3";

// Audio player
//
var my_media = null;
var mediaTimer = null;

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){}

$( document ).ready(function() {
	
  // hide overlay modal
  el = document.getElementById("overlay");
  el.style.visibility = "hidden";

  
  // function to swap out images
  $(".player-play").click(function(){
	  
	 // show overlay modal
  	 el = document.getElementById("overlay");
     el.style.visibility = "visible";
	  
	  //reset page elements
	  resetPlayer();
	  
	  // set class on cell
	  $(this).closest(".column-cell").css("background-color", "#00cc99");
  
  	  // get media file
	 click_ref = $(this).attr("id").split("-");
	 click_id = click_ref[2];
	 media_ref = parseInt(click_id, 10)-1;
	 file_name = media_files[media_ref];
	 media_src = "http://www.sl.nsw.gov.au/events/exhibitions/2014/life_interrupted/audio/" + file_name;
  
  	 // swap image for that media file
	 $('#player-play-' + click_id).hide();
	 $('#player-stop-' + click_id).show();
	 
	 // play audio
	 play_Audio(media_src,click_id);	
	 
  });
  
  $(".player-pause").click(function(){
	  
	  // event.preventDefault();
	  pauseAudio();
	  
	  // get media file
	  click_ref = $(this).attr("id").split("-");
	  click_id = click_ref[2];
	  
	  // swap image
	  $('#player-stop-' + click_id).hide();
	  $('#player-play-' + click_id).show();
	  
	  // set class on cell
	  $(this).closest(".column-cell").css("background-color", "#FFF");
	  
	 
  });
  
  $(".player-stop").click(function(){
	  
	  // event.preventDefault();
	  stopAudio();
	  
	  // get media file
	  click_ref = $(this).attr("id").split("-");
	  click_id = click_ref[2];
	  
	  // swap image
	  $('#player-stop-' + click_id).hide();
	  $('#player-play-' + click_id).show();
	  
	  // set class on cell
	  $(this).closest(".column-cell").css("background-color", "#FFF");
	  
	 
  });
  

});

// Play audio
//
function play_Audio(src,ref) {
	
	// Create Media object from src
	my_media = new Media(src, onSuccess, onError);
	
	// set volume
	my_media.setVolume('0.9');
	
	// Play audio
	my_media.play({ numberOfLoops: 1 });

	// Update my_media position every second
	if (mediaTimer == null) {
		mediaTimer = setInterval(function() {
			// get my_media position
			my_media.getCurrentPosition(
				// success callback
				function(position) {
					if (position > -1) {
						// playing
						// hide overlay modal
  						el = document.getElementById("overlay");
  						el.style.visibility = "hidden";
						var posText = position + " sec";
						setAudioPosition(posText, ref);
					} 
				},
				// error callback
				function(e) {
					alert("Error getting pos=" + e);
					setAudioPosition("Error: " + e);
				}
			);
		}, 1000);
	}
}

// Pause audio
//
function pauseAudio() {
	if (my_media) {
		my_media.pause();
	}
}

// Stop audio
//
function stopAudio() {
	if (my_media) {
		my_media.stop();
	}
	clearInterval(mediaTimer);
	mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
	// reset player
	resetPlayer();
}

// onError Callback
//
function onError(error) {
	alert('code: '    + error.code    + '\n' +
		  'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position,ref) {
	document.getElementById('audio_position_'+ref).innerHTML = position;
}

// idle timer function
$( document ).idleTimer( 15*60*1000 );
$( document ).on( "idle.idleTimer", function(){
	 document.location.href = 'index.html';
});

function resetPlayer() {
  // swap all background's and images 
  $( ".column-cell" ).each(function( index ) {
	 $(this).css("background-color", "#fff");
	 var ref_id = index + 1; 
	 $('#player-play-' + ref_id).show();
	 $('#player-stop-' + ref_id).hide();
  });	
}
