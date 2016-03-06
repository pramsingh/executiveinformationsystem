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