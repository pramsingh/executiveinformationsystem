Ext.Loader.setConfig({
    enabled: true
});
Ext.setGlyphFontFamily('FontAwesome');

var filterPanel = Ext.create('Ext.panel.Panel', {
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
    			glyph: 0xf12d
    		},{
    			xtype: 'button',
    			margin: '0 15 0 15',
    			text: 'Submit',
    			id: 'filterSubmitBtn',
    			glyph: 0xf1d8
        	}]
        },{
            region: 'center',
            border: false,
            frame: false,
            layout: 'fit',
            title: 'Results',
            cls: 'results-grid',
            items: [{
            	xtype: 'grid',
            	forceFit: true,
            	store: ProductResultsStore,
            	columns: [
					{text: 'Product Name', dataIndex: 'product_name'},
					{text: 'Score', dataIndex: 'score'},
					{text: 'Score Weight', dataIndex: 'score_weight'},
					{text: 'State', dataIndex: 'product_state'},
					{text: 'Source', dataIndex: 'source'},
					{text: 'Lessons Learned', dataIndex: 'lessons_learned'},
					{text: 'Impact', dataIndex: 'availability_impact'},
					{text: 'Authentication', dataIndex: 'authentication'}
            	]
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