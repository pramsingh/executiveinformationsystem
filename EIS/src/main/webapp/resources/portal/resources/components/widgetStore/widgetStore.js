var ProjectFilterStore = Ext.create('Ext.data.Store', {
	fields: ['projectName'],
	listeners: {
		'add': function(){
			if (this.getCount() > 0){
				Ext.getCmp('projectFilterRemoveBtn').enable();
				Ext.getCmp('projectFilterClearBtn').enable();
			} else {
				Ext.getCmp('projectFilterRemoveBtn').disable();
				Ext.getCmp('projectFilterClearBtn').disable();
			}
		},
		'remove': function(){
			if (this.getCount() > 0){
				Ext.getCmp('projectFilterRemoveBtn').enable();
				Ext.getCmp('projectFilterClearBtn').enable();
			} else {
				Ext.getCmp('projectFilterRemoveBtn').disable();
				Ext.getCmp('projectFilterClearBtn').disable();
			}
		},
		'bulkremove': function(){
			if (this.getCount() > 0){
				Ext.getCmp('projectFilterRemoveBtn').enable();
				Ext.getCmp('projectFilterClearBtn').enable();
			} else {
				Ext.getCmp('projectFilterRemoveBtn').disable();
				Ext.getCmp('projectFilterClearBtn').disable();
			}
		}
	}
});

var ProductFilterStore = Ext.create('Ext.data.Store', {
	fields: ['productName','productVersion'],
	listeners: {
		'add': function(){
			if (this.getCount() > 0){
				Ext.getCmp('productFilterRemoveBtn').enable();
				Ext.getCmp('productFilterClearBtn').enable();
			} else {
				Ext.getCmp('productFilterRemoveBtn').disable();
				Ext.getCmp('productFilterClearBtn').disable();
			}
		},
		'remove': function(){
			if (this.getCount() > 0){
				Ext.getCmp('productFilterRemoveBtn').enable();
				Ext.getCmp('productFilterClearBtn').enable();
			} else {
				Ext.getCmp('productFilterRemoveBtn').disable();
				Ext.getCmp('productFilterClearBtn').disable();
			}
		},
		'bulkremove': function(){
			if (this.getCount() > 0){
				Ext.getCmp('productFilterRemoveBtn').enable();
				Ext.getCmp('productFilterClearBtn').enable();
			} else {
				Ext.getCmp('productFilterRemoveBtn').disable();
				Ext.getCmp('productFilterClearBtn').disable();
			}
		}
	}
});