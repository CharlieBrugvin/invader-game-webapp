// settings of the application
export const appSettings = {

    // ----- settings of the ship -----
    ship: {
        size: {
            'width.%':  10,
            'height.%': 10
        },
        speed: 0.02, // expressed in % per ms.
        damages: 5, // expressed in %
        max_laser_amount: 10 
    },

    // ------ settings of an invader -----

    invader_column: {
        number: 9,
    },
    
    invader: {
        'height.%': 5,
        speed: 0.005,
        damages: 5,
        pop_prob: 0.3 // the probability of an invader to be created when an other died
    },

    // ----- settings of a ship laser ------
    laser_ship: {
        size: {
            'width.%': 0.8,
            'height.%': 4
        },
        speed: 0.01,
        damages: 5
    },

    // ----- settings of an invader laser -----
    laser_invader: {
        size: {
            'width.%': 0.8,
            'height.%': 4
        },
        speed: 0.01,
        damages: 5
    },

    // ---- points management -----
    points : {
        invader_killed: 1,
        invader_went_outside: 1,
    },

    // ----- game -----
    fps: 60,
}

