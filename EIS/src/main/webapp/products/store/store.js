var ProductStateStore = Ext.create('Ext.data.Store', {
	model: 'ProductStateModel',
	data: [
        {code:"Active", description:"Active"},
        {code:"Code", description:"Code"},
        {code:"Unit Test", description:"Unit Test"}
    ]
});

var ProductSystemStore = Ext.create('Ext.data.Store', {
	model: 'ProductSystemModel',
	data: [
	   {type: 'System A', description: 'System A'},
	   {type: 'System B', description: 'System B'},
	   {type: 'System C', description: 'System C'},
	   {type: 'System D', description: 'System D'}
	]
});

var ProductResultsStore = Ext.create('Ext.data.Store', {
	model: 'ProductsResultsModel',
	data: [
	   {name: 'Washington', version: '2015', branch: 'DC', teamName: 'Redskins', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC East'},
	   {name: 'Philadelphia', version: '2015', branch: 'PA', teamName: 'Eagles', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC East'},
	   {name: 'Dallas', version: '2015', branch: 'TX', teamName: 'Cowboys', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC East'},
	   {name: 'New York', version: '2015', branch: 'NY', teamName: 'Giants', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC East'},
	   {name: 'Chicago', version: '2015', branch: 'IL', teamName: 'Bears', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC North'},
	   {name: 'Minnesota', version: '2015', branch: 'MN', teamName: 'Vikings', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC North'},
	   {name: 'Green Bay', version: '2015', branch: 'WI', teamName: 'Packers', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC North'},
	   {name: 'Detroit', version: '2015', branch: 'MI', teamName: 'Lions', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC North'},
	   {name: 'Atlanta', version: '2015', branch: 'GA', teamName: 'Falcons', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC South'},
	   {name: 'Tampa Bay', version: '2015', branch: 'FL', teamName: 'Buccaneers', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC South'},
	   {name: 'New Orleans', version: '2015', branch: 'LA', teamName: 'Saints', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC South'},
	   {name: 'Carolina', version: '2015', branch: 'SC', teamName: 'Panthers', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC South'},
	   {name: 'St. Louis', version: '2015', branch: 'MO', teamName: 'Rams', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC West'},
	   {name: 'Seattle', version: '2015', branch: 'WA', teamName: 'Seahawks', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC West'},
	   {name: 'San Francisco', version: '2015', branch: 'CA', teamName: '49ers', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC West'},
	   {name: 'Arizona', version: '2015', branch: 'AZ', teamName: 'Cardinals', type: 'Football', category: 'NFL', systemType: 'NFC', projectName: 'NFC West'},
	   {name: 'Buffalo', version: '2015', branch: 'NY', teamName: 'Bills', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC East'},
	   {name: 'New York', version: '2015', branch: 'NY', teamName: 'Jets', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC East'},
	   {name: 'New England', version: '2015', branch: 'NE', teamName: 'Patriots', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC East'},
	   {name: 'Miami', version: '2015', branch: 'FL', teamName: 'Dolphins', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC East'},
	   {name: 'Baltimore', version: '2015', branch: 'MD', teamName: 'Ravens', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC North'},
	   {name: 'Pittsburg', version: '2015', branch: 'PA', teamName: 'Steelers', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC North'},
	   {name: 'Cleveland', version: '2015', branch: 'OH', teamName: 'Browns', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC North'},
	   {name: 'Cincinnati', version: '2015', branch: 'OH', teamName: 'Bengals', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC North'},
	   {name: 'Tennessee', version: '2015', branch: 'TN', teamName: 'Titans', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC South'},
	   {name: 'Jacksonville', version: '2015', branch: 'FL', teamName: 'Jaguars', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC South'},
	   {name: 'Indianapolis', version: '2015', branch: 'IN', teamName: 'Colts', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC South'},
	   {name: 'Houston', version: '2015', branch: 'TX', teamName: 'Texans', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC South'},
	   {name: 'Denver', version: '2015', branch: 'CO', teamName: 'Broncos', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC West'},
	   {name: 'San Diego', version: '2015', branch: 'CA', teamName: 'Chargers', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC West'},
	   {name: 'Oakland', version: '2015', branch: 'CA', teamName: 'Raiders', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC West'},
	   {name: 'Kansas City', version: '2015', branch: 'MO', teamName: 'Chiefs', type: 'Football', category: 'NFL', systemType: 'AFC', projectName: 'AFC West'}
	]
});