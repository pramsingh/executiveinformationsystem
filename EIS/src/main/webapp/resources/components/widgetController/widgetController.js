function addProjectNameFilter(){
	ProjectFilterStore.add({projectName: Ext.getCmp('projectName').value});
	Ext.getCmp('projectName').reset();
	Ext.getCmp('projectName').focus();
};

function removeProjectNameFilter(){
	var removalIndex = ProjectFilterStore.find("projectName",Ext.getCmp('projectName').value);
	if (removalIndex > -1){
		ProjectFilterStore.removeAt(removalIndex);
	}//add else to prompt user of invalid removal entry
	Ext.getCmp('projectName').reset();
};

function clearProjectNameFilter(){
	ProjectFilterStore.removeAll();
};

function addProductNameFilter(){
	ProductFilterStore.add({productName: Ext.getCmp('productName').value, productVersion: Ext.getCmp('productVersion').value});
	Ext.getCmp('productName').reset();
	Ext.getCmp('productVersion').reset();
	Ext.getCmp('productName').focus();
};

function removeProductNameFilter(){
	var removalIndex = ProductFilterStore.find("productName", Ext.getCmp('productName').value);
	if (removalIndex > -1){
		ProductFilterStore.removeAt(removalIndex);
	}
	Ext.getCmp('productName').reset();
	Ext.getCmp('productVersion').reset();
};

function clearProductNameFilter(){
	ProductFilterStore.removeAll();
};