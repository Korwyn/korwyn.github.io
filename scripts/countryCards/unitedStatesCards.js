let usControled = {};

function usDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let usDefaults = {
		u1: new territory("U1", "Eastern United States", "usa", 10, { oil: 2, iron: 4, osr: 5 }, { oil: 1, iron: 4, osr: 5 }, false),
		u2: new territory("U2", "Central United States", "usa", 9, { oil: 3, iron: 4, osr: 6 }, { oil: 2, iron: 4, osr: 6 }, false),
		u3: new territory("U3", "Western United States", "usa", 8, { oil: 2, iron: 3, osr: 6 }, { oil: 1, iron: 3, osr: 6 }, false),
		u4: new territory("U4", "Alaska", "usa", 3, { oil: 1, iron: 2, osr: 1 }, { iron: 2, osr: 1 }, false),
		u5: new territory("U5", "Aleutian Islands", "usa", 1, {}, {}, false),
		u6: new territory("U6", "Hawaiian Islands", "usa", 2, {}, {}, false),
		u7: new territory("U7", "Midway Islands", "usa", 0, {}, {}, false),
		u8: new territory("U8", "Johnston Atoll", "usa", 0, {}, {}, false),
		u9: new territory("U9", "Samoan Islands", "usa", 0, {}, {}, false),
		u10: new territory("U10", "New Caledonia", "usa", 0, {}, {}, false),
	};

	return usDefaults;
}

function setUsDefault(){
	usControled = usDefault();
}

setUsDefault();