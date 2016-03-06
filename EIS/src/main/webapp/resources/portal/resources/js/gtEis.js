$(document).ready(function(){
	$('#user_notification_center').hide();
	$('#alert_notification_center').hide();
		
	$("#ackBtn").click(function(){
		var selected = []
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