let ukControled = {};

function ukDefault() {
	//id, name, countryControlled, owner, stressValue, baseProduction, embattledProduction, isEmbattled
	let ukDefaults = {
		b1: new Territory("B1", "Great Britain", "uk", "uk", 8, { iron: 1, osr: 2 }, { osr: 2 }, false),
		b2: new Territory("B2", "Azores", "uk", "uk", 0, {}, {}, false),
		b3: new Territory("B3", "Gibraltar", "uk", "uk", 1, {}, {}, false),
		b4: new Territory("B4", "Malta", "uk", "uk", 1, {}, { }, false),
		b5: new Territory("B5", "Egypt", "uk", "uk", 3, { oil: 1 }, {}, false),
		b6: new Territory("B6", "Sudan", "uk", "uk", 1, {}, {}, false),
		b7: new Territory("B7", "Horn of Africa", "uk", "uk", 1, {}, {}, false),
		b8: new Territory("B8", "British East Africa", "uk", "uk", 1, { osr: 1 }, {}, false),
		b9: new Territory("B9", "Rhodesia", "uk", "uk", 1, { osr: 1 }, {}, false),
		b10: new Territory("B10", "South Africa", "uk", "uk", 3, { iron: 1, osr: 1 }, { osr: 1 }, false),
		b11: new Territory("B11", "Beigian Congo", "uk", "uk", 1, { osr: 1 }, {}, false),
		b12: new Territory("B12", "French Equatorial Africa", "uk", "uk", 0, {}, {}, false),
		b13: new Territory("B13", "Nigera Cameroon", "uk", "uk", 1, { iron: 1 }, {}, false),
		b14: new Territory("B14", "Gold Coast", "uk", "uk", 1, { osr: 1 }, {}, false),
		b15: new Territory("B15", "Sierra Leone", "uk", "uk", 1, {}, {}, false),
		b16: new Territory("B16", "Middle East", "uk", "uk", 3, { oil: 2 }, { oil: 1 }, false),
		b17: new Territory("B17", "Iran", "uk", "uk", 2, { oil: 1 }, {}, false),
		b18: new Territory("B18", "India", "uk", "uk", 5, { osr: 2 }, { osr: 1 }, false),
		b19: new Territory("B19", "Ceylon", "uk", "uk", 0, {}, {}, false),
		b20: new Territory("B20", "Maldives", "uk", "uk", 0, {}, {}, false),
		b21: new Territory("B21", "Western Australia", "uk", "uk", 1, { osr: 1 }, {}, false),
		b22: new Territory("B22", "Northern Territory", "uk", "uk", 1, { osr: 1 }, {}, false),
		b23: new Territory("B23", "South Australia", "uk", "uk", 2, { iron: 1 }, {}, false),
		b24: new Territory("B24", "Eastern Australia", "uk", "uk", 3, { iron: 1, osr: 1 }, { osr: 1 }, false),
		b25: new Territory("B25", "Papua", "uk", "uk", 1, {}, {}, false),
		b26: new Territory("B26", "New Hebrides", "uk", "uk", 0, {}, {}, false),
		b27: new Territory("B27", "New Zealand", "uk", "uk", 2, {}, {}, false),
		b28: new Territory("B28", "Western Canada", "uk", "uk", 3, { oil: 1, iron: 2, osr: 1 }, { iron: 2, osr: 1 }, false),
		b29: new Territory("B29", "Eastern Canada", "uk", "uk", 4, { iron: 1, osr: 1 }, { osr: 1 }, false),
		b30: new Territory("B30", "The Guyanas", "uk", "uk", 0, {}, { }, false)
	};

	return ukDefaults;
}

function setUkDefault() {
	ukControled = ukDefault();
}

setUkDefault();