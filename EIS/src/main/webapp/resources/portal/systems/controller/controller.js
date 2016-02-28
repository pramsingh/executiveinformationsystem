function clearSysFilters(){
	Ext.getCmp('combo_system_state').setValue("");
	Ext.getCmp('tf_product_name').setValue("");
	Ext.getCmp('tf_city').setValue("");
	Ext.getCmp('cb_state').setValue("");
	SystemResultsStore.clearFilter();
};
function submitSysFilters(){
	var sys_state = Ext.getCmp('combo_system_state').getValue();
	var prod_name = Ext.getCmp('tf_product_name').getValue();
	var loc_city = Ext.getCmp('tf_city').getValue();
	var loc_state = Ext.getCmp('cb_state').getValue();

	if (sys_state != null){
		SystemResultsStore.filter('system_state',sys_state);
	}
	
	if (prod_name.length > 0){
		SystemResultsStore.filterBy(function(rec, id){
			return rec.get('product_list').indexOf(prod_name) > -1;
		});
	}
	
	if (loc_city.length > 0){
		SystemResultsStore.filter('location_city', loc_city);
	}
	if (loc_state != null){
		SystemResultsStore.filter('location_state', loc_state);
	}
};
function loadDetailsData(){
	data = gtConstants.Util.details_data;
	$("#system_name").text(data.system_name);
	$("#last_assessment_date").text(data.last_assessment_date);
	
	$("#system_state").text(data.system_state);
	var sys_state = data.system_state,
		 ico = "";
	switch(sys_state){
		case "Major":
			ico = ' <i class="fa fa-exclamation-circle" style="color:red"></i>';
			break;
		case "Minor":
			ico = ' <i class="fa fa-exclamation-triangle" style="color:yellow"></i>';
			break;
		case "Normal":
			ico = ' <i class="fa fa-star" style="color:green"></i>';
			break;
	}
	$("#system_state").append(ico);
	$("#owner_name").text(data.owner_name);
	$("#division").text(data.division);
	$("#location_dir").text(data.location_dir);
	
	var has_geo = data.has_geo,
		loc_ico = "";
	if (has_geo == true){
		switch(sys_state){
			case "Major":
				loc_ico = ' <i class="fa fa-map-marker" style="color:red"></i>';
				break;
			case "Minor":
				loc_ico = ' <i class="fa fa-map-marker" style="color:yellow"></i>';
				break;
			case "Normal":
				loc_ico = ' <i class="fa fa-map-marker" style="color:green"></i>';
				break;
		}
	}
	$("#location_dir").append(loc_ico);
	
	if (data.products != null){
		$("#product_table").append('<table class="table table-bordered"></table>');
		var table = $("#product_table").children();
		table.append("<tr><th>Product Name</th></tr>");
		for (var i = 0; i < data.products.length; i++){
			table.append("<tr><td>"+data.products[i].product_name+"</td></tr>");
		}
	}
	
	$("#sso_name").text(data.sso_name);
	$("#sso_email").text(data.sso_email);
	$("#sso_phone").text(data.sso_phone);
};
function getProductList(){
	var product_store = ProductResultsStore.data,
	prod_contents = [];
	
	for(var i = 0; i < product_store.length; i++){
		var name = product_store.getAt(i).data.product_name;
		var val = product_store.getAt(i).data.exploitability_subscore;
		prod_contents.push({"label" : name , "value": val }); 
	}	
	$(prod_contents).each(function(){
		$('#product_add_list').append($("<option>").attr('value',this.label).text(this.label));
	});
	$('#product_add_list').select2();
};
function loadDetailsEditor(){
	data = gtConstants.Util.details_data;
	var product_store = ProductResultsStore.data,
		prod_contents = [],
		products_selected = [];
	for(var i = 0; i < data.products.length; i++){
		var name = data.products[i].product_name;
		var val = data.products[i].exploitability_subscore;
		products_selected.push({"label": name, "value": val});
	}
	if (data != null){
		$("#last_assessment_date_input").val(data.last_assessment_date);
		$("#system_name_input").val(data.system_name);
		$("#owner_name_input").val(data.owner_name);
		$("#division_input").val(data.division);
		$('#product_list').find('option').remove();
		
		for(var i = 0; i < product_store.length; i++){
			var name = product_store.getAt(i).data.product_name;
			var val = product_store.getAt(i).data.exploitability_subscore;
			prod_contents.push({"label" : name , "value": val }); 
		}	
		$(prod_contents).each(function(){
			$('#product_list').append($("<option>").attr('value',this.label).text(this.label));
		});

		$(products_selected).each(function(){
			$('#product_list option[value="'+this.label+'"]').prop("selected","selected").change();
		});
		$('#product_list').select2();
		$('#state_list option[value="'+data.location_state+'"]').prop("selected","selected").change();
		$("#city_input").val(data.location_city);
		$("#sso_name_input").val(data.sso_name);
		$("#sso_email_input").val(data.sso_email);
		$("#sso_phone_input").val(data.sso_phone);
	}
};
function resetDetailsData(){
	$("#system_name").text("");
	$("#last_assessment_date").text("");
	$("#system_state").text("");
	$("#owner_name").text("");
	$("#division").text("");
	$("#location_dir").text("");
	$("#product_table").text("");
	$("#sso_name").text("");
	$("#sso_email").text("");
	$("#sso_phone").text("");
};