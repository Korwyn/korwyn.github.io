//from SetupCards.js
let countrySetup = localStorage.getItem("countrySetup");
if (countrySetup) {
	countries = JSON.parse(countrySetup);
}
setupCards();

//from TabSet.js
let activeTab = localStorage.getItem("activeTab");
if(activeTab){
	document.getElementById(activeTab).click();
}