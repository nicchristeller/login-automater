chrome.tabs.onUpdated.addListener(
	function() {
		retrieveData();
	}
);

chrome.tabs.onActivated.addListener(
	function() {
		retrieveData();
	}
);

function retrieveData() {
	var x = new XMLHttpRequest();
    x.open('GET', 'file://C:/Users/Nic/Documents/Mine/Coding/learn-login-extension/config.json');
    x.onload = function() {
        // Do something with data, e.g. print to console
        var json = JSON.parse(x.responseText);
        sendMessage(json.username, json.password);
    };
    x.send();
}

function sendMessage(usernameString, passwordString) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log("Sending update message from background");
	  	chrome.tabs.sendMessage(tabs[0].id,
	  							{username: usernameString,
	  							password: passwordString,
	  							currentUrl: tabs[0].url}
	  							);
	});
}
