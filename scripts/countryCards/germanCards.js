let germanControled = {};

function germanDefault() {
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let germanDefaults = {
		g1: new territory("G1", "Greater Germany", "germany", 8, { oil: 1, iron: 2, osr: 3 }, { iron: 2, osr: 3 }, false),
		g2: new territory("G2", "Denmark", "germany", 1, { osr: 1 }, {}, false),
		g3: new territory("G3", "France", "germany", 6, { iron: 2, osr: 3 }, { iron: 1, osr: 3 }, false),
		g4: new territory("G4", "Poland Slovakia Hungary", "germany", 4, { iron: 2, osr: 3 }, {iron: 1, osr: 3 }, false),
		g5: new territory("G5", "Bulgaria Rumania", "germany", 4, { oil: 2, osr: 2 }, { oil: 1, osr: 2 }, false),
		g6: new territory("G6", "Ukraine", "germany", 4, { oil: 1, osr: 3 }, { osr: 3 }, false),
		g7: new territory("G7", "Belarus", "germany", 2, { iron: 2, osr: 1 }, { iron: 1, osr: 1 }, false),
		g8: new territory("G8", "Baltic States", "germany", 1, { osr: 1 }, {}, false),
		g9: new territory("G9", "Finland", "germany", 2, { iron: 2 }, { iron: 1 }, false),
		g10: new territory("G10", "Norway", "germany", 2, { iron: 1 }, {}, false),
		g11: new territory("G11", "French Morocco", "germany", 2, { oil: 1, osr: 1 }, { osr: 1 }, false),
		g12: new territory("G12", "Algeria", "germany", 2, { oil: 1 }, {}, false),
		g13: new territory("G13", "Tunisia", "germany", 1, { iron: 1 }, {}, false),
		g14: new territory("G14", "Crete", "germany", 1, {}, {}, false),
		g15: new territory("G15", "French West Africa", "germany", 1, { osr: 1 }, {}, false),
		g16: new territory("G16", "Madagascar", "germany", 0, {}, {}, false)
	};

	return germanDefaults;
}

function setGermanDefault(){
	germanControled = germanDefault();
}

setGermanDefault();