$(document).ready(function(){
	if (window.innerHeight < 925){
		var setHeight = window.innerHeight - 250,
			heightVal = setHeight + "px";
		$(".formHolder").css("height", heightVal);
		$(".edit-form").css("height", heightVal);
	};
	window.addEventListener('storage', function(ev){
		var val = localStorage.getItem("spotVal");
		if (val != null){
			if (val != 0){
				$('#header').contents().find(".spot").text(val);
			}else {
				$('#header').contents().find(".spot").hide();
			}
		}
	});
	$('#user_notification_center').hide();
	$('#alert_notification_center').hide();
	$("#ackBtn").click(function(){
		var selected = [];
		$.each($("input[name='cbgroup']:checked"),function(){
			selected.push($(this).val());
		});
		for(var i = 0; i <selected.length; i++){
			localStorage.removeItem(selected[i]);
		}
		var setLoc = $('#header').contents().find(".spot");
		var curNoteVal = setLoc.html();
		var val = curNoteVal - selected.length
		localStorage.setItem("spotVal", val);
		if (val != 0){
			setLoc.text(val);
		}else{
			setLoc.hide();
		}
		window.parent.gtConstants.Util.notif_is_open = false;
		window.parent.$("#latest_news tbody").remove();
		$('#alert_notification_center').slideToggle("slow")
	});	
});