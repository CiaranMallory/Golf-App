
window.onload = function() {

    const signupform = document.getElementById('signup');

    signupform.addEventListener('submit', (event) => {
        var username = document.getElementById('username').value;
        //var password = document.getElementById('password').value;

        // Check that user is not already signed up
        var db = `http://localhost:3000/getuser/${username}`;
        
        fetch(db)
        .then(response => {
            return response.json();
        })
        .then(result => {
            //console.log(result);
            //console.log(result.userStatus);

            if(result.userStatus === 0) {
                var password = document.getElementById('password').value;
                // Create table in database with username and password
                var db = `http://localhost:3000/createtable/${username}/${password}`;
                
                fetch(db)
                    .then(response => {
                        return response.json();
                    })
                    .then(result => {
                        console.log(result);
                        if (result.length != 0) {
                            alert('Registration was Successful');
                            location.href = 'login.html';
                        } else {
                            alert('Registration Failed');
                        }
                        return;
                    });
            } else {
                alert('A user with that username already exists');
            }
        });
    });
};