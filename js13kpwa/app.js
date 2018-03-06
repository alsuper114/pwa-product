// Generating content based on the template
var template = "<article>\n\
	<img src='data/img/SLUG.jpg'>\n\
	<h3>#POS. NAME</h3>\n\
	<ul>\n\
	<li><span>Author:</span> <strong>AUTHOR</strong></li>\n\
	<li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>\n\
	<li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>\n\
	<li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>\n\
	<li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>\n\
	</ul>\n\
</article>";
var content = '';
for(var i=0; i<games.length; i++) {
	var entry = template.replace(/POS/g,(i+1))
		.replace(/SLUG/g,games[i].slug)
		.replace(/NAME/g,games[i].name)
		.replace(/AUTHOR/g,games[i].author)
		.replace(/TWITTER/g,games[i].twitter)
		.replace(/WEBSITE/g,games[i].website)
		.replace(/GITHUB/g,games[i].github);
	content += entry;
};
document.getElementById('content').innerHTML = content;

// Registering Service Worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js');
};

// Requesting permission for Notifications
Notification.requestPermission().then(function(result) {
	if(result === 'granted') {
		randomNotification();
	}
});

// Setting up random Notification
function randomNotification() {
	var randomItem = Math.floor(Math.random()*games.length);
	var notifTitle = games[randomItem].name;
	var notifBody = 'Created by '+games[randomItem].author+'.';
	var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
	var options = {
		body: notifBody,
		icon: notifImg
	}
	var notif = new Notification(notifTitle, options);
	setTimeout(randomNotification, 10000);
}