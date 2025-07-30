function germanDefault() {
	
	//id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled
	let germanControled = {
		g1: new territory("g1", "Greater Germany", "german", 8, { oil: 1, iron: 2, osr: 3 }, { oil: 1, iron: 2, osr: 3 }, false),
		g2: new territory("g2", "Denmark", "german", 1, { osr: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g3: new territory("g3", "France", "german", 6, { iron: 2, osr: 3 }, { oil: 1, iron: 2, osr: 3 }, false),
		g4: new territory("g4", "Poland Slovakia Hungary", "german", 4, { iron: 2, osr: 3 }, { oil: 1, iron: 2, osr: 3 }, false),
		g5: new territory("g5", "Bulgaria Rumania", "german", 4, { oil: 2, osr: 2 }, { oil: 1, iron: 2, osr: 3 }, false),
		g6: new territory("g6", "Ukraine", "german", 4, { oil: 1, osr: 3 }, { oil: 1, iron: 2, osr: 3 }, false),
		g7: new territory("g7", "Belarus", "german", 2, { iron: 2, osr: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g8: new territory("g8", "Baltic States", "german", 1, { osr: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g9: new territory("g9", "Finland", "german", 2, { iron: 2 }, { oil: 1, iron: 2, osr: 3 }, false),
		g10: new territory("g10", "Norway", "german", 2, { iron: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g11: new territory("g11", "French Morocco", "german", 2, { oil: 1, osr: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g12: new territory("g12", "Algeria", "german", 2, { oil: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g13: new territory("g13", "Tunisia", "german", 1, { iron: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g14: new territory("g14", "Crete", "german", 1),
		g15: new territory("g15", "French West Africa", "german", 1, { osr: 1 }, { oil: 1, iron: 2, osr: 3 }, false),
		g16: new territory("g16", "Madagascar", "german")
	};

	return germanControled;
}

let germanControled = germanDefault();