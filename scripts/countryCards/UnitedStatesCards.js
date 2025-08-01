let usControled = {};

function usDefault() {
	//id, name, countryControlled, owner, stressValue, baseProduction, embattledProduction, isEmbattled
	let usDefaults = {
		u1: new Territory("U1", "Eastern United States", "usa", "usa", 10, { oil: 2, iron: 4, osr: 5 }, { oil: 1, iron: 4, osr: 5 }, false),
		u2: new Territory("U2", "Central United States", "usa", "usa", 9, { oil: 3, iron: 4, osr: 6 }, { oil: 2, iron: 4, osr: 6 }, false),
		u3: new Territory("U3", "Western United States", "usa", "usa", 8, { oil: 2, iron: 3, osr: 6 }, { oil: 1, iron: 3, osr: 6 }, false),
		u4: new Territory("U4", "Alaska", "usa", "usa", 3, { oil: 1, iron: 2, osr: 1 }, { iron: 2, osr: 1 }, false),
		u5: new Territory("U5", "Aleutian Islands", "usa", "usa", 1, {}, {}, false),
		u6: new Territory("U6", "Hawaiian Islands", "usa", "usa", 2, {}, {}, false),
		u7: new Territory("U7", "Midway Islands", "usa", "usa", 0, {}, {}, false),
		u8: new Territory("U8", "Johnston Atoll", "usa", "usa", 0, {}, {}, false),
		u9: new Territory("U9", "Samoan Islands", "usa", "usa", 0, {}, {}, false),
		u10: new Territory("U10", "New Caledonia", "usa", "usa", 0, {}, {}, false)
	};

	return usDefaults;
}

function setUsDefault(){
	usControled = usDefault();
}

setUsDefault();