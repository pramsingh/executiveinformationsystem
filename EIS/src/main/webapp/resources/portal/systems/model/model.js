Ext.define('SystemStateModel', {
	extend: 'Ext.data.Model',
	fields: [
	   {name: 'code', type: 'string'},
	   {name: 'description', type: 'string'}
	]
});

Ext.define('ProductSystemModel', {
	extend: 'Ext.data.Model',
	fields: [
	  {name: 'type', type: 'string'},
	  {name: 'description', type: 'string'}
	]
});

Ext.define('SystemStateLocationModel', {
	extend: 'Ext.data.Model',
	fields: [
	  {name: 'name', type: 'string'},
	  {name: 'abbreviation', type: 'string'}
	]
});

Ext.define('ProductsResultsModel', {
	extend: 'Ext.data.Model',
	fields: [
	   {name: 'product_name', type: 'string'},
	   {name: 'impact_subscore', type: 'float'},
	   {name: 'exploitability_subscore', type: 'float'},
	   {name: 'integrity', type: 'string'},
	   {name: 'source', type: 'string'},
	   {name: 'authentication', type: 'string'},
	   {name: 'access_vector', type: 'string'},
	   {name: 'access_complexity', type: 'string'},
	   {name: 'overview', type: 'string'},
	   {name: 'cve_id', type: 'string'},
	   {name: 'original_release_date', type: 'string'},
	   {name: 'last_revised', type: 'string'},
	   {name: 'impact_type', type: 'string'},
	   {name: 'state', type: 'string',
		   convert: function(val,row){
				var expl_val = Math.round(row.data.exploitability_subscore),
					 prod_state = "";
				switch (true){
					case(expl_val >= 8):
						prod_state = "Critical";
						break;
					case(expl_val  >= 6 && expl_val < 8):
						prod_state = "Major";
						break;
					case(expl_val >=4 && expl_val < 6):
						prod_state = "Moderate";
						break;
					case(expl_val >=2 && expl_val < 4):
						prod_state = "Minor";
						break;
					case(expl_val >=0 && expl_val < 2):
						prod_state = "Normal";
						break;
				}
			   return prod_state;
		   }
	   }
	]
});

Ext.define('SystemResultsModel', {
	extend: 'Ext.data.Model',
	fields: [
	   {name: 'system_name', type: 'string'},
	   {name: 'products', type: 'auto'},
	   {name: 'owner_name', type: 'string'},
	   {name: 'division', type: 'string'},
	   {name: 'location', type: 'auto'},
	   {name: 'contact', type: 'auto'},
	   {name: 'last_assessment_date', type: 'string'},
	   {name: 'location_city', mapping: 'location.city', type: 'string'},
	   {name: 'location_state', mapping: 'location.state', type: 'string'},
	   {name: 'location_dir', type: 'string',
		   convert: function(val,row){
			   return row.data.location.city + ", " + row.data.location.state;
		   }
	   },
	   {name: 'sso_name', mapping: 'contact.sso_name', type: 'string'},
	   {name: 'sso_email', mapping: 'contact.sso_email', type: 'string'},
	   {name: 'sso_phone', mapping: 'contact.sso_phone', type: 'string'},
	   {name: 'system_state', type: 'string',
		   convert: function(val,row){
			   	var sum = null,
					total = row.data.products.length,
					val = null,
					state = "";
				if (total > 0){
					for (var i = 0; i < total; i++){
						sum = sum + row.data.products[i].exploitability_subscore;
					}
				}
				val = sum / total;
				switch (true){
					case (val >= 7):
						state = "Major";
						break;
					case(val >= 4 && val < 7):
						state = "Minor";
						break;
					case(val >=0 && val < 4):
						state = "Normal";
						break;
				}
				return state;
		   }
	   },
	   {name: 'has_geo', type: 'string',
			convert: function(val,row){
				if (row.data.location.latitude != null && row.data.location.longitude != null){
					return true;
				} else {
					return false;
				}
			}
	   },
	   {name: 'product_list', type: 'string',
		   convert: function(val,row){
			   var prod_list = [];
			   if (row.data.products != null){
				   for (var i = 0; i < row.data.products.length; i++){
					   prod_list.push(row.data.products[i].product_name);
				   }
				   return prod_list.join(" ");
			   }
		   }
	   }
	]
});