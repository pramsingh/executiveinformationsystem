function clearProdFilters(){
	Ext.getCmp('combo_product_state').setValue("");
	Ext.getCmp('tf_product_name').setValue("");
	Ext.getCmp('nf_impact_start').setValue("");
	Ext.getCmp('nf_impact_stop').setValue("");
	Ext.getCmp('nf_expl_start').setValue("");
	Ext.getCmp('nf_expl_stop').setValue("");
	ProductResultsStore.clearFilter();
};
function submitProdFilters(){
	var prod_state = Ext.getCmp('combo_product_state').getValue();
	var prod_name = Ext.getCmp('tf_product_name').getValue();
	var ip_r_start = Ext.getCmp('nf_impact_start').getValue();
	var ip_r_end = Ext.getCmp('nf_impact_stop').getValue();
	var exp_r_start = Ext.getCmp('nf_expl_start').getValue();
	var exp_r_end = Ext.getCmp('nf_expl_stop').getValue();
	
	if (prod_state != null){
		ProductResultsStore.filter('state',prod_state);
	}
	if (prod_name.length > 0){
		ProductResultsStore.filter('product_name', prod_name);
	}
	if (ip_r_start != null && ip_r_end != null){
		ProductResultsStore.filter([
		   {filterFn: function(item){
			   return item.get("impact_subscore") >= ip_r_start && item.get("impact_subscore") <= ip_r_end;
		   }}
		]);
	}
	if (exp_r_start != null && exp_r_end != null){
		ProductResultsStore.filter([
		   {filterFn: function(item){
			   return item.get("exploitability_subscore") >= exp_r_start && item.get("exploitability_subscore") <= exp_r_end;
		   }}
		]);
	}
}
function loadDetailsData(){
	data = gtConstants.Util.details_data;
	$("#original_release_date").text(data.original_release_date);
	$("#last_revised").text(data.last_revised);
	$("#product_name").text(data.product_name);
	$("#impact_subscore").text(data.impact_subscore);
	$("#exploitability_subscore").text(data.exploitability_subscore);
	$("#source").text(data.source);
	$("#state").text(data.state);
	$("#integrity").text(data.integrity);
	$("#access_vector").text(data.access_vector);
	$("#access_complexity").text(data.access_complexity);
	$("#authentication").text(data.authentication);
	$("#impact_type").text(data.impact_type);
	$("#overview").text(data.overview);
};
function loadDetailsEditor(){
	data = gtConstants.Util.details_data;
	if (data != null){
		$("#original_release_date_input").val(data.original_release_date);
		$("#last_revised_input").val(data.last_revised);
		$("#product_name_input").val(data.product_name);
		$("#impact_subscore_input").val(data.impact_subscore);
		$("#exploitability_subscore_input").val(data.exploitability_subscore);
		$("#source_input").val(data.source);
		$("#integrity_input").val(data.integrity);
		$("#access_vector_input").val(data.access_vector);
		$("#access_complexity_input").val(data.access_complexity);
		$("#authentication_input").val(data.authentication);
		$("#impact_type_input").val(data.impact_type);
		$("#overview_input").val(data.overview);
	}
};
function resetDetailsData(){
	$("#original_release_date").text("");
	$("#last_revised").text("");
	$("#product_name").text("");
	$("#impact_subscore").text("");
	$("#exploitability_subscore").text("");
	$("#source").text("");
	$("#state").text("");
	$("#integrity").text("");
	$("#access_vector").text("");
	$("#access_complexity").text("");
	$("#authentication").text("");
	$("#impact_type").text("");
	$("#overview").text("");
};