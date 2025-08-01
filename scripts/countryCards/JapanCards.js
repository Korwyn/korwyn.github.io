let japanControled = {};

function japanDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let japanDefaults = {
		j1: new Territory("J1", "Imperial Japan", "japan", 8, { iron: 2, osr: 2 }, { iron: 1, osr: 2 }, false),
		j2: new Territory("J2", "Korea", "japan", 2, { iron: 1, osr: 1 }, { osr: 1 }, false),
		j3: new Territory("J3", "Manchuria", "japan", 3, { iron: 3, osr: 1 }, { iron: 2, osr: 1 }, false),
		j4: new Territory("J4", "Peiping", "japan", 2, { iron: 1, osr: 2 }, { osr: 2 }, false),
		j5: new Territory("J5", "Chekiang Kwangtung", "japan", 2, { iron: 2, osr: 1 }, { iron: 1, osr: 1 }, false),
		j6: new Territory("J6", "Indochina", "japan", 1, { osr: 1 }, {}, false),
		j7: new Territory("J7", "Thailand", "japan", 1, { osr: 2 }, { osr: 1 }, false),
		j8: new Territory("J8", "Burma", "japan", 1, { osr: 1 }, {}, false),
		j9: new Territory("J9", "Malaya", "japan", 2, { osr: 2 }, { osr: 1 }, false),
		j10: new Territory("J10", "Sumatra", "japan", 2, { oil: 3 }, { oil: 2 }, false),
		j11: new Territory("J11", "Java", "japan", 2, { oil: 2 }, { oil: 1 }, false),
		j12: new Territory("J12", "Borneo", "japan", 2, { oil: 2, osr: 1 }, { oil: 1, osr: 1 }, false),
		j13: new Territory("J13", "Celebes", "japan", 0, {}, {}, false),
		j14: new Territory("J14", "Philippines", "japan", 2, { iron: 1, osr: 2 }, { osr: 2 }, false),
		j15: new Territory("J15", "Hainan", "japan", 0, {}, {}, false),
		j16: new Territory("J16", "Formosa", "japan", 1, {}, {}, false),
		j17: new Territory("J17", "Okinawa", "japan", 1, {}, {}, false),
		j18: new Territory("J18", "Palau", "japan", 0, {}, {}, false),
		j19: new Territory("J19", "Japanese Sakhalin Island", "japan", 0, {}, {}, false),
		j20: new Territory("J20", "Iwo Jima", "japan", 1, {}, {}, false),
		j21: new Territory("J21", "Mariana Islands", "japan", 0, {}, {}, false),
		j22: new Territory("J22", "Caroline Islands", "japan", 2, {}, {}, false),
		j23: new Territory("J23", "New Britain", "japan", 1, {}, {}, false),
		j24: new Territory("J24", "New Guinea", "japan", 1, {}, {}, false),
		j25: new Territory("J25", "Solomon Islands", "japan", 1, {}, {}, true),
		j26: new Territory("J26", "Wake Island", "japan", 0, {}, {}, false),
		j27: new Territory("J27", "Marshall Islands", "japan", 0, {}, {}, false),
		j28: new Territory("J28", "Gilbert Islands", "japan", 0, {}, {}, false)
	};

	return japanDefaults;
}

function setJapanDefault() {
	japanControled = japanDefault();
}

setJapanDefault();