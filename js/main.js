$(function() {

	/* THIS IS NOT CONSISTENT */
	// This sets margins for #scene1 children
	$('#scene1 .small').css('margin-left', $('#scene1 .big').width() - $('#scene1 .small').width() / 4 + 'px');
	$('#scene1 .medium').css('margin-left', $('#scene1 .small').css('margin-left'));
	// Set width for its section
	$('#scene1').css('width',$('#scene1 .big').width() + $('#scene1 .medium').width() + $('#scene1 .small').width()+ 'px');



	// keep track of current scene
	var current_scene = 1; // technically it's 0, but this way initialization works
	// key track of last scroll location
	var last_scroll = 0;

	/*
	 * The following events handle inter-scene movement via:
	 * arrow click (down only)
	 * scroll (up/down)
	 * keydown (up/down)
	 */
	 // IMPORTANT: if I figure out a way to initialize animations based on scroll locations, it'll probably be worth disabling this
	 // I could have it bounce up and down and maybe show a message like the current squarespace page does
	$('#arrow svg').click(function() { 
		// check that arrow is present
		if($(this).css('opacity') >= 0.5) { // this can be subject to change
			// fade out arrow
			$(this).css('-webkit-animation', 'fadeOut 0.6s linear forwards');
			// swoosh scene up // *** Maybe you just move down the page at a rate, and it doesn't actually go up
			// $('#scene'+$(this).data('scene')).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
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

	// function initializeScene(current_scene) {
	// 	if (current_scene === 1) {
	// 		$('#scene1-first').css('-webkit-animation', 'swooshUpFirst 0.55s linear forwards');
	// 		$('#scene1-second').css('-webkit-animation', 'swooshUpRest 0.7s linear forwards');
	// 		$('#scene1-third').css('-webkit-animation', 'swooshUpRest 1.05s linear forwards');
	// 		// bring arrow back
	// 	}
	// }

	/*
	 * This handler checks if the user has scrolled to certain locations on the
	 * page. If so, it initiates the animation at that section.
	 * Remember that scroll recordings skip, so it's unlikely that a scrollTop()
	 * will == a value every time.
	 */
	$(window).scroll(function(e) {
		// fade out arrow before next section
		if ($(window).scrollTop() >= 20 && $(window).scrollTop() <= 40) {
			$('#arrow svg').css('-webkit-animation', 'fadeOut 0.6s linear forwards');
		} 
		if ($(window).scrollTop() >= current_scene * $(window).height() && $(window).scrollTop() <= current_scene * $(window).height() + 20) {
			console.log('hi');
			// initializeScene(current_scene); // don't abstract this because it may load after the handler 
			if (current_scene === 1) {
				$('#scene1-first').css('-webkit-animation', 'swooshUpFirst 0.55s linear forwards');
				$('#scene1-second').css('-webkit-animation', 'swooshUpRest 0.7s linear forwards');
				$('#scene1-third').css('-webkit-animation', 'swooshUpRest 1.05s linear forwards');
				// bring arrow back
				$('#arrow svg').css({'opacity': 0, 'top': 90+100*current_scene+'vh', '-webkit-animation': 'fadeIn 0.6s linear 1.2s forwards'});
			}
		}
		/*
		When user scrolls to next scene, previous scene content goes to opacity: 0
		When user scrolls back up, previous scene content reverts to original styling and then runs
		*/


		// // compare current scroll location to last one
		// var current_scroll = $(window).scrollTop();
		// if (current_scroll >= last_scroll + 30) { // scroll down
		// 	// move scene up
		// 	// $('#scene'+current_scene).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
		// 	// increment scene
		// 	current_scene++;
		// 	$('html, body').animate({
		// 		scrollTop: $('#scene'+current_scene).offset().top
		// 	}, 450);
		// 	$(window).unbind('scroll').bind('scroll');
		// 	// update last scroll
		// 	last_scroll = current_scroll;
		// 	// $(window).scrollTop(0);
		// 	// console.log(current_scroll);
		// }else if (current_scroll <= last_scroll - 30) { // scroll up
		// 	// bring back last scene **TODO**
		// 	// $('#scene'+current_scene-1).css('-webkit-animation', 'sceneSwooshDown 0.6s linear forwards');
		// 	// decrement scene
		// 	current_scene--;
		// 	// update last scroll
		// 	last_scroll = current_scroll;
		// 	// console.log(current_scroll);
		// }
		// console.log(current_scene);
		// console.log(current_scroll);
		// // fade out arrow
		// $('#arrow svg').css('-webkit-animation', 'fadeOut 0.6s linear forwards');


	});

/* put this back in, but make it function the same was as scroll */

	// $(document).keydown(function(e) {
	// 	// don't prevent default here because it makes all keys on keyboard not do anything
	// 	var keyCode = e.keyCode || e.which,
 //    		arrow = {up: 38, down: 40}
 //    	if (keyCode === 38) { // up
 //    		e.preventDefault(); // don't trigger the scroll
 //    		if (current_scene > 1) {
 //    			current_scene--;
 //    			console.log(current_scene);
 //    			// bring back last scene **TODO**
 //    		}
 //    	}else if (keyCode === 40) { // down
 //    		e.preventDefault(); // don't trigger the scroll
 //    		// **TODO** when I know what the max is, check that current_scene is not at max
 //    		$('#scene'+current_scene).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
 //    		current_scene++;
 //    		console.log(current_scene);
 //    		// bring next scene in
 //    	}
	// 	// fade out arrow
	// 	$('#arrow svg').css('-webkit-animation', 'fadeOut 0.6s linear forwards');
	// })


})

/*
Important:
Up/down arrow presses trigger scroll event, so the contents of that get called every time.
This means all of the logic currently in keydown needs to move to scroll and be modified.
It also means we don't even need to listen for keydown, because the default browser 
*/