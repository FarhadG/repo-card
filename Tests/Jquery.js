	var //$checkbox = $(this).find(".checkbox"), I am having trouble with this :/
		$checkbox = $(".checkbox")
		$img 	  = $("img");
	
	
	$(function(){
		$checkbox.click( "checked", function(){
			$img.toggleClass("show")
		})
	});
