
let self = this;
self.id = -1;
self.day = -1;
self.step = 1;

// Check if we should be here
if (document.cookie === undefined) {
    window.location.href = 'index.html';
}
else {
    if (document.cookie.startsWith('id=')) {
        self.id = document.cookie.substring(3);

        // Get the participant's current day and step
        $.get('/api/get_day.php', {id: self.id}, function(day) {
            if (parseInt(day) > 5) {
                window.location.href = 'index.html';
            }
            
            $.get('/api/get_part.php', {id: self.id}, function(ret) {
                let step = parseInt(ret.current_step);

                // Check if we have reached a new day, and update the day accordingly
                if (parseInt(day) !== parseInt(ret.current_day) || step !== 2) {
                    window.location.href = 'index.html';
                }
                else {
                    self.day = parseInt(day);
                    start();
                }
            });
        });
    }
}

function start() {
    $('.q1').on('change', q1_change);

    let initial = (self.day == 1 ? 1 : 0);

    $.get('/api/get_info.php', {random_id: self.id, day_nr: (self.day == 1 ? 1 : (self.day - 1)), is_initial: initial}, function(ret) {
        $('#display_age').prop('checked', parseInt(ret.is_age) == 1);
        $('#display_distance').prop('checked', parseInt(ret.is_distance) == 1);
        $('#display_traits').prop('checked', parseInt(ret.is_traits) == 1);
        $('#display_intentions').prop('checked', parseInt(ret.is_intentions) == 1);
        $('#display_interests').prop('checked', parseInt(ret.is_interests) == 1);
        $('#display_music').prop('checked', parseInt(ret.is_music) == 1);
        $('#display_holiday').prop('checked', parseInt(ret.is_holiday) == 1);
        $('#eval_intro').show();
    });    
}

function go_evaluation() {
    $('#eval_intro').hide();
    $('#profile').removeClass('hidden');
}

function q1_change() {
    check_enable_button();
}

function check_enable_button() {
    if (self.step == 1) {
        $('#btn_profile_previous').addClass('btn-disabled');

        if ($('.q1:checked').length > 0) {
            $('#btn_profile_next').removeClass('btn-disabled');    
        }        
    } 

    else if (self.step == 2) {
        $('#btn_profile_previous').removeClass('btn-disabled');
        $('#btn_profile_next').removeClass('btn-disabled');
    }
}

function btn_next_click() {
    if (self.step == 1) {
        $("#eval_" + self.step).hide();
        self.step += 1;

        $("#eval_" + self.step).show();

        check_enable_button();

        for (var i = 2; i <= 2; i++) {
            if (i <= self.step) {
                $('#profile_steps_' + i).addClass('step-primary');
            }
            else {
                $('#profile_steps_' + i).removeClass('step-primary');
            }
        }
    }
    else {
        $('#profile').hide();

        // Add the evaluation
        $.post('/api/create_evaluation.php', { 
            id: self.id, 
            day_nr: self.day, 
            q1_value: parseInt($('.q1:checked').val())
        }, function(ret) {
            console.log(ret);

            // Update preferences for information sharing
            $.post('/api/create_info.php', {
                id: self.id,
                day_nr: self.day,
                is_initial: 0,
                is_age: $('#display_age').is(':checked') ? 1 : 0,
                is_distance: $('#display_distance').is(':checked') ? 1 : 0,
                is_traits: $('#display_traits').is(':checked') ? 1 : 0,
                is_intentions: $('#display_intentions').is(':checked') ? 1 : 0,
                is_interests: $('#display_interests').is(':checked') ? 1 : 0,
                is_music: $('#display_music').is(':checked') ? 1 : 0,
                is_holiday: $('#display_holiday').is(':checked') ? 1 : 0
            }, function(ret_info) {
                console.log(ret_info);

                // Show done
                $.post('/api/update_part.php', {id: id, current_step: 3, current_day: self.day}, function(ret) {
                    parent.postMessage({msg: 'fullscreen_off'}, '*');
                    window.location.href = 'index.html';
                });        
            });

        });
    }
}

function btn_previous_click() {
    if (self.step > 1) {
        $("#eval_" + self.step).hide();
        self.step -= 1;
        $("#eval_" + self.step).show();

        check_enable_button();
        for (var i = 2; i <= 2; i++) {
            if (i <= self.step) {
                $('#profile_steps_' + i).addClass('step-primary');
            }
            else {
                $('#profile_steps_' + i).removeClass('step-primary');
            }
        }
    }
}