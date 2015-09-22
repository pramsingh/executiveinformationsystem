Ext.define('projectFilterPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.projectFilterPanel',
	padding: '15 0 0 0',
	layout: {
		type: 'vbox'
		//align: 'center'
	},
	items: [{
		xtype: 'menuseparator',
		width: '100%'
	},{
		xtype: 'container',
		layout: {
			type: 'hbox'
		},
		items: [{		
			xtype: 'textfield',
			allowBlank: false,
			margin: '5 0 0 0',
			fieldLabel: 'Project Name',
			id: 'projectName',
			listeners: {
				specialkey: function(f,e){
					if (e.getKey() == e.ENTER){
						Ext.getCmp('projectFilterAddBtn').handler();
					}
				}
			}
		},{
			xtype: 'image',
			glyph: 0xf05a,
			margin: '9 5 5 8',
			cls: 'additionalInfo'
		}]
	},{
		xtype: 'container', //start of add field with buttons
		padding: '8 0 0 0',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'button',
			width: 75,
			text: 'Add',
			cls: 'addbtn',
			id: 'projectFilterAddBtn',
			glyph: 0xf055,
			handler: function(){
				addProjectNameFilter();
			}
		},{
			xtype: 'button',
			width: 75,
			margin: '0 15 0 15',
			text: 'Remove',
			cls: 'removebtn',
			disabled: true,
			id: 'projectFilterRemoveBtn',
			glyph: 0xf056,
			handler: function(){
				removeProjectNameFilter();
			}
		},{
			xtype: 'button',
			width: 75,
			text: 'Clear',
			disabled: true,
			id: 'projectFilterClearBtn',
			glyph: 0xf014,
			handler: function(){
				clearProjectNameFilter();
			}
		}] 
	},{ //end of add field with buttons
		xtype: 'grid',
		layout: 'fit',
		padding: '10 0 0 0',
		forceFit: true,
		columns: [{
			text: 'Name', dataIndex: 'projectName', flex: 1
		}],
		height: 90,
		width: "100%",
		store: ProjectFilterStore
	}]
});

Ext.define('productFilterPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.productFilterPanel',
	padding: '15 0 0 0',
	layout: {
		type: 'vbox'
	},
	items: [{
		xtype: 'menuseparator',
		width: '100%'
	},{
		xtype: 'container',
		padding: '2 0 0 0',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'textfield',
			padding: '5 0 0 0',
			fieldLabel: 'Product Name',
			id: 'productName',
			listeners: {
				specialkey: function(f,e){
					if(e.getKey() == e.ENTER){
						Ext.getCmp('productVersion').focus();
					}
				}
			}
		},{
			xtype: 'textfield',
			padding: '5 0 0 15',
			fieldLabel: 'Ver',
			labelWidth: 30,
			width: 90,
			id: 'productVersion',
			listeners: {
				specialkey: function(f,e){
					if(e.getKey() == e.ENTER){
						Ext.getCmp('productFilterAddBtn').handler();
					}
				}
			}
		},{
			xtype: 'image',
			glyph: 0xf05a,
			margin: '9 5 5 8',
			cls: 'additionalInfo'
		}]
	},{
		xtype: 'container',
		padding: '8 0 0 0',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'button',
			width: 75,
			text: 'Add',
			cls: 'addbtn',
			id: 'productFilterAddBtn',
			glyph: 0xf055,
			handler: function(){
				addProductNameFilter();
			}
		},{
			xtype: 'button',
			width: 75,
			margin: '0 15 0 15',
			text: 'Remove',
			cls: 'removebtn',
			disabled: true,
			id: 'productFilterRemoveBtn',
			glyph: 0xf056,
			handler: function(){
				removeProductNameFilter();
			}
		},{
			xtype: 'button',
			width: 75,
			text: 'Clear',
			disabled: true,
			id: 'productFilterClearBtn',
			glyph: 0xf014,
			handler: function(){
				clearProductNameFilter();
			}
		}]
	},{ //end of add field with buttons
		xtype: 'grid',
		layout: 'fit',
		padding: '10 0 0 0',
		forceFit: true,
		columns: [
		    {text: 'Name', dataIndex: 'productName', flex: 1},
		    {text: 'Version', dataIndex: 'productVersion'}
		],
		height: 90,
		width: "100%",
		store: ProductFilterStore
	}]
});

Ext.define('searchFilterPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.searchFilterPanel',
	padding: '15 0 0 0',
	layout: {
		type: 'vbox'
	},
	items: [{
		xtype: 'menuseparator',
		width: '100%'
	},{
		xtype: 'container',
		padding: '2 0 0 0',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'textfield',
			margin: '5 0 0 0',
			width: 350,
			fieldLabel: 'Text Search',
			id: 'searchValue',
			listeners: {
				specialkey: function(f,e){
					if(e.getKey() == e.ENTER){
						//todo ajax call
					}
				}
			}
		},{
			xtype: 'image',
			glyph: 0xf05a,
			margin: '9 5 5 8',
			cls: 'additionalInfo'
		}]
	},{
		xtype: 'container',
		padding: '8 0 0 0',
		items: [{
			xtype: 'button',
			width: 75,
			text: 'Execute',
			cls: 'executebtn',
			id: 'searchFilterBtn',
			glyph: 0xf0ec,
			handler: function(){
				//todo execute search ajax call
			}
		}]	
	}]
});