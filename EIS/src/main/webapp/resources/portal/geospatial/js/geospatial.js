var map;
var markers = {};
var store = SystemResultsStore;
var counter = 0;
var metrics_open = false;
$(document).ready(function(){
	function runner(lsKeys,lsRecs){
		if (lsKeys.length > 0 && counter == 2){
			for (var i = 0; i < lsKeys.length; i++){
				var indexKey = lsKeys[i],
					lsRec = lsRecs[i];
				var	index = localStorage.getItem(indexKey);
				var	val = JSON.parse(localStorage.getItem(lsRec));
				localStorage.removeItem(indexKey);
				localStorage.removeItem(lsRec);
				systemUpdate(index,val);
			}
		}else {
			return false;
		}
	};
	window.addEventListener('storage', function(ev){
		var lsKeys = [];
		var lsRecs = [];
		counter = counter + 1;
		for (var i = 0; i < localStorage.length; i++){
			var findIndex = "sysIndex"+i;
			if (localStorage.getItem(findIndex) !== null){
				var index = localStorage.getItem(findIndex),
					key = "sysUpdate"+index;
				lsKeys.push(findIndex);
				lsRecs.push(key);
			}
		}
		runner(lsKeys,lsRecs);
		if (localStorage.getItem("updateIndex") !== null){
			var upIndex = localStorage.getItem("updateIndex");
			var upVal = JSON.parse(localStorage.getItem("updateSystem"));
			localStorage.removeItem("updateIndex");
			localStorage.removeItem("updateSystem");
			systemUpdate(upIndex, upVal);
		}
		if (localStorage.getItem("newSystem") !== null){
			var newVal = JSON.parse(localStorage.getItem("newSystem"));
			localStorage.removeItem("newSystem");
			systemAdd(newVal);
		}
	});
	$(".metrics-button").click(function(){
		if (metrics_open == false){
			metrics_open == true;
			requestChartData();
		} else{
			metrics_open == false;
		}
		$(".metrics-bar").toggleClass( "open" );
		$(".metrics").toggleClass("slide");
	});
});
function catchSystems(){
	if (localStorage.getItem("jumpLoc") != null){
		var data = JSON.parse(localStorage.getItem("jumpLoc")),
			lat = data.location.latitude,
			lon = data.location.longitude;
		reCenterMap(lat,lon);
	}
}
function initMap() {
	setTimeout(function(){
		map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 38.9047, lng: -77.0164},
	    zoom: 8
	  });
		setMarkers(map);
	}, 3000);
};
function setMarkers(map){
	var locations_to_plot = [],
		locations_count = store.count();
	for (var i = 0; i < locations_count; i++){
		var records = [
		    store.getAt(i).get('system_name'),
		    store.getAt(i).get('location').latitude, 
		    store.getAt(i).get('location').longitude, 
		    store.getAt(i).get('system_state')
		];
		locations_to_plot.push(records);
	}
	for (var i = 0; i < locations_to_plot.length; i++){
		var location = locations_to_plot[i];
		var stateStatus = location[3];
		var icon;
		switch (stateStatus){
		case "Normal":
			icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
			break;
		case "Minor":
			icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
			break;
		case "Major":
			icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
			break;
		}

		function setContent(data){
			return contentString = '<h4 id="title">'+data.system_name+'</h4>'+
								   '<div id="content">'+
								   		'<div><span class="co">Last Assessment: </span>'+data.last_assessment_date+'</div>'+
								   		'<div><span class="co">Owner Name: </span>'+data.owner_name+'</div>'+
								   		'<div><span class="co">Division: </span>'+data.division+'</div>'+
								   		'<div id="location"><span class="co">Location: </span>'+data.location_dir+' <i class="fa fa-location-arrow"></i></div>'+
								   '</div>'+
								   '<div id="contact">'+
								   		'<div><span class="cco">SSO Name: </span>'+data.sso_name+'</div>'+
								   		'<div><span class="cco">SSO Email: </span> '+data.sso_email+'  <i class="fa fa-envelope"></i></div>'+
								   		'<div><span class="cco">SSO Phone: </span>'+data.sso_phone+'  <i class="fa fa-phone"></i></div>'+
								   '</div>'
		}
		
		var infowindow = new google.maps.InfoWindow({
			maxWidth: 275
		});
		var marker = new google.maps.Marker({
			position: {lat: location[1], lng: location[2]},
			icon: icon,
			map: map,
			id: location[0],
			title: location[0]
		});
		markers[location[0]] = marker;
		marker.addListener('click', (function(marker,content,infowindow){
			return function(){
				var index = store.findExact('system_name',this.title),
					data = store.getAt(index).data;
				setContent(data);
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			};
		})(marker,content,infowindow));
		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});
		google.maps.event.addListener(infowindow, 'domready', function() {
		    var iwOuter = $('.gm-style-iw');
		    var iwBackground = iwOuter.prev();
		    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
		    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
		    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
		    var iwCloseBtn = iwOuter.next();
		    iwCloseBtn.css({opacity: '1', right: '55px', top: '17px', border: '1px solid #48b5e9', width: '15px', height: '15px', 'border-radius': '15px', 'box-shadow': '0 0 5px #3990B9'});
		});
	}
	catchSystems();
};
function addMarker(val){
	var stateStatus = val.system_state;
	var icon;
	switch (stateStatus){
	case "Normal":
		icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
		break;
	case "Minor":
		icon = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
		break;
	case "Major":
		icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
		break;
	}
	function setContent(data){
		return contentString = '<h4 id="title">'+data.system_name+'</h4>'+
							   '<div id="content">'+
							   		'<div><span class="co">Last Assessment: </span>'+data.last_assessment_date+'</div>'+
							   		'<div><span class="co">Owner Name: </span>'+data.owner_name+'</div>'+
							   		'<div><span class="co">Division: </span>'+data.division+'</div>'+
							   		'<div id="location"><span class="co">Location: </span>'+data.location_dir+' <i class="fa fa-location-arrow"></i></div>'+
							   '</div>'+
							   '<div id="contact">'+
							   		'<div><span class="cco">SSO Name: </span>'+data.sso_name+'</div>'+
							   		'<div><span class="cco">SSO Email: </span> '+data.sso_email+'  <i class="fa fa-envelope"></i></div>'+
							   		'<div><span class="cco">SSO Phone: </span>'+data.sso_phone+'  <i class="fa fa-phone"></i></div>'+
							   '</div>'
	}						   		
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 275
	});
	var marker = new google.maps.Marker({
		position: {lat: val.location.latitude, lng: val.location.longitude},
		icon: icon,
		map: map,
		id: val.system_name,
		title: val.system_name
	});
	markers[val.system_name] = marker;
	marker.addListener('click', (function(marker,content,infowindow){
		return function(){
			var index = store.findExact('system_name',this.title),
				data = store.getAt(index).data;
			setContent(data);
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
		};
	})(marker,content,infowindow));
	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});
	google.maps.event.addListener(infowindow, 'domready', function() {
	    var iwOuter = $('.gm-style-iw');
	    var iwBackground = iwOuter.prev();
	    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
	    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
	    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
	    var iwCloseBtn = iwOuter.next();
	    iwCloseBtn.css({opacity: '1', right: '55px', top: '17px', border: '1px solid #48b5e9', width: '15px', height: '15px', 'border-radius': '15px', 'box-shadow': '0 0 5px #3990B9'});
	});
};
function reCenterMap(lat,long){
	map.setZoom(16);
	map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(long)));
};
function removeMarker(marker){
	var marker = markers[marker];
	marker.setMap(null);
};
function systemUpdate(index, val){
	counter = 0;
	var rec = store.getAt(index);
	rec.set(val);
	marker = val.system_name;
	removeMarker(marker);
	addMarker(val);
};
function systemAdd(val){
	var rec = store.add(val);
	addMarker(val);
};