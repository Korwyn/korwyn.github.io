class territory {
	constructor(id, name, countryControlled, baseProduction, embattledProduction, isEmbattled) {
		this.id = id;
		this.name = name;
		this.countryControlled = countryControlled;
		this.production = new production(baseProduction);
		this.embattledProduction = new production(embattledProduction);
		this.isEmbattled = isEmbattled || false;
	}

}