params={};location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){params[k]=v});

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getCurrentDateTimeMySql() {        
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 23).replace('T', ' ');
    var mySqlDT = localISOTime;
    return mySqlDT;
} 

let self = this;
self.id = -1;
self.day = -1;
self.gender = -1;
self.min_age = -1;
self.max_age = -1;
self.distance = -1;
self.condition = -1;
self.qualtrics_id = '';

self.num_loaded = 0;

self.time_profile_show = getCurrentDateTimeMySql();
self.current_profile = 0;
self.is_first_like = true;
self.has_engaged = false;

self.nomatch_timeout = null;

self.num_matches = 0;

self.traits = [
    'Kind',
    'Spontaneous',
    'Loyal',
    'Funny',
    'Intelligent',
    'Ambitious',
    'Open-minded',
    'Empathic',
    'Calm',
    'Independent'
];

self.intentions = [
    'Something casual',
    'Serious relationship',
    'No preference'
];

self.interests = [
    'Movies',
    'Netflix',
    'Books',
    'Sports',
    'Music',
    'Cooking',
    'Creativity',
    'Gaming',
    'Shopping',
    'Travelling',
    'Festivals',
    'Concerts'
];

self.music = [
    'Pop',
    'Rock',
    'RnB',
    'Hiphop',
    'Blues',
    'Jazz',
    'Metal',
    'Electronic',
    'Classical'
];

self.holiday = [
    'Active',
    'All inclusive',
    'Party',
    'Culture',
    'Well planned',
    'Last minute'
];

self.names = [
    // Day 1
    [
        // Female
        [
            'Femke',
            'Lotte',
            'Sophie',
            'Julia',
            'Lisa',
            'Anna',
            'Eva',
            'Sanne',
            'Lieke',
            'Iris',
            'Nina',
            'Saar',
            'Emma',
            'Lynn',
            'Fleur',
            'Roos',
            'Merel',
            'Eline',
            'Anne',
            'Marit',
            'Jasmijn',
            'Amber',
            'Rosa',
            'Maartje',
            'Anouk',
            'Tessa',
            'Kim',
            'Sarah',
            'Britt',
            'Linde'
        ],
        // Male
        [
            'Daan',
            'Sem',
            'Finn',
            'Liam',
            'Levi',
            'Luuk',
            'Thijs',
            'Bram',
            'Joost',
            'Lars',
            'Ruben',
            'Sven',
            'Tim',
            'Tom',
            'Maarten',
            'Martijn',
            'Michiel',
            'Bas',
            'Bart',
            'Jan',
            'Koen',
            'Wouter',
            'Roel',
            'Dirk',
            'Johan',
            'Pieter',
            'Floris',
            'Joris',
            'Sander',
            'Jelle'
        ]
    ],
    // Day 2
    [
        // Female
        [
            'Lotte',
            'Isa',
            'Lara',
            'Jet',
            'Evi',
            'Noa',
            'Meike',
            'Lara',
            'Lisanne',
            'Hannah',
            'Marije',
            'Dewi',
            'Floor',
            'Ilse',
            'Simone',
            'Linda',
            'Esther',
            'Sofie',
            'Carmen',
            'Emily',
            'Rosa',
            'Amy',
            'Juliette',
            'Luna',
            'Liza',
            'Celine',
            'Frederique',
            'Elise',
            'Carlijn',
            'Julia'
        ],
        // Male
        [
            'Jesse',
            'Matthijs',
            'Jasper',
            'Casper',
            'Lucas',
            'Arjen',
            'Mart',
            'Jeroen',
            'Stefan',
            'Robbert',
            'Peter',
            'Frank',
            'Ernst',
            'Ewout',
            'Guus',
            'Hein',
            'Jacco',
            'Jaap',
            'Marcel',
            'Mark',
            'Max',
            'Menno',
            'Michiel',
            'Niels',
            'Olivier',
            'Paul',
            'Rik',
            'Ronald',
            'Rutger',
            'Sjoerd'
        ]
    ],
    // Day 3
    [
        // Female
        [
            'Maud',
            'Yara',
            'Nikki',
            'Mirte',
            'Danique',
            'Milou',
            'Elke',
            'Marleen',
            'Laura',
            'Merle',
            'Puck',
            'Selma',
            'Sophie',
            'Zoë',
            'Mirjam',
            'Mirte',
            'Suzan',
            'Myrthe',
            'Liselotte',
            'Jolien',
            'Joke',
            'Helene',
            'Daphne',
            'Carmen',
            'Marloes',
            'Mariëlle',
            'Sabine',
            'Senna',
            'Inge',
            'Dianne'
        ],
        // Male
        [
            'Taco',
            'Teun',
            'Thierry',
            'Victor',
            'Willem',
            'Gijs',
            'Govert',
            'Harm',
            'Hugo',
            'Igor',
            'Job',
            'Jop',
            'Kees',
            'Kris',
            'Laurens',
            'Lodewijk',
            'Maurits',
            'Niek',
            'Nils',
            'Pepijn',
            'Quinten',
            'Rayan',
            'Reinier',
            'Remco',
            'René',
            'Rick',
            'Rik',
            'Robert',
            'Robin',
            'Rogier'
        ]
    ],
    // Day 4
    [
        // Female
        [
            'Mariska',
            'Judith',
            'Fenna',
            'Manon',
            'Marianne',
            'Margriet',
            'Roosmarijn',
            'Marieke',
            'Lisan',
            'Frederieke',
            'Aafke',
            'Lieve',
            'Gaby',
            'Ingrid',
            'Gitta',
            'Margot',
            'Elly',
            'Chantal',
            'Janne',
            'Dieuwke',
            'Esmee',
            'Femke',
            'Nienke',
            'Nina',
            'Yvette',
            'Jans',
            'Tineke',
            'Eveline',
            'Ellis',
            'Hanneke'            
        ],
        // Male
        [
            'Roy',
            'Ruard',
            'Sander',
            'Sebastiaan',
            'Seger',
            'Simon',
            'Taco',
            'Tessel',
            'Theo',
            'Thomas',
            'Timon',
            'Tjalling',
            'Tobias',
            'Tymo',
            'Tycho',
            'Udo',
            'Valentijn',
            'Victor',
            'Vincent',
            'Vinnie',
            'Wessel',
            'Wilco',
            'Wim',
            'Xander',
            'Yannick',
            'Yves',
            'Yuri',
            'Zeger',
            'Abel',
            'Adriaan'
        ]
    ],
    // Day 5
    [
        // Female
        [
            'Gerdien',
            'Thirza',
            'Hester',
            'Eefje',
            'Inez',
            'Dora',
            'Paulien',
            'Natasja',
            'Willeke',
            'Geertje',
            'Heleen',
            'Willemijn',
            'Anja',
            'Guusje',
            'Trees',
            'Silvia',
            'Annemijn',
            'Marian',
            'Anke',
            'Johanna',
            'Beppe',
            'Olivia',
            'Marjolein',
            'Anne-Lotte',
            'Els',
            'Jetty',
            'Mieke',
            'Joke',
            'Ada',
            'Liesbeth'
        ],
        // Male
        [
            'Aiden',
            'Alain',
            'Alex',
            'Arie',
            'Arthur',
            'Ben',
            'Boris',
            'Brian',
            'Carl',
            'Coen',
            'Daantje',
            'David',
            'Diego',
            'Dylan',
            'Eduard',
            'Emiel',
            'Fabian',
            'Ferry',
            'Florijn',
            'Franka',
            'Frans',
            'Frederik',
            'Gert',
            'Glenn',
            'Giel',
            'Harmen',
            'Henry',
            'Ivo',
            'Jack',
            'Jochem'
        ]
    ]
];

// Check if we should be here
if (document.cookie === undefined) {
    window.location.href = 'index.html' + location.search;
}
else {
    if (document.cookie.startsWith('id=')) {
        self.id = document.cookie.substring(3);

        // Get the participant's current day and step
        $.get('/api/get_day.php', {id: self.id}, function(day) {
            if (parseInt(day) > 5) {
                window.location.href = 'index.html' + location.search;
            }

            $.get('/api/get_part.php', {id: self.id}, function(ret) {
                let step = parseInt(ret.current_step);

                // Check if we have reached a new day, and update the day accordingly
                if (parseInt(day) !== parseInt(ret.current_day) || step !== 1) {
                    window.location.href = 'index.html' + location.search;
                }
                else {
                    self.day = parseInt(day);
                    self.gender = parseInt(ret.gender_profiles)-1;
                    self.min_age = parseInt(ret.pref_min_age);
                    self.max_age = parseInt(ret.pref_max_age);
                    self.distance = parseInt(ret.pref_distance);
                    self.condition = parseInt(ret.exp_condition);
                    load_profiles();
                }
            });
        });
    }
}

$(document).ready(function() {
    console.log(params);
    if (params['q'] !== undefined) {
        self.qualtrics_id = params['q'];
    }    
});

function start_swiping() {
    $('#splash').hide();
    $('#swiping').show();
    self.time_profile_show = getCurrentDateTimeMySql();
}

function close_match() {
    $('#match-modal').click();

    let profile = $('#profile_' + self.current_profile);

    // Add to overview
    if (self.has_engaged) {
        $('#msg_no_conversations').hide();

        let conversation = $(`            <div class="card card-side bg-white shadow mb-4">
        <div class="avatar p-4">
          <div class="w-16 h-16 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
            <img src="img/` + self.gender + `/` + profile.data('picture') + `.jpg" />
          </div>
        </div>             
        <div class="card-body py-4">
          <h2 class="card-title text-base">` + profile.data('name') + `</h2>
          <p class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 inline -mt-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg> Hi! 👋</p>
        </div>
      </div>`);
      $('#overview_conversations').append(conversation);
    }    
    else {
        $('#msg_no_matches').hide();

        self.num_matches += 1;

        if (self.num_matches <= 4) {
            let match = $(`          <div class="avatar">
                <div class="w-12">
                    <img src="img/` + self.gender + `/` + profile.data('picture') + `.jpg" />
                </div>
            </div>`);
            $('#overview_match_container').prepend(match);
        }
        else {
            $('#more_matches').show();
            $('#more_matches_count').text('+' + (self.num_matches - 4));
        }
    }

    // To database
    $.post('/api/create_action.php', {
        random_id: self.id,
        day_nr: self.day,
        picture_id: profile.data('picture'),
        name: profile.data('name'),
        order_id: (self.current_profile + 1),
        is_liked: 1,
        is_engaged_with: (self.has_engaged ? 1 : 0),
        time_shown: self.time_profile_show,
        num_profile_items: profile.data('num-items'),
        was_match: 1      
    }).fail(function(xhr, status, error) {
        console.log(xhr.responseText);
    });

    $('#profile_' + self.current_profile).animate({left: '500px', top: '-500px', opacity: '0'}, function() {
        $(this).remove();
    });
    //$('#profile_' + self.current_profile).remove();
    $('#profile_' + (self.current_profile+2)).removeClass('!hidden');
    self.time_profile_show = getCurrentDateTimeMySql();

    self.current_profile++;    

    if (self.current_profile == self.names[self.day-1][self.gender].length) {
        $('#swiping').hide();
        $('#overview_matches').show();
    }
}

function engage() {
    self.has_engaged = true;
    $('#btn_engage').text('You said hi 👋!');
    $('#btn_engage').addClass('btn-disabled');
    $('#btn_engage').removeClass('bg-white');
}

function notlike() {
    if (self.current_profile == self.names[self.day-1][self.gender].length) {
        return;
    }

    let profile = $('#profile_' + self.current_profile);

    $('#profile_' + self.current_profile).animate({left: '-500px', top: '-500px', opacity: '0'}, function() {
        $(this).remove();
    });

    //$('#profile_' + self.current_profile).remove();
    if (self.current_profile < self.names[self.day-1][self.gender].length - 2) {
        $('#profile_' + (self.current_profile+2)).removeClass('!hidden');
    }
    self.time_profile_show = getCurrentDateTimeMySql();

    // To database
    $.post('/api/create_action.php', {
        random_id: self.id,
        day_nr: self.day,
        picture_id: profile.data('picture'),
        name: profile.data('name'),
        order_id: (self.current_profile + 1),
        is_liked: 0,
        is_engaged_with: 0,
        time_shown: self.time_profile_show,
        num_profile_items: profile.data('num-items'),
        was_match: 0            
    }).fail(function(xhr, status, error) {
        console.log(xhr.responseText);
    });

    self.current_profile++;

    if (self.current_profile == self.names[self.day-1][self.gender].length) {
        $('#swiping').hide();
        $('#overview_matches').show();
    }
}

function like() {
    if (self.current_profile == self.names[self.day-1][self.gender].length) {
        return;
    }

    console.log('-----');
    console.log('id: ' + self.id);
    let profile = $('#profile_' + self.current_profile);
    console.log('picture_id: ' + profile.data('picture'));
    console.log('name: ' + profile.data('name'));
    console.log('order_id: ' + (self.current_profile + 1));
    console.log('is_liked: 1');
    console.log('time_shown: ' + self.time_profile_show);
    console.log('num_profile_items: ' + profile.data('num-items'));

    // Decide if match
    // If this is the first like, we always follow the experimental condition, otherwise it's an 80/20 chance.
    if (self.is_first_like) {
        self.is_first_like = false;

        if (self.condition == 0) {
            nomatch(profile);
        }
        else {
            match(profile);
        }
    }
    else {
        if (self.condition == 0) {
            if (Math.floor(Math.random() * 10) + 1 > 2) {
                nomatch(profile);
            }
            else {
                match(profile);
            }
        }
        else {
            if (Math.floor(Math.random() * 10) + 1 > 2) {
                match(profile);
            }
            else {
                nomatch(profile);
            }            
        }
    }
    console.log('was_match: ?');
    console.log('-----');
}

function match(profile) {
    self.has_engaged = false;
    $('#btn_engage').removeClass('btn-disabled');
    $('#btn_engage').addClass('bg-white');
    $('#btn_engage').text('Say hi 👋 to ' + profile.data('name'));
    $('#match_img').attr('src', 'img/' + self.gender + '/' + profile.data('picture') + '.jpg');
    $('#match-modal').click();
}

function nomatch(profile) {
    $('#txt_nomatch').html('You and <strong>' + profile.data('name') + '</strong> did not match.');
    $('#nomatch').hide();
    clearTimeout(self.nomatch_timeout);
    $('#nomatch').show();

    $('#profile_' + self.current_profile).animate({left: '500px', top: '-500px', opacity: '0'}, function() {
        $(this).remove();
    });
        
    //$('#profile_' + self.current_profile).remove();
    $('#profile_' + (self.current_profile+2)).removeClass('!hidden');
    self.time_profile_show = getCurrentDateTimeMySql();

    // To database
    $.post('/api/create_action.php', {
        random_id: self.id,
        day_nr: self.day,
        picture_id: profile.data('picture'),
        name: profile.data('name'),
        order_id: (self.current_profile + 1),
        is_liked: 1,
        is_engaged_with: 0,
        time_shown: self.time_profile_show,
        num_profile_items: profile.data('num-items'),
        was_match: 0            
    }).fail(function(xhr, status, error) {
        console.log(xhr.responseText);
    });

    self.current_profile++;

    self.nomatch_timeout = setTimeout(function() {
        $('#nomatch').hide();

        if (self.current_profile == self.names[self.day-1][self.gender].length) {
            $('#swiping').hide();
            $('#overview_matches').show();
        }
    
    }, 2000);
}

function load_profiles() {
    $('#text_day').text('Day ' + self.day);
    $('#splash').show();
    //$('#swiping').show();

    let names = self.names[self.day-1][self.gender];
    let pics = [];

    for (var i = 0; i < names.length; i++) {
        pics.push((self.day - 1) * 30 + i + 1);
    }

    shuffleArray(names);
    shuffleArray(pics);

    for (var i = 0; i < names.length; i++) {
        let num_items = 0;
        let name = names[i];
        let age = '';
        let distance = '';
        let traits = '';
        let intentions = '';
        let interests = '';
        let music = '';
        let holiday = '';

        // 80% chance for each of the elements to be included
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let range = Math.min(self.max_age, 36) - self.min_age;
            age = ' (' + (Math.floor(Math.random() * range) + self.min_age) + ')';
            num_items += 1;
        }
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let dist = Math.floor(Math.random() * self.distance) + 1;
            distance = '<span class="text-sm mt-1">' + dist + ' km away</span>';
            num_items += 1;
        }        
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let num_traits = Math.floor(Math.random() * 3) + 1;
            num_items += num_traits;

            let traits_copy = JSON.parse(JSON.stringify(self.traits));

            for (var j = 0; j < num_traits; j++) {
                traits += `<div class="badge badge-outline badge-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-2 h-3">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>&nbsp;` + traits_copy.splice(Math.floor(Math.random() * traits_copy.length), 1) + '</div>';
            }
        }
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            num_items += 1;

            intentions = `<div class="badge badge-outline badge-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>&nbsp;` + self.intentions[Math.floor(Math.random() * self.intentions.length)] + '</div>';
        }        
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let num_interests = Math.floor(Math.random() * 4) + 1;
            num_items += num_interests;

            let interests_copy = JSON.parse(JSON.stringify(self.interests));

            for (var j = 0; j < num_interests; j++) {
                interests += `<div class="badge badge-outline badge-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                    <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
                </svg>&nbsp;` + interests_copy.splice(Math.floor(Math.random() * interests_copy.length), 1) + '</div>';
            }
        }  
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let num_music = Math.floor(Math.random() * 2) + 1;
            num_items += num_music;

            let music_copy = JSON.parse(JSON.stringify(self.music));

            for (var j = 0; j < num_music; j++) {
                music += `<div class="badge badge-outline badge-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                    <path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clip-rule="evenodd" />
                </svg>&nbsp;` + music_copy.splice(Math.floor(Math.random() * music_copy.length), 1) + '</div>';
            }
        }               
        if (Math.floor(Math.random() * 10) + 1 > 2) {
            let num_holiday = Math.floor(Math.random() * 2) + 1;
            num_items += num_holiday;

            let holiday_copy = JSON.parse(JSON.stringify(self.holiday));

            for (var j = 0; j < num_holiday; j++) {
                holiday += `<div class="badge badge-outline badge-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clip-rule="evenodd" />
                </svg>&nbsp;` + holiday_copy.splice(Math.floor(Math.random() * holiday_copy.length), 1) + '</div>';
            }
        }    

        let card = $(`      <div id="profile_` + i + `" class="!hidden card w-11/12 bg-base-100 shadow-xl image-full items-end" data-num-items="` + num_items + `" data-name="` + name + `" data-picture="` + pics[i] + `">
            <figure><img src="img/` + self.gender + `/` + pics[i] + `.jpg" /></figure>
            <div class="card-body p-4 rounded-b-xl bg-opacity-90 bg-[#ffffff]" style="color: #000000">
            <h2 class="card-title">
                ` + name + age + distance + `
            </h2>
            <div class="card-actions">
                ` + traits + intentions + interests + music + holiday + `
            </div>
            </div>
        </div>`);

        card.find('img').filter(function() {
            return this.complete;
        }).each(image_loaded).end().on('load', image_loaded);
    
        $('#profiles_stack').append(card);
    }

    $('.card').draggable({
        scroll: false,
        revert: function() {
          if ($(this).position().left > -(0.25 * $(window).width()) && $(this).position().left < (0.25 * $(window).width())) {
            return true;
          }
      
          return false;
        },
        stop: function() {
          if ($(this).position().left < -(0.25 * $(window).width())) {
            notlike();
          }
          else if ($(this).position().left > (0.25 * $(window).width())) {
            like();
          }
        }
      });    
}

function close_overview() {
    $.post('/api/update_part.php', {id: id, current_step: 2, current_day: self.day}, function(ret) {
        if (self.day == 5) {
            $.post('/api/update_qualtrics_d5.php', {id: id, qualtrics_id_d5: self.qualtrics_id}, function(ret) {
                window.location.href = 'evaluate.html' + location.search;
            });    
        }
        else {
            window.location.href = 'evaluate.html' + location.search;
        }
    });
}

function image_loaded() {
    self.num_loaded++;
    console.log(self.num_loaded);

    if (self.num_loaded == names.length) {
        $('#profile_0').removeClass('!hidden');
        $('#profile_1').removeClass('!hidden');
        $('#txt_loading').hide();
        $('#btn_start').removeClass('hidden');
    }
}