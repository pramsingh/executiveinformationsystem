function clearGeoFilters(){
	Ext.getCmp('combo_system_state').setValue("");
	Ext.getCmp('tf_city').setValue("");
	Ext.getCmp('cb_state').setValue("");
	SystemResultsStore.clearFilter();
};
function submitGeoFilters(){
	var sys_state = Ext.getCmp('combo_system_state').getValue();
	var loc_city = Ext.getCmp('tf_city').getValue();
	var loc_state = Ext.getCmp('cb_state').getValue();

	if (sys_state != null){
		SystemResultsStore.filter('system_state',sys_state);
	}
	if (loc_city.length > 0){
		SystemResultsStore.filter('location_city', loc_city);
	}
	if (loc_state != null){
		SystemResultsStore.filter('location_state', loc_state);
	}
	filterPanel.items.items[0].expand();
};
function requestChartData(){
	Highcharts.setOptions({
		colors: ['#3367d6', '#6aa63b', '#ffff00', '#ff0000', '#fc5402', '#8f3f83', '#2ea69c', '#a67d2e', '#cf3a19', '#786a65']
	});
	getTopProducts();
	getTopSystems();
	getTopProductImpact();
	getLowProductImpact();
};
function getTopProducts(){
	//todo replace url in the getJSON with real webservice
	$.getJSON("../resources/data/topProducts.json", function(data){
		$('#left_donut').highcharts({
			chart: {
				backgroundColor: 'transparent',
				type: 'pie'
			},
			title: {
				text: 'Top Vulnerable Products',
				style: {
					color: '#ffffff',
					fontSize: '10pt',
					fontWeight: 'bold'
				}
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
				},
				labelFormatter: function() {
					var label = this.name;
					var res = label.split(" ");
					return res[0];
				}
			},
			series: [{
				colorByPoint: true,
				name: 'Exploitability',
				data: data
			}]
		});
	});
};
function getTopProductImpact(){
	//todo replace url in the getJSON with real webservice
	$.getJSON("../resources/data/productHighImpact.json", function(data){
		$('#left_graph').highcharts({
			chart: {
				backgroundColor: 'transparent',
				width: 200
			},
			title: {
				text: ''
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: false
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'pie',
				name: 'High',
				innerSize: '50%',
				data: data
			}]
		});
	});
};
function getLowProductImpact(){
	//todo replace url in the getJSON with real webservice
	$.getJSON("../resources/data/productLowImpact.json", function(data){
		Highcharts.setOptions({
			colors: ['#0085ca', '#ff7900', '#f10e19', '#e3e03b', '#2e7a28', '#10C99B', '#493C9E']
		});
		$('#right_graph').highcharts({
			chart: {
				backgroundColor: 'transparent',
				width: 200
			},
			title: {
				text: ''
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: false
					},
					startAngle: -90,
					endAngle: 90,
					center: ['50%', '75%']
				}
			},
			series: [{
				type: 'pie',
				name: 'Low',
				innerSize: '50%',
				data: data
			}]
		});
	});
};
function getTopSystems(){
	//todo replace url in the getJSON with real webservice
//	$.getJSON("../resources/data/productLowImpact.json", function(data){    <-- uncomment here and remove lines 150 - 164
		var data = [];
		function getData(){
			var store = SystemResultsStore;
			for (var i = 0; i < store.data.length; i++){
				if (store.data.items[i].data.system_state === "Major"){
					var con = [];
					var name = store.data.items[i].data.system_name;
					var val = store.data.items[i].data.products.length;
					con.push(name);
					con.push(val);
					data.push(con);
				}
			}
		};
		getData();
		$('#right_donut').highcharts({
			chart: {
				backgroundColor: 'transparent',
				type: 'pie'
			},
			title: {
				text: 'Top Vulnerable Systems',
				style: {
					color: '#ffffff',
					fontSize: '10pt',
					fontWeight: 'bold'
				}
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
				itemWidth: 10,
				useHTML: true,
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
				name: 'Products',
				data: data
			}]
		});
//	});                                <-- also uncomment here
};