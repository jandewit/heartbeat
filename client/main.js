$(document).ready(function() {

    var range_distance = document.getElementById('slider_distance');

    noUiSlider.create(range_distance, {
    
        range: {
            'min': 0,
            'max': 100
        },
    
        step: 5,
    
        // Handles start at ...
        start: [5],
    
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