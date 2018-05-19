// settings of the application
export const appSettings = {

    // ----- settings of the ship -----
    ship: {
        size: {
            'width.%':  12,
            'height.%': 10
        },
        speed: 0.05, // expressed in % per ms.
        damages: 5, // expressed in % // TODO is it used ?
        max_laser_amount: 10 // TODO is it used ?
    },

    // ------ settings of an invader -----

    invader_column: {
        number: 12,
    },
    
    invader: {
        'height.%': 10,
        speed: 0.003,
        damages: 5, // TODO is it used ?
        pop_prob: 0.25 // the probability of an invader to be created when an other died
    },

    // ----- settings of a ship laser ------
    laser_ship: {
        size: {
            'width.%': 1.5,
            'height.%': 6
        },
        speed: 0.05,
        damages: 35
    },

    // ----- settings of an invader laser -----
    laser_invader: {
        size: {
            'width.%': 0.8,
            'height.%': 4
        },
        speed: 0.1,
        damages: 5
    },

    // ---- points management -----
    points : {
        invader_killed: 1,
        invader_went_outside: 1,
    },

    // ----- game -----
    fps: 30,
}

