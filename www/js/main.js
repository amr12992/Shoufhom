var SERVER_URL = 'http://ShoufhomNode-iam688687.codeanyapp.com:3000';

// Dump all localStorage

var output = "LOCALSTORAGE DATA:\n------------------------------------\n";
if (localStorage.length) {
   for (var i = 0; i < localStorage.length; i++) {
       output += localStorage.key(i) + ': ' + localStorage.getItem(localStorage.key(i)) + '\n';
   }
} else {
   output += 'There is no data stored for this domain.';
}
console.log(output);


// This is executed when the signIn page initializes

document.addEventListener('init', function(event) {
  var page = event.target;
  if (page.matches('#signIn')) {
    if (localStorage.getItem('isSignedIn') == "yes") {
    	document.getElementById('username').value = localStorage.getItem('username');
    	document.getElementById('password').value = localStorage.getItem('password');
    	signIn();
    }
  }
});

var signIn = function() {  
  var loginCredentials = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  
  $.post(SERVER_URL + '/login', loginCredentials,
    function (data) {
      if (data.userRole) {
      	console.log(data.userRole);
      	
      	localStorage.setItem('username', loginCredentials.username);
      	localStorage.setItem('password', loginCredentials.password);
      	localStorage.setItem('isSignedIn', "yes");
      	
        ons.notification.toast('Login success, welcome ' + data.fName + '!', {timeout: 4000});
        
        switch (data.userRole) {
        	case 'Guardian':
        		fn.load('guardianHome.html');
        		break;
        
        	case 'Teacher':
        		fn.load('teacherHome.html');
        		break;
        		
        	case 'Counsellor':
        		fn.load('counsellorHome.html');
        		break;
        }
        
      } else {
        ons.notification.alert('Incorrect login information');
      }
    }).fail(function (error) {
    ons.notification.alert('Connection error');
  });
};