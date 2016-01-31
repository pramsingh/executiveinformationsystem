$(document).ready(function(){
	$(".details-button").click(function(){
		$(".edit-form").scrollTop(0);
		if (gtConstants.Util.details_is_open == false){
			gtConstants.Util.details_is_open = true;
			$('input[name="editable"]').bootstrapSwitch('state',false);
			$(".details-bar").toggleClass( "open" );
			$(".details").toggleClass("slide");
		}else{
			gtConstants.Util.details_is_open = false;
			resetDetailsData();
			$('input[name="editable"]').bootstrapSwitch('state',false);
			$(".details-bar").toggleClass( "open" );
			$(".details").toggleClass("slide");
		}
	});
	$(".add-button").click(function(){
		$("#add-form").scrollTop(0);
		$(".add-bar").toggleClass( "open" );
		$(".add").toggleClass("slide");
	});
	$("[name='editable']").bootstrapSwitch();
	$('input[name="editable"]').on('switchChange.bootstrapSwitch', function(ev,state){
		if(state == true){
			$('.details-panel').hide();
			$('.edit-form').show();
			loadDetailsEditor();
		} else{
			$('.edit-form').hide();
			$('.details-panel').show();
		}
	});
	$('.browse').click(function(){
		$('.file').trigger('click');
	});
	$('.file').on('change', function(){
		$('#inputUploadFN').val(this.value);
	});
	var today = new Date();
	var mm = today.getMonth()+1;
	var dd = today.getDate();
	var yyyy = today.getFullYear();
	var cur_date = mm+'/'+dd+'/'+yyyy;
	$('#datepick').attr("data-date", cur_date);
	$('#datepick').datepicker();
	$('#dp2').attr("data-date", cur_date);
	$('#dp2').datepicker();
	$('#jumpToCve').click(function(){
		var url = gtConstants.CVE.getUrl+gtConstants.CVE.setID;
		window.open(url, "_blank");
	});
	$('.edit-form').submit(function(event){
		event.preventDefault();
		record_index = gtConstants.Util.details_index;
		
		rev_date = $("#last_revised_input").val();
		prod_name = $("#product_name_input").val();
		impact_val = $("#impact_subscore_input").val();
		exploit_val = $("#exploitability_subscore_input").val();
		source_val = $("#source_input").val();
		integrity_val = $("#integrity_input").val();
		av_val = $("#access_vector_input").val();
		ac_val = $("#access_complexity_input").val();
		auth_val = $("#authentication_input").val();
		it_val = $("#impact_type_input").val();
		overview_val =$("#overview_input").val();
		var rec = ProductResultsStore.getAt(record_index);
		var state_val;
		var der_expl_val = Math.round(exploit_val);
		switch (der_expl_val){
			case(der_expl_val >= 8):
				state_val = "Critical";
				break;
			case(der_expl_val  >= 6 && der_expl_val < 8):
				state_val = "Major";
				break;
			case(der_expl_val >=4 && der_expl_val < 6):
				state_val = "Moderate";
				break;
			case(der_expl_val >=2 && der_expl_val < 4):
				state_val = "Minor";
				break;
			case(der_expl_val >=0 && der_expl_val < 2):
				state_val = "Normal";
				break;
		}
		
		rec.set('last_revised', rev_date);
		rec.set('product_name', prod_name);
		rec.set('impact_subscore', impact_val);
		rec.set('exploitability_subscore', exploit_val);
		rec.set('source', source_val);
		rec.set('state', state_val);
		rec.set('integrity', integrity_val);
		rec.set('access_vector', av_val);
		rec.set('access_complexity', ac_val);
		rec.set('authentication', auth_val);
		rec.set('impact_type', it_val);
		rec.set('overview', overview_val);
		
		$('#edit_reset').trigger("click");
		$('.details-button').trigger("click");
	});
	$('#add-form').submit(function(event){
		event.preventDefault();
		
		orig_date = $("#original_release_date_add_input").val();
		rev_date = $("#original_release_date_add_input").val();
		prod_name = $("#product_name_add_input").val();
		impact_val = $("#impact_subscore_add_input").val();
		exploit_val = $("#exploitability_subscore_add_input").val();
		source_val = $("#source_add_input").val();
		integrity_val = $("#integrity_add_input").val();
		av_val = $("#access_vector_add_input").val();
		ac_val = $("#access_complexity_add_input").val();
		auth_val = $("#authentication_add_input").val();
		it_val = $("#impact_type_add_input").val();
		overview_val =$("#overview_add_input").val();
		
		var state_val;
		var der_expl_val = Math.round(exploit_val);
		switch (der_expl_val){
			case(der_expl_val >= 8):
				state_val = "Critical";
				break;
			case(der_expl_val  >= 6 && der_expl_val < 8):
				state_val = "Major";
				break;
			case(der_expl_val >=4 && der_expl_val < 6):
				state_val = "Moderate";
				break;
			case(der_expl_val >=2 && der_expl_val < 4):
				state_val = "Minor";
				break;
			case(der_expl_val >=0 && der_expl_val < 2):
				state_val = "Normal";
				break;
		}
		
		ProductResultsStore.add({
			original_release_date: orig_date,
			last_revised: rev_date,
			product_name: prod_name,
			impact_subscore: impact_val,
			exploitability_subscore: exploit_val,
			source: source_val,
			state: state_val,
			integrity: integrity_val,
			access_vector: av_val,
			access_complexity: ac_val,
			authentication: auth_val,
			impact_type: it_val,
			overview: overview_val
		});
		
		$('#add_form_reset').trigger("click");
		$('.add-button').trigger("click");
	});
});