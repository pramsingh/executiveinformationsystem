Ext.setGlyphFontFamily('FontAwesome');
Ext.tip.QuickTipManager.init();
Ext.Loader.setConfig({
    enabled: true
});

var filterPanel = Ext.create('Ext.panel.Panel', {
	bodyPadding: 8,
	border: false,
    frame: false,
	items: [{
		xtype: 'combo',
        fieldLabel: 'System State',
        id: 'combo_system_state',
        queryMode: 'local',
        displayField: 'code',
        valueField: 'description',
        store: SystemStateStore
	  },{
		xtype: 'container',
		layout: {
			type: 'hbox'
		},
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Product Name',
			id: 'tf_product_name'
		  },{
			xtype: 'image',
			glyph: 0xf05a,
			margin: '2 5 15 8',
			listeners: {
				afterrender: function(c){
					Ext.create('Ext.tip.ToolTip', {
						target: c.getEl(),
						html: 'Product Name can contain wildcards'
					});
				}
			}
		}]
	  },{
		xtype: 'mouseseparator',
		width: '100%'
	  },{
		xtype: 'label',
		margin: '25 0 0 0',
		text: 'Location',
		style: {
			color: '#ffffff'
		}
	  },{
		xtype: 'container',
		padding: 5,
		border: 1,
		style: {
			borderColor: 'white',
			borderStyle: 'solid'
		},
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'textfield',
			id: 'tf_city',
			fieldLabel: 'City'
		},{
			xtype: 'combobox',
			id: 'cb_state',
			store: SystemStateLocationStore,
			fieldLabel: 'State',
			queryMode: 'remote',
			displayField: 'name',
			valueField: 'abbreviation'
		}]
//	  },{
//	    xtype: 'mouseseparator',
//	    width: '100%'
//	  },{
//		  xtype: 'label',
//			margin: '25 0 0 0',
//			text: 'Exploitability Range',
//			style: {
//				color: '#ffffff'
//			}
//		  },{
//			xtype: 'container',
//			padding: 5,
//			border: 1,
//			style: {
//				borderColor: 'white',
//				borderStyle: 'solid'
//			},
//			layout: {
//				type: 'vbox'
//			},
//			items: [{
//				xtype: 'numberfield',
//				id: 'nf_expl_start',
//				fieldLabel: 'Low',
//				maxValue: 10,
//				minValue: 0
//			},{
//				xtype: 'numberfield',
//				id: 'nf_expl_stop',
//				fieldLabel: 'High',
//				maxValue: 10,
//				minValue: 0
//			}]
//    },{
//    	xtype: 'combo',
//    	padding: '10 0 0 0',
//    	fieldLabel: 'Product System',
//    	queryMode: 'local',
//    	displayField: 'description',
//    	valueField: 'type',
//    	store: ProductSystemStore
//    },{
//    	xtype: 'container', // custom components defined in components widgets
//    	items: [{
//    		xtype: 'projectFilterPanel'
//    	},{
//    		xtype: 'productFilterPanel'
//    	},{
//    		xtype: 'searchFilterPanel'
//    	}]
	}]
});

Ext.onReady(function() {
	Ext.create('Ext.Viewport', {
        layout: {
            type: 'border'
        },
        border: false,
        frame: false,
        items: [{
            region: 'north',
            border: false,
            frame: false,
            height: 110,
            width: '100%',
            html: '<iframe id="header" width="100%" height="130px" frameborder="0" src="../resources/components/dashboardHeader/gtheader.html"></iframe>'
        },{
            region: 'west',
            border: false,
            frame: false,
            title: 'Filter',
            cls: 'filter-panel',
            collapsible: true,
            layout: 'absolute',
            split: true,
            width: 400,
            items: [filterPanel],
        	bbar: [{
        		xtype: 'tbfill'
        	},{
    			xtype: 'button',
    			text: 'Clear',
    			id: 'filterClearBtn',
    			glyph: 0xf12d,
    			handler: function(){
    				clearSysFilters();
    			}
    		},{
    			xtype: 'button',
    			margin: '0 15 0 15',
    			text: 'Submit',
    			id: 'filterSubmitBtn',
    			glyph: 0xf1d8,
    			handler: function(){
    				submitSysFilters();    				
    			}
        	}]
        },{
            region: 'center',
            border: false,
            frame: false,
            layout: 'fit',
            title: 'Results',
            cls: 'results-grid',
            id: 'SystemResultsGrid',
            items: [{
            	xtype: 'grid',
            	forceFit: true,
            	store: SystemResultsStore,
            	columns: [
					{dataIndex: 'has_geo', width: 30,
						renderer: function(value, meta){
							var sys_state = meta.record.data.system_state,
								 mark_geo = '<i class="fa fa-globe" style="width: 40%;float:left;"></i>',
								 mark_status = "";
							
							switch(sys_state){
								case "Major":
									mark_status = '<i class="fa fa-exclamation-circle" style="width: 40%;float:right;color:red;" data-qtip="System Status: Major"></i>';
									break;
								case "Minor":
									mark_status = '</i><i class="fa fa-exclamation-triangle" style="width: 40%;float:right;color:yellow;" data-qtip="System Status: Minor"></i>';
									break;
								case "Normal":
									mark_status = '</i><i class="fa fa-star" style="width: 40%;float:right;color:green;" data-qtip="System Status: Normal"></i>';
									break;
							}
							
							if (value == true){
								return mark_geo + mark_status;
							} else {
								return mark_status;
							}
						}
					},
            	    {text: 'System Name', dataIndex: 'system_name'},
            	    {text: 'Owner', dataIndex: 'owner_name'},
					{text: 'Division', dataIndex: 'division'},
					{text: 'City', dataIndex: 'location_city'},
					{text: 'State', dataIndex: 'location_state'}
            	],
				listeners: {
					itemclick: function(){
						if (gtConstants.Util.details_is_open == true){
							$(".details-button").trigger("click");
						}
					},
					itemdblclick: function(dv, record, item, index, e){
						$(".details-button").trigger("click");
						gtConstants.Util.details_index = index;
						gtConstants.Util.details_data = record.data;
						gtConstants.CVE.setID = record.data.cve_id;
						loadDetailsData();
					}
				}
            }],
        	bbar: [{
        		xtype: 'tbfill'
        	},{
        		xtype: 'button',
        		text: 'Export',
        		id: 'resultsExport',
        		glyph: 0xf045
        	}]
        }]
    });
});