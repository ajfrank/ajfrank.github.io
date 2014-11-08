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
							.attr('href', 'https://www.youtube.com/watch?v='+videos[i].id.videoId)  // make the attribute href of that tag as follows
								.text(videos[i].snippet.title) //inserts the following string as text
								.attr('class', 'fancybox-media')
						) //closes <a>	
					) //closes <figcaption>
					)//closes <figure>
				)//closes the <li>
			} // closes our for loop
	} //closes function appendVideos

$(document).ready(function() {
	$('.fancybox-media').fancybox({
		openEffect  : 'elastic',
		closeEffect : 'elastic',
		padding: 0,
		helpers : {
			media : true
		},
		height: 720,
		width: 1280,
		aspectRatio: true,
		scrolling: 'no'
	});
});