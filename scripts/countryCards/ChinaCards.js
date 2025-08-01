let chinaControled = {};

function chinaDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let chinaDefaults = {
		c1: new Territory("C1", "Honan", "china", 1, { osr: 1 }, {}, false),
		c2: new Territory("C2", "Kwangsi", "china", 1, { osr: 1 }, { osr: 0 }, false),
		c3: new Territory("C3", "Szechwan", "china", 1, { osr: 2 }, { osr: 1 }, false),
		c4: new Territory("C4", "Tsinghai Ningsia", "china", 2, { iron: 1, osr: 2 }, { osr: 2 }, false),
		c5: new Territory("C5", "Sinkiang", "china", 1, {iron: 1}, {}, false),
	};

	return chinaDefaults;
}

function setChinaDefault(){
	chinaControled = chinaDefault();
}

setChinaDefault();