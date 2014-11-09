$(function(){

	$('#search').submit(function (e) { //when the form is submitted
		
		e.preventDefault(); // prevent default action of submit
		
		var searchVal = $('#search-val').val(); // what you typed into the input box
		
		$('#ulist').empty(); // clearing div tag id=results
		
		search(searchVal); // calls the search function below

	});

});

	function search(searchVal) { // getting from input above
		var key = "AIzaSyDLetKrHvpNRUg7e--NX8pdIJK7btZl_TE"; //developers console
		$.ajax({ //need to learn more about this
			url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + searchVal + '&type=video&maxResults=12&key=' + key, // got from google api documentation
			type: 'GET', //call type of request
			success: function (data) { //data = object that google is sending us back
				console.log(data); //writing that object to the console
				console.log(data.items); //writing that object to the console
				var videos = data.items; // storing this variable for looping later
				
				clearBackground(); //calls function to change background color
				appendVideos(videos); //calls function below to display videos			
			},
			error: function (xhr) {
				console.log(xhr); //logs error to console so we can parse
			}
		});

	}

	function clearBackground(){
		$("body").css("background","#fcfcfc"); //changes background color in body selector
	}


	function appendVideos(videos) {

			for (var i = 0; i < videos.length; i++) { //for loop - loops through # of items in the array
			$('#ulist') // identifying which ID to manipulate			
				.append($('<li>')
					.append($('<figure>')
						.append($('<div class="crop">')
							.append($('<img>') // append within the a tag an image tag
								.attr('src', videos[i].snippet.thumbnails.high.url) // make the attribute src as follows
							) // closes image append
						) //closed div class="crop" tag
					.append($('<figcaption>')
						.append($('<a>') // append to that ID an <a> tag
							.attr('href', 'https://www.youtube.com/embed/'+videos[i].id.videoId+'?enablejsapi=1&wmode=opaque')  // make the attribute href of that tag as follows
								.text(videos[i].snippet.title) //inserts the following string as text
								.attr('class', 'fancybox fancybox.iframe')
						) //closes <a>	
					) //closes <figcaption>
					)//closes <figure>
				)//closes the <li>
			} // closes our for loop
	} //closes function appendVideos

// Fires whenever a player has finished loading
function onPlayerReady(event) {
    event.target.playVideo();
}

// Fires when the player's state changes.
function onPlayerStateChange(event) {
    // Go to the next video after the current one is finished playing
    if (event.data === 0) {
        $.fancybox.next();
    }
}

// The API will call this function when the page has finished downloading the JavaScript for the player API
function onYouTubePlayerAPIReady() {
    
    // Initialise the fancyBox after the DOM is loaded
    $(document).ready(function() {
        $(".fancybox")
            .attr('rel', 'gallery')
            .fancybox({
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                padding     : 0,
                margin      : 50,
                beforeShow  : function() {
                    // Find the iframe ID
                    var id = $.fancybox.inner.find('iframe').attr('id');
                    
                    // Create video player object and add event listeners
                    var player = new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                    	}
                	});
            	}
        	});
		});
	}