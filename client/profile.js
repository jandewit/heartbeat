// We should only be here if no cookie exists for this user.
if (document.cookie !== undefined && document.cookie !== '') {
    window.location.href = 'index.html';
}


let profile = {
    age: '',
    gender: '',
    pref_gender: -1,
    pref_distance: 5,
    pref_age_min: 18,
    pref_age_max: 30
}

let initial_display = {
    age: true,
    distance: true,
    traits: true,
    intentions: true,
    interests: true
}

let profile_step = 1;

let qualtrics_id = '';
let condition = 0;

let saving = false;

$(document).ready(function() {
    $('#profilepic_upload').on('change', pic_uploaded);
    $('.gender_radio').on('change', gender_selected);
    $('#profile_age').on('change', age_change);
    $('.trait').on('click', trait_clicked);
    $('.relationship_goal').on('click', relationship_goal_clicked);
    $('.interest').on('click', interest_clicked);
    $('.music').on('click', music_clicked);
    $('.holiday').on('click', holiday_clicked);
    $('.pref_gender_radio').on('change', pref_gender_selected);

    $(window).on('message', function(event) {
        inbound = event.originalEvent.data;
      
        if (inbound != '' && inbound != 'fullscreen_on' && inbound != 'fullscreen_off') {
            console.log(inbound);
            let obj = JSON.parse(inbound);
            console.log(obj);
            qualtrics_id = obj.qualtrics_id;
            condition = obj.condition;
        }    
    });

    var range_distance = document.getElementById('slider_distance');

    noUiSlider.create(range_distance, {
    
        range: {
            'min': 0,
            'max': 100
        },
    
        step: 5,
    
        // Handles start at ...
        start: [40],
    
        // ... must be at least 300 apart
        //margin: 300,
    
        // ... but no more than 600
        //limit: 600,
    
        // Display colored bars between handles
        //connect: true,
    
        // Put '0' at the bottom of the slider
        //direction: 'ltr',
        //orientation: 'horizontal',
    
        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        /*format: wNumb({
            decimals: 0
        }),*/

        format: {
            from: function(value) {
                return parseInt(value);
            },
            to: function(value) {
                return parseInt(value) + ' km';
            }
        }
    
        // Show a scale with the slider
        /*pips: {
            mode: 'steps',
            stepped: true,
            density: 4
        }*/
    });    

    var range_age = document.getElementById('slider_age');

    noUiSlider.create(range_age, {
    
        range: {
            'min': 18,
            'max': 65
        },
    
        step: 1,
    
        // Handles start at ...
        start: [18, 30],
    
        // ... must be at least 300 apart
        //margin: 300,
    
        // ... but no more than 600
        //limit: 600,
    
        // Display colored bars between handles
        connect: true,
    
        // Put '0' at the bottom of the slider
        direction: 'ltr',
        orientation: 'horizontal',
    
        // Move handle on tap, bars are draggable
        behaviour: 'tap-drag',
        tooltips: true,
        /*format: wNumb({
            decimals: 0
        }),*/

        format: {
            from: function(value) {
                return parseInt(value);
            },
            to: function(value) {
                return parseInt(value);
            }
        }
    
        // Show a scale with the slider
        /*pips: {
            mode: 'steps',
            stepped: true,
            density: 4
        }*/
    });    
});

function go_profile_intro() {
    $('#splash').hide();
    $('#profile_intro').show();
}

function go_create_profile() {
    $('#profile_intro').hide();
    $('#profile').css('display', 'flex');
}

function upload_pic() {
    $('#profilepic_upload').click();
}

function pic_uploaded() {
    if (this.files && this.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img = $('<img>').attr('src', e.target.result);
            img.css('max-height', '100%');
            $('#profile_pic_container').html(img);
        };

        reader.readAsDataURL(this.files[0]);           
    }
}

function gender_selected() {
    if (this.value == 'Other') {
        profile.gender = 'Other: ' + $('#gender_other').val();
    }
    else {
        profile.gender = this.value;
    }    

    check_enable_profilebutton();
}

function age_change() {
    profile.age = $('#profile_age').val();
    check_enable_profilebutton();
}

function check_enable_profilebutton() {
    if (profile_step == 1) {
        $('#btn_profile_previous').addClass('btn-disabled');

        if (profile.gender !== '' && profile.age !== '') {
            $('#btn_profile_next').removeClass('btn-disabled');
        }
        else {
            $('#btn_profile_next').addClass('btn-disabled');
        }
    } 

    else if (profile_step == 2) {
        $('#btn_profile_previous').removeClass('btn-disabled');

        if ($('.trait.badge-secondary').length > 0 && $('.interest.badge-secondary').length > 0 && $('.relationship_goal.badge-secondary').length > 0 && $('.music.badge-secondary').length > 0 && $('.holiday.badge-secondary').length > 0) {
            $('#btn_profile_next').removeClass('btn-disabled');
        }
        else {
            $('#btn_profile_next').addClass('btn-disabled');
        }
    }

    else if (profile_step == 3) {
        if (profile.pref_gender !== -1) {
            $('#btn_profile_next').removeClass('btn-disabled');
        }
        else {
            $('#btn_profile_next').addClass('btn-disabled');
        }
    }
}

function btn_profile_next_click() {
    if (profile_step < 4) {

        if (profile_step == 3) {
            profile.pref_distance = parseInt($('#slider_distance')[0].noUiSlider.get().split(' '));
            let pref_age = $('#slider_age')[0].noUiSlider.get();
            profile.pref_age_min = parseInt(pref_age[0]);
            profile.pref_age_max = parseInt(pref_age[1]);
        }

        $("#profile_" + profile_step).hide();
        profile_step += 1;

        $("#profile_" + profile_step).show();

        check_enable_profilebutton();
        for (var i = 2; i <= 4; i++) {
            if (i <= profile_step) {
                $('#profile_steps_' + i).addClass('step-primary');
            }
            else {
                $('#profile_steps_' + i).removeClass('step-primary');
            }
        }
    }
    else {
        if (saving) {
            return;
        }

        saving = true;
        
        // Send gender and age to Qualtrics
        parent.postMessage({msg: 'profile_data', gender: profile.gender, age: profile.age}, '*');

        // Store the participant information and set the cookie.
        $.post('/api/create_part.php', {
            qualtrics_id_d1: qualtrics_id,
            qualtrics_id_d5: '', // Will be filled in later
            exp_condition: condition,
            gender_profiles: profile.pref_gender,
            pref_distance: profile.pref_distance,
            pref_min_age: profile.pref_age_min,
            pref_max_age: profile.pref_age_max,
            current_day: 1,
            current_step: 1 // 1 = swiping, 2 = setting information sharing, 3 = evaluation questionnaire        
        }, function(ret) {
            // Also store the initial preferences for information sharing
            $.post('/api/create_info.php', {
                id: ret.id,
                is_initial: 1,
                day_nr: 1,
                is_age: $('#display_age').is(':checked') ? 1 : 0,
                is_distance: $('#display_distance').is(':checked') ? 1 : 0,
                is_traits: $('#display_traits').is(':checked') ? 1 : 0,
                is_intentions: $('#display_intentions').is(':checked') ? 1 : 0,
                is_interests: $('#display_interests').is(':checked') ? 1 : 0,
                is_music: $('#display_music').is(':checked') ? 1 : 0,
                is_holiday: $('#display_holiday').is(':checked') ? 1 : 0
            }, function(ret_info) {
                const d = new Date();
                let exdays = 31;
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                let expires = "expires="+ d.toUTCString();
                document.cookie = "id=" + ret.id + ";" + expires + ";path=/;SameSite=None;Secure";
                window.location.href = 'swipe.html';                
            });
        });
    }
}

function btn_profile_previous_click() {
    if (profile_step > 1) {
        $("#profile_" + profile_step).hide();
        profile_step -= 1;
        $("#profile_" + profile_step).show();

        check_enable_profilebutton();
        for (var i = 2; i <= 4; i++) {
            if (i <= profile_step) {
                $('#profile_steps_' + i).addClass('step-primary');
            }
            else {
                $('#profile_steps_' + i).removeClass('step-primary');
            }
        }
    }
}

function trait_clicked() {
    if ($(this).hasClass('badge-secondary')) {
        $(this).removeClass('badge-secondary');
        $(this).addClass('badge-outline');
    }
    else if ($('.trait.badge-secondary').length < 3) {
        $(this).removeClass('badge-outline');
        $(this).addClass('badge-secondary');
    }

    check_enable_profilebutton();
}

function relationship_goal_clicked() {
    $('.relationship_goal').removeClass('badge-secondary');
    $('.relationship_goal').addClass('badge-outline');
    $(this).removeClass('badge-outline');
    $(this).addClass('badge-secondary');

    check_enable_profilebutton();
}

function interest_clicked() {
    if ($(this).hasClass('badge-secondary')) {
        $(this).removeClass('badge-secondary');
        $(this).addClass('badge-outline');
    }
    else if ($('.interest.badge-secondary').length < 4) {
        $(this).removeClass('badge-outline');
        $(this).addClass('badge-secondary');
    }

    check_enable_profilebutton();
}

function music_clicked() {
    if ($(this).hasClass('badge-secondary')) {
        $(this).removeClass('badge-secondary');
        $(this).addClass('badge-outline');
    }
    else if ($('.music.badge-secondary').length < 2) {
        $(this).removeClass('badge-outline');
        $(this).addClass('badge-secondary');
    }

    check_enable_profilebutton();
}

function holiday_clicked() {
    if ($(this).hasClass('badge-secondary')) {
        $(this).removeClass('badge-secondary');
        $(this).addClass('badge-outline');
    }
    else if ($('.holiday.badge-secondary').length < 2) {
        $(this).removeClass('badge-outline');
        $(this).addClass('badge-secondary');
    }

    check_enable_profilebutton();
}

function pref_gender_selected() {
    profile.pref_gender = parseInt(this.value);

    check_enable_profilebutton();    
}