Ext.define('ProductStateModel', {
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