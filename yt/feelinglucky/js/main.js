//this function creates an <iframe> and the youtube player object

var player;
function onYouTubeIframeAPIReady(){
	player = new YT.Player('player1',{
		height: '480',
		width: '853',
		videoId: 'ZuHZSbPJhaY',
		playerVars:{
			'rel': 0
		},
	});
}
		
$(function(){
	$('#search').submit(function (e) { //when the form is submitted
		
		e.preventDefault(); // prevent default action of submit
		
		var searchVal = $('#search-val').val(); // what you typed into the input box
				
		search(searchVal); // calls the search function below

	});

	function search(searchVal) { // getting from input above
		clearBackground();
		//the API will call this function once the player is done loading, per the events object when the new player was constructed
		player.loadPlaylist({
			'list': searchVal,
			'listType':'search'
		});
		player.setLoop(true);
		$(".yplayer").css('visibility','visible');
		console.log(searchVal);	
		}

	function clearBackground(){
		$("body").css("background","#fcfcfc"); //changes background color in body selector
	}

		//when our prev button is clicked, the playlist will jump to the previous video within the player
	$("#prev").click(function(){
		player.previousVideo();
	});

	//when our next button is clicked, the playlist will jump to the next video within the player
	$("#next").click(function(){
		player.nextVideo();
	});
});