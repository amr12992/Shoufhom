var SERVER_URL = 'http://ShoufhomNode-iam688687.codeanyapp.com:3000';

var page = document.querySelector('ons-template');

var login = function() {
    
  var loginCredentials = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  
  $.post(SERVER_URL + '/login', loginCredentials,
    function (data) {
      if (data == 'success') {
        ons.notification.alert('Login success!');
        fn.load('home.html');
      } else {
        ons.notification.alert('Incorrect login');
      }
    }).fail(function (error) {
    ons.notification.alert('Connection error');
  });
};