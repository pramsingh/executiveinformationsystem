var gtConstants = gtConstants || {};

gtConstants.Util = gtConstants.Util || {};
gtConstants.URI = gtConstants.URI || {};
gtConstants.MAP = gtConstants.MAP || {};
gtConstants.CVE = gtConstants.CVE || {};

gtConstants.Util = {
	details_is_open: false,
	details_data: null,
	details_index: null
};

gtConstants.URI = {
	getProducts: "/systemProducts"
};

gtConstants.MAP = {
	getMap: "https://www.google.com/maps/embed/v1/place?key=AIzaSyCuyBrF3nvxKDKPoobacpXq5lia8yBJIeo&q=near+20774"
};

gtConstants.CVE = {
	setID: null,
	getUrl: "https://web.nvd.nist.gov/view/vuln/detail?vulnId="	
};