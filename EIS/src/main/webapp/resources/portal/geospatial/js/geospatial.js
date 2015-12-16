$(document).ready(function(){
	$(".metrics-button").click(function(){
		$(".metrics-bar").toggleClass( "open" );
		$(".metrics").toggleClass("slide");
	})
});
var map;
function initMap() {
	setTimeout(function(){
		map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: -34.397, lng: 150.644},
	    zoom: 8
	  });
	}, 3000);
};
function reCenterMap(lat,long){
	map.setZoom(16);
	map.setCenter(new google.maps.LatLng(parseFloat(lat), parseFloat(long)));
};
$(function (){
	Highcharts.setOptions({
		colors: ['#773141', '#241773', '#203731', '#0085ca', '#ff7900', '#008e97']
	});
	$('#left_donut').highcharts({
		chart: {
			backgroundColor: 'transparent',
			type: 'pie'
		},
		title: {
			text: ''
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				innerSize: 50,
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'middle',
			floating: true,
			itemStyle: {
				fontSize: '10px',
				color: '#FFFFFF'
			},
			itemHoverStyle: {
				color: '#508eeb'
			}
		},
		series: [{
			colorByPoint: true,
			data: [
			  ['Washington', 8],
			  ['Baltimore', 3],
			  ['New York', 1],
			  ['Carolina', 13],
			  ['Tampa Bay', 4],
			  ['Miami', 6]
			]
		}]
	});
});
$(function (){
	Highcharts.setOptions({
		colors: ['#773141', '#004953', '#0b2265', '#b0b7bc']
	});
	$('#left_graph').highcharts({
		chart: {
			backgroundColor: 'transparent'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				dataLabels: {
					enabled: false,
				},
				startAngle: -90,
				endAngle: 90,
				center: ['50%', '75%']
			}
		},
		series: [{
			type: 'pie',
			innerSize: '50%',
			data: [
			   ['Washington', 6],
			   ['Philadelphia', 6],
			   ['New York', 6],
			   ['Dallas', 4]
			]
		}]
	});
});
$(function (){
	Highcharts.setOptions({
		colors: ['#fb4f14', '#ffb612', '#241773', '#fb4f14']
	});
	$('#center_graph').highcharts({
		chart: {
			backgroundColor: 'transparent'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				dataLabels: {
					enabled: false,
				},
				startAngle: -90,
				endAngle: 90,
				center: ['50%', '75%']
			}
		},
		series: [{
			type: 'pie',
			innerSize: '50%',
			data: [
			   ['Cincinnati', 10],
			   ['Pittsburg', 8],
			   ['Baltimore', 4],
			   ['Cleveland', 3]
			]
		}]
	});
});
$(function (){
	Highcharts.setOptions({
		colors: ['#0085ca', '#ff7900', '#a71930', '#9f8958']
	});
	$('#right_graph').highcharts({
		chart: {
			backgroundColor: 'transparent'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				dataLabels: {
					enabled: false,
				},
				startAngle: -90,
				endAngle: 90,
				center: ['50%', '75%']
			}
		},
		series: [{
			type: 'pie',
			innerSize: '50%',
			data: [
			   ['Carolina', 13],
			   ['Tampa Bay', 6],
			   ['Atlanta', 6],
			   ['New Orleans', 5]
			]
		}]
	});
});
$(function (){
	Highcharts.setOptions({
		colors: ['#005a8b', '#97233f', '#69be28', '#0085ca', '#fb4f14', '#4b92db']
	});
	$('#right_donut').highcharts({
		chart: {
			backgroundColor: 'transparent',
			type: 'pie'
		},
		title: {
			text: ''
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				innerSize: 50,
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'middle',
			floating: true,
			itemStyle: {
				fontSize: '10px',
				color: '#FFFFFF'
			},
			itemHoverStyle: {
				color: '#508eeb'
			}
		},
		series: [{
			colorByPoint: true,
			data: [
			  ['Detroit', 4],
			  ['Arizona', 11],
			  ['Seattle', 8],
			  ['Carolina', 13],
			  ['Denver', 10],
			  ['Tennessee', 3]
			]
		}]
	});
});