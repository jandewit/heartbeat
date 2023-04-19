// Use the cookie and the API to check which day and stage the participant is at.

console.log(document.cookie);

if (document.cookie == undefined || document.cookie == '') {
    // No cookie found, this means we're on day 1 with a new user and we need to create a profile.
    window.location.href = 'profile.html';
}
else {
    if (document.cookie.startsWith('id=')) {
        let id = document.cookie.substring(3);
        
        // Get the participant's current day and step
        $.get('/api/get_day.php', {id: id}, function(day) {
            if (parseInt(day) > 5) {
                document.body.innerHTML = 'You are done with the experiment!';
                return;
            }

            $.get('/api/get_part.php', {id: id}, function(ret) {
                let step = parseInt(ret.current_step);

                // Check if we have reached a new day, and update the day accordingly
                if (parseInt(day) !== parseInt(ret.current_day)) {
                    $.post('/api/update_part.php', {id: id, current_step: 1, current_day: parseInt(day)}, function(ret) {
                        window.location.href = 'swipe.html';
                    });
                }

                else {
                    if (parseInt(ret.current_step) == 1) {
                        window.location.href = 'swipe.html';
                    }    
                    else if (parseInt(ret.current_step) == 2) {
                        window.location.href = 'evaluate.html';
                    }
                    else {
                        document.body.innerHTML = 'You are done for today!';
                    }
                }
            });    
        }).fail(function() {
            document.cookie = "id=delete;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
            window.location.href = 'index.html';
        });
    }
}