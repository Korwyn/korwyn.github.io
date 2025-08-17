class Production {
	constructor(production) {
		this.oil = 0;
		this.iron = 0;
		this.osr = 0;

		if (production) {
			this.oil = production.oil || 0;
			this.iron = production.iron || 0;
			this.osr = production.osr || 0;
		}
	}
}