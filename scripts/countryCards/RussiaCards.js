let ussrControled = {};

function ussrDefault() {
	//id, name, countryControlled, owner, stressValue, baseProduction, embattledProduction, isEmbattled
	let ussrDefaults = {
		r1: new Territory("R1", "Moscow", "ussr", "ussr", 5, { iron: 1, osr: 1 }, { osr: 1 }, false),
		r2: new Territory("R2", "Arkhangelsk", "ussr", "ussr", 3, { osr: 1 }, {}, false),
		r3: new Territory("R3", "Karelia", "ussr", "ussr", 2, { iron: 1 }, {}, false),
		r4: new Territory("R4", "Leningrad", "ussr", "ussr", 3, { osr: 1 }, {}, false),
		r5: new Territory("R5", "Bryansk", "ussr", "ussr", 2, { iron: 1, osr: 1 }, { osr: 1 }, false),
		r6: new Territory("R6", "Caucasus", "ussr", "ussr", 3, { oil: 2 }, { oil: 1 }, false),
		r7: new Territory("R7", "Volga", "ussr", "ussr", 2, { iron: 1, osr: 1 }, { osr: 1 }, false),
		r8: new Territory("R8", "Kazakh", "ussr", "ussr", 1, { osr: 2 }, { osr: 1 }, false),
		r9: new Territory("R9", "Turkmen Uzbek", "ussr", "ussr", 1, {}, { }, false),
		r10: new Territory("R10", "East Kazakh", "ussr", "ussr", 1, {}, {}, false),
		r11: new Territory("R11", "Sverdlovsk", "ussr", "ussr", 3, { osr: 2 }, { osr: 1 }, false),
		r12: new Territory("R12", "Urals", "ussr", "ussr", 2, { oil: 2 }, { oil: 1}, false),
		r13: new Territory("R13", "Krasnoyarsk", "ussr", "ussr", 1, { oil: 1 }, {}, false),
		r14: new Territory("R14", "Amur Irkutsk", "ussr", "ussr", 2, { iron: 1, osr: 1 }, { osr: 1 }, false),
		r15: new Territory("R15", "Yakut", "ussr", "ussr", 2, { oil: 1 }, {}, false),
		r16: new Territory("R16", "Khabarovsky", "ussr", "ussr", 2, { iron: 1 }, {}, false),
		r17: new Territory("R17", "Kamchatsky", "ussr", "ussr", 1, { osr: 1 }, {}, false),
		r18: new Territory("R18", "Soviet Sakhalin Island", "ussr", "ussr", 0, {}, {}, false)
	};

	return ussrDefaults;
}

function setUssrDefault() {
	ussrControled = ussrDefault();
}

setUssrDefault();