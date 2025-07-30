class territory {
	constructor(id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled) {
		this.id = id;
		this.name = name;
		this.countryControlled = countryControlled;
		this.stressValue = stressValue || 0;
		this.production = new production(baseProduction);
		this.embattledProduction = new production(embattledProduction);
		this.isEmbattled = isEmbattled || false;
	}

}