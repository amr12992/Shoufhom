var SERVER_URL = 'http://ShoufhomNode-iam688687.codeanyapp.com:3000';

var signIn = function() {  
  var loginCredentials = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  
  $.post(SERVER_URL + '/login', loginCredentials,
    function (data) {
      if (data.userRole) {
      	console.log(data.userRole);
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