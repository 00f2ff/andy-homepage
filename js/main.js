$(function() {

	// // initialize controller
	// var controller = new ScrollMagic.Controller();

	// // build tween
	// var tween = TweenMax.from('#animate', 0.5, {autoAlpha: 0, scale: 0.7});

	// var scene = new ScrollMagic.Scene({
	// 	// triggerElement: '#pinned-trigger1', // start scene when this element is reached
	// 	offset: 100, // start scene after scrolling for 100px
	// 	duration: 400 // pin the element for 400px of scrolling

	// })
	// .setPin('#pinned-element1') // the element we want to pin
	// .addTo(controller); // assign the scene to the controller

	// // Add Scene to ScrollMagic Controller
	// // controller.addScene(scene);




	// /* Relevant Links
	// http://scrollmagic.io/examples/advanced/anchor_link_scrolling.html#bottom

	// */



	// This sets margins for #scene1 children
	$('#scene1 .small').css('margin-left', $('#scene1 .big').width() - $('#scene1 .small').width() / 4 + 'px');
	$('#scene1 .medium').css('margin-left', $('#scene1 .small').css('margin-left'));

	// This handles moving between scenes
	$('#arrow svg').click(function() {
		// check that arrow is present
		if($(this).css('opacity') >= 0.5) { // this can be subject to change
			// fade out arrow
			$(this).css('-webkit-animation', 'fadeOut 2s linear forwards');
			// swoosh scene up
			$('#scene'+$(this).data('scene')).css('-webkit-animation', 'sceneSwooshUp 0.6s linear forwards');
			// increment scene
			$(this).data('scene', $(this).data('scene') + 1);
			console.log($(this).data('scene'));
			// bring next scene in

			// fade in arrow
		}
	});


})