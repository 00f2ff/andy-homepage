$(function() {

	/* THIS IS NOT CONSISTENT */
	// This sets margins for #scene1 children
	$('#scene1 .small').css('margin-left', $('#scene1 .big').width() - $('#scene1 .small').width() / 4 + 'px');
	$('#scene1 .medium').css('margin-left', $('#scene1 .small').css('margin-left'));
	// Set width for its section
	$('#scene1').css('width',$('#scene1 .big').width() + $('#scene1 .medium').width() + $('#scene1 .small').width()+ 'px');



	// keep track of current scene
	var current_scene = 1;
	// key track of last scroll location
	var last_scroll = 0;

	/*
	 * The following events handle inter-scene movement via:
	 * arrow click (down only)
	 * scroll (up/down)
	 * keydown (up/down)
	 */
	$('#arrow svg').click(function() {
		// check that arrow is present
		if($(this).css('opacity') >= 0.5) { // this can be subject to change
			// fade out arrow
			$(this).css('-webkit-animation', 'fadeOut 0.6s linear forwards');
			// swoosh scene up
			$('#scene'+$(this).data('scene')).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
			// increment scene in arrow
			$(this).data('scene', $(this).data('scene') + 1);
			// increment scene
			current_scene++;
			console.log($(this).data('scene'));
			console.log(current_scene);
			// bring next scene in

			// fade in arrow
		}
	});
	
	$(window).scroll(function(e) {
		// compare current scroll location to last one
		var current_scroll = $(window).scrollTop();
		if (current_scroll >= last_scroll + 40) { // scroll down
			// move scene up
			$('#scene'+current_scene).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
			// increment scene
			current_scene++;
			// update last scroll
			last_scroll = current_scroll;
			console.log(current_scroll);
		}else if (current_scroll <= last_scroll - 40) { // scroll up
			// bring back last scene **TODO**

			// decrement scene
			current_scene--;
			// update last scroll
			last_scroll = current_scroll;
			console.log(current_scroll);
		}
		// fade out arrow
		$('#arrow svg').css('-webkit-animation', 'fadeOut 0.6s linear forwards');


	});

	$(document).keydown(function(e) {
		// don't prevent default here because it makes all keys on keyboard not do anything
		var keyCode = e.keyCode || e.which,
    		arrow = {up: 38, down: 40}
    	if (keyCode === 38) { // up
    		e.preventDefault(); // don't trigger the scroll
    		if (current_scene > 1) {
    			current_scene--;
    			console.log(current_scene);
    			// bring back last scene **TODO**
    		}
    	}else if (keyCode === 40) { // down
    		e.preventDefault(); // don't trigger the scroll
    		// **TODO** when I know what the max is, check that current_scene is not at max
    		$('#scene'+current_scene).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
    		current_scene++;
    		console.log(current_scene);
    		// bring next scene in
    	}
		// fade out arrow
		$('#arrow svg').css('-webkit-animation', 'fadeOut 0.6s linear forwards');
	})


})

/*
Important:
Up/down arrow presses trigger scroll event, so the contents of that get called every time.
This means all of the logic currently in keydown needs to move to scroll and be modified.
It also means we don't even need to listen for keydown, because the default browser 
*/