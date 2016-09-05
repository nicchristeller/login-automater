chrome.runtime.onMessage.addListener(
  function(data, sender, sendResponse) {
    // console.log("Data in content script:");
    // console.log(data);

    var form;
	if (/.*learn\.canterbury\.ac\.nz.*/.test(data.currentUrl)) {
   		learnMainPageClickButton();
	}
	if (/.*login\.canterbury\.ac\.nz.*/.test(data.currentUrl)) {
		form = learnLoginForm();
		login(form, data);
	}
	if (/.*mytimetable\.canterbury\.ac\.nz\/aplus\/student.*/.test(data.currentUrl)) {
		myTimetableExpiredRedirect();
		form = myTimetableLoginForm();
		login(form, data);
	}
	if (/.*agilefant\.cosc\.canterbury\.ac\.nz.*/.test(data.currentUrl)) {
		form = agilefantLoginForm();
		login(form, data);
	}
});

function agilefantLoginForm() {
	return {
		usernameField: $('#username'),
	 	passwordField: $('input[name="j_pasword"]'),
		loginButton: $('input[type="submit"]')
	} 
}

function learnMainPageClickButton() {
	var loginButtonMainPage = $('.tuakiriloginbtn.ucloginbtn');
	if (loginButtonMainPage != null) {
		loginButtonMainPage.click();
	}
}

function learnLoginForm() {
	return {
		usernameField: $('#username'),
	 	passwordField: $('#password'),
		loginButton: $('#login .btn.btn-success')
	} 
}

function myTimetableExpiredRedirect() {
	var redirectLink = document.querySelector('[href=student]');
	if (redirectLink != null) {
		redirectLink.click();
	}
}

function myTimetableLoginForm() {
	return {
		usernameField: $('#username'),
	 	passwordField: $('#password'),
		loginButton: $('#login_button')
	} 
}

function login(form, data) {
	// console.log('Form, data:');
	// console.log(form);
	// console.log(data);
	form.usernameField.val(data.username);
	form.passwordField.val(data.password);
	form.loginButton.click();
}
