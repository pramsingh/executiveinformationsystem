Ext.Loader.setConfig({
    enabled: true
});
Ext.setGlyphFontFamily('FontAwesome');

var filtering = Ext.create('Ext.panel.Panel', {
	bodyPadding: 8,
	border: false,
    frame: false,
	items: [{
		xtype: 'combo',
        fieldLabel: 'Product State',
        queryMode: 'local',
        displayField: 'description',
        valueField: 'code',
        store: ProductStateStore
    },{
    	xtype: 'combo',
    	padding: '10 0 0 0',
    	fieldLabel: 'Product System',
    	queryMode: 'local',
    	displayField: 'description',
    	valueField: 'type',
    	store: ProductSystemStore
    },{
    	xtype: 'container', // custom components defined in components widgets
    	items: [{
    		xtype: 'projectFilterPanel'
    	},{
    		xtype: 'productFilterPanel'
    	},{
    		xtype: 'searchFilterPanel'
    	}]
	}]
});

var results = Ext.create('Ext.panel.Panel', {
	border: false,
	frame: false,
	layout: 'fit',
	cls: 'results-grid',
	items: [{
		xtype: 'grid',
		forceFit: true,
		store: ProductResultsStore,
		columns: [
		   {text: 'Product Name', dataIndex: 'product_name'},
		   {text: 'Version', dataIndex: 'version'},
		   {text: 'Latitude', dataIndex: 'latitude'},
		   {text: 'Longitude', dataIndex: 'longitude'},
		   {text: 'State', dataIndex: 'product_state'}
		],
		listeners: {
			celldblclick: function(td, cellIndex, record, tr, rowIndex, e, eOpts){
				reCenterMap(tr.data.latitude,tr.data.longitude);
			}
		}
	}]
});

var filterPanel = Ext.create('Ext.panel.Panel', {
	border: false,
    frame: false,
	layout: {
		type: 'accordion',
		titleCollapse: false,
		animate: true
	},
	items: [{
		title: 'Products',
		width: 400,
		height: window.innerHeight - 164,
		items: [results]
	},{
		title: 'Filter',
		width: 400,
		height: window.innerHeight - 164,
		items: [filtering],
			bbar: [{
	    		xtype: 'tbfill'
	    	},{
				xtype: 'button',
				text: 'Clear',
				id: 'filterClearBtn',
				glyph: 0xf12d
			},{
				xtype: 'button',
				margin: '0 15 0 15',
				text: 'Submit',
				id: 'filterSubmitBtn',
				glyph: 0xf1d8
	    	}]
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
            html: '<iframe width="100%" height="130px" frameborder="0" src="../resources/components/dashboardHeader/gtheader.html"></iframe>'
        },{
            region: 'west',
            border: false,
            frame: false,
            title: 'Results',
            cls: 'filter-panel',
            collapsible: true,
            collapsed: true,
            layout: 'absolute',
            split: true,
            width: 400,
            items: [filterPanel]        	
        },{
            region: 'center',
            border: false,
            frame: false,
            layout: 'fit',
            height: '100%',
            width: '100%',
            html: '<div id="map"></div>'
        }]
    });
});