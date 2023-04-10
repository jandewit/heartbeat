let self = this;
let day = -1;

// Check if we should be here
if (document.cookie === undefined) {
    window.location.href = 'index.html';
}
else {
    if (document.cookie.startsWith('id=')) {
        let id = document.cookie.substring(3);

        // Get the participant's current day and step
        $.get('/api/get_day.php', {id: id}, function(day) {
            $.get('/api/get_part.php', {id: id}, function(ret) {
                let step = parseInt(ret.current_step);

                // Check if we have reached a new day, and update the day accordingly
                if (parseInt(day) !== parseInt(ret.current_day) || step !== 1) {
                    window.location.href = 'index.html';
                }
                else {
                    self.day = parseInt(day);
                    load_profiles();
                }
            });
        });
    }
}

function load_profiles() {
    $('#text_day').text('Day ' + self.day);
    $('#splash').show();
}