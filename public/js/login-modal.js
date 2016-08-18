var modal = document.getElementById('loginModal');
var loginBtn = document.getElementById('login');

loginBtn.onclick = function() {
	modal.style.display = "block";
}

closeModal.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}