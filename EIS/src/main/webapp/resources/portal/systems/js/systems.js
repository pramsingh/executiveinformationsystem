$(document).ready(function(){
	window.addEventListener('storage', function(ev){
		var upIndex = localStorage.getItem("updateProdIndex");
		if (upIndex != null){
			var rec = ProductResultsStore.getAt(upIndex);
			var upVal = JSON.parse(localStorage.getItem("updateProduct"));
			upVal.exploitability_subscore = parseFloat(upVal.exploitability_subscore)
			upVal.impact_subscore = parseFloat(upVal.impact_subscore)
			rec.set(upVal);
			
			var pName = upVal.product_name,
				pScore = upVal.exploitability_subscore,
				store = SystemResultsStore.data.items,
				stLength = store.length;
			for (var i = 0; i < stLength; i++){
				var stPLength = store[i].data.products.length,
					stPList = store[i].data.products,
					plExpl = null,
					total = null,
					sys_state_val = "";
				for (var x = 0; x < stPLength; x++){
					if (stPList[x].product_name == pName){
						stPList[x].exploitability_subscore = pScore;
					}
					plExpl = plExpl + stPList[x].exploitability_subscore;
				}
				total = plExpl / stPLength;
				switch (true){
					case (total >= 7):
						sys_state_val = "Major";
						break;
					case(total >= 4 && total < 7):
						sys_state_val = "Minor";
						break;
					case(total >=0 && total < 4):
						sys_state_val = "Normal";
						break;
				}
				
				var cur_state = store[i].data.system_state;
				if (cur_state != sys_state_val){
					store[i].data.system_state = sys_state_val;
					var ikey = "sysIndex"+i,
						vkey = "sysUpdate"+i;
					localStorage.setItem(ikey, i);
					localStorage.setItem(vkey, JSON.stringify(store[i].data));
				}
				cur_state = sys_state_val;
				
				var mark_status = "";
				
				switch(sys_state_val){
					case "Major":
						mark_status = '<i class="fa fa-exclamation-circle" style="width: 40%;float:right;color:red;" data-qtip="System Status: Major"></i>';
						break;
					case "Minor":
						mark_status = '<i class="fa fa-exclamation-triangle" style="width: 40%;float:right;color:yellow;" data-qtip="System Status: Minor"></i>';
						break;
					case "Normal":
						mark_status = '<i class="fa fa-star" style="width: 40%;float:right;color:green;" data-qtip="System Status: Normal"></i>';
						break;
				}
				$(".x-grid-table tbody")[1].childNodes[i].cells[0].childNodes[0].childNodes[1].outerHTML = mark_status;
			}
			
			localStorage.removeItem("updateProdIndex");
			localStorage.removeItem("updateProduct");
		}
		var pval = JSON.parse(localStorage.getItem("newProduct"));
		if (pval != null){
			ProductResultsStore.add(pval);
			localStorage.removeItem("newProduct");
		}
	});
	$(".details-button").click(function(){
		$('#state_list').load('partials/state_list.html');
		$("#city_input").popover('hide');
		$("#city_input").css("background-color","white");
		$(".edit-form").scrollTop(0);
		if (gtConstants.Util.details_is_open == false){
			gtConstants.Util.details_is_open = true;
			$('input[name="editable"]').bootstrapSwitch('state',false);
			$(".details-bar").toggleClass( "open" );
			if (window.innerHeight < 925){
				var setHeight = window.innerHeight - 250,
					heightVal = setHeight + "px";
				$(".details-panel").css({"height":heightVal,"overflow-y":"auto"});
			}
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
		$("#city_add_input").popover('hide');
		$("#city_add_input").css("background-color","white");
		getProductList();
		$('#state_add_list').load('partials/state_list.html');
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
	$("#edit_reset").click(function(){
		$('#product_list').val("").change();
	});
	$("#add_form_reset").click(function(){
		$('#product_add_list').val("").change();
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

	$('#jumpToGeo').click(function(){
		localStorage.setItem('jumpLoc', JSON.stringify(window.gtConstants.Util.details_data));
		window.open("../geospatial/index.html", "_blank");
	});
	$('.edit-form').submit(function(event){
		event.preventDefault();
		var loc_lat_val,
			loc_lon_val,
			record_index = gtConstants.Util.details_index,
			last_date = $("#last_assessment_date_input").val(),
			sys_name = $("#system_name_input").val(),
			own_val = $("#owner_name_input").val(),
			div_val = $("#division_input").val(),
			selected_products = $("#product_list").val(),
			flat_prod_list,
			prod_list = [],
			expl_val = null,
			der_expl_val = 0,
			has_geo = false,
			count = selected_products.length,
			loc_state_val = $("#state_list").val(),
			loc_city_val = $("#city_input").val(),
			sso_name_val = $("#sso_name_input").val(),
			sso_email_val = $("#sso_email_input").val(),
			sso_phone_val =$("#sso_phone_input").val(),
			sys_state_val = "",
			total = null,
			rec = SystemResultsStore.getAt(record_index);
		
		$(selected_products).each(function(i,val){
			expl_val = ProductResultsStore.findRecord("product_name",val).data.exploitability_subscore;
			der_expl_val = der_expl_val + expl_val;
			prod_list.push({"product_name": val, "exploitability_subscore": expl_val});
		});
		
		flat_prod_list = selected_products.join(" ");
		total = der_expl_val / count;
		switch (true){
			case (total >= 7):
				sys_state_val = "Major";
				break;
			case(total >= 4 && total < 7):
				sys_state_val = "Minor";
				break;
			case(total >=0 && total < 4):
				sys_state_val = "Normal";
				break;
		}
		var url = gtConstants.MAP.getLookUp;
		url = url.replace("[city],[state]",loc_city_val+','+loc_state_val);
		
		function getData(){
			return $.ajax({
				url: url,
				type: 'GET'
			});
		};
		
		function handleData(data){
			if (data.status != "ZERO_RESULTS"){
				loc_lat_val = data.results[0].geometry.location.lat;
				loc_lon_val = data.results[0].geometry.location.lng;
				loc_city_val = data.results[0].address_components[0].long_name;
				if (loc_lat_val != null && loc_lon_val != null){
					has_geo = true;
				}			
				var location = {"latitude": loc_lat_val, 
								"longitude": loc_lon_val, 
								"city": loc_city_val,
								"state": loc_state_val
				};
				var contact = {"sso_name": sso_name_val,
							   "sso_email": sso_email_val,
							   "sso_phone": sso_phone_val
						
				};
				var loc_dir = loc_city_val +', '+loc_state_val;
				var updateRec = {
					"last_assessment_date": last_date,
					"system_name": sys_name,
					"system_state": sys_state_val,
					"owner_name": own_val,
					"division": div_val,
					"products": prod_list,
					"product_list": flat_prod_list,
					"location_state": loc_state_val,
					"location_city": loc_city_val,
					"location": location,
					"location_dir": loc_dir,
					"has_geo": has_geo,
					"contact": contact,
					"sso_name": sso_name_val,
					"sso_email": sso_email_val,
					"sso_phone": sso_phone_val	
				}
				rec.set(updateRec);
				localStorage.setItem("updateIndex", record_index);
				localStorage.setItem("updateSystem", JSON.stringify(updateRec));
				
				$('#edit_reset').trigger("click");
				$('.details-button').trigger("click");
			} else{
				$("#city_input").css("background-color","red");
				$("#city_input").popover({
					trigger: 'manual',
					placement: 'bottom',
					title: "City Not Found",
					content: "Please check the spelling of the city."
				});
				$("#city_input").popover('show');
			}
		};
		getData().done(handleData);
	});
	$('#add-form').submit(function(event){
		event.preventDefault();
		var selected_products = $("#product_add_list").val(),
			prod_list = [],
			flat_prod_list,
			expl_val = null,
			der_expl_val = 0,
			count = selected_products.length,
			sys_state_val,
			loc_lat_val,
			loc_lon_val,
			total = null,
			has_geo = false,
			last_date = $("#last_assessment_date_add_input").val(),
			sys_name = $("#system_name_add_input").val(),
			own_val = $("#owner_name_add_input").val(),
			div_val = $("#division_add_input").val(),
			loc_state_val = $("#state_add_list").val(),
			loc_city_val = $("#city_add_input").val(),
			sso_name_val = $("#sso_name_add_input").val(),
			sso_email_val = $("#sso_email_add_input").val(),
			sso_phone_val = $("#sso_phone_add_input").val();
		
		
		$(selected_products).each(function(i,val){
			expl_val = ProductResultsStore.findRecord("product_name",val).data.exploitability_subscore;
			der_expl_val = der_expl_val + expl_val;
			prod_list.push({"product_name": val, "exploitability_subscore": expl_val});
		});
		
		flat_prod_list = selected_products.join(" ");
		total = der_expl_val / count;
		switch (true){
			case (total >= 7):
				sys_state_val = "Major";
				break;
			case(total >= 4 && total < 7):
				sys_state_val = "Minor";
				break;
			case(total >=0 && total < 4):
				sys_state_val = "Normal";
				break;
		}
		
		var url = gtConstants.MAP.getLookUp;
		url = url.replace("[city],[state]",loc_city_val+','+loc_state_val);
		
		function getData(){
			return $.ajax({
				url: url,
				type: 'GET'
			});
		};
		
		function handleData(data){
			if (data.status != "ZERO_RESULTS"){
				loc_lat_val = data.results[0].geometry.location.lat;
				loc_lon_val = data.results[0].geometry.location.lng;
				loc_city_val = data.results[0].address_components[0].long_name;
				if (loc_lat_val != null && loc_lon_val != null){
					has_geo = true;
				}			
				var location = {"latitude": loc_lat_val, 
								"longitude": loc_lon_val, 
								"city": loc_city_val,
								"state": loc_state_val
				};
				var contact = {"sso_name": sso_name_val,
							   "sso_email": sso_email_val,
							   "sso_phone": sso_phone_val
						
				};
				var loc_dir = loc_city_val +', '+loc_state_val;
				var newRec = {
					"last_assessment_date": last_date,
					"system_name": sys_name,
					"system_state": sys_state_val,
					"owner_name": own_val,
					"division": div_val,
					"products": prod_list,
					"product_list": flat_prod_list,
					"location_state": loc_state_val,
					"location_city": loc_city_val,
					"location": location,
					"location_dir": loc_dir,
					"has_geo": has_geo,
					"contact": contact,
					"sso_name": sso_name_val,
					"sso_email": sso_email_val,
					"sso_phone": sso_phone_val	
				}
				SystemResultsStore.add(newRec);
				localStorage.setItem("newSystem", JSON.stringify(newRec));

				$('#add_form_reset').trigger("click");
				$('.add-button').trigger("click");
			} else{
				$("#city_add_input").css("background-color","red");
				$("#city_add_input").popover({
					trigger: 'manual',
					placement: 'bottom',
					title: "City Not Found",
					content: "Please check the spelling of the city."
				});
				$("#city_add_input").popover('show');
			}
		};
		getData().done(handleData);
	});
});