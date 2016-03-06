$(document).ready(function(){
	function getNews(){
		return $.ajax({
			dataType: "json",
			url: '../../data/newsUpdates.json',
			type: 'GET'
		});
	};

	function placeNews(data){
		if (data.length > 0){
			if (localStorage.getItem("spotVal") == null){
				$('.spot').text(data.length);
			}			
			for (var i = 0; i < data.length; i++){
				localStorage.setItem("cb"+i, data[i].subject);
			}
		}
	};
	if (localStorage.getItem("spotVal") == null){
		getNews().done(placeNews);
	}else {
		var spotVal = localStorage.getItem("spotVal");
		if (spotVal != 0){
			$('.spot').text(spotVal);
		}else{
			$('.spot').hide();
		}
	}
	
	$("#userInfo").click(function(){
		window.parent.$('#user_notification_center').load('../resources/partials/userNote.html');
		window.parent.$('#user_notification_center').slideToggle("slow");
	});	
	$("#notification").click(function(){
		var table = window.parent.$("#latest_news");
		var notif_spot_val = localStorage.getItem("spotVal");
		if(notif_spot_val == 0){
			window.parent.$("#noResults").remove();
			window.parent.$("#news").hide();
			window.parent.$("#alert").append("<div id='noResults'>No News Available.</div>");
		}
		if(window.parent.gtConstants.Util.notif_is_open == false){
			window.parent.gtConstants.Util.notif_is_open = true;
			for(var i = 0; i < localStorage.length; i++){
				var lsKey = localStorage.key(i),
					indexKey;
					if (lsKey.indexOf("cb") != -1){
						indexKey = lsKey;
						table.append("<tr><td class='cbCenter'><input type='checkbox' name='cbgroup' id='"+indexKey+"' value='"+indexKey+"'></td><td>"+localStorage.getItem(indexKey)+"</td></tr>");
					}
			}
		}else{
			window.parent.gtConstants.Util.notif_is_open = false;
			window.parent.$("#latest_news tbody").remove();
		}
		window.parent.$('#alert_notification_center').slideToggle("slow");
	});
});