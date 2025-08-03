let reset = document.getElementById("reset");
reset.addEventListener("click", function(){
	if(confirm("Reset Game State?")){
		countries = null;
		setupCards();
		document.getElementById("tabTerritory").click();
	}
});