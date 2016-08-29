$(function () {
	if (document.cookie.indexOf('Auth') == -1) {
		window.location.href = "/index.html";
	}
});