class Territory {
	constructor(id, name, countryControlled, stressValue, baseProduction, embattledProduction, isEmbattled) {
		this.id = id;
		this.name = name;
		this.countryControlled = countryControlled;
		this.stressValue = stressValue || 0;
		this.production = new Production(baseProduction);
		this.embattledProduction = new Production(embattledProduction);
		this.isEmbattled = isEmbattled || false;
	}

}