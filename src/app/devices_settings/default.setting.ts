export const defaultSetting = {
    
        // ----- settings of the ship -----
        ship: {
            size: {
                'width.%':  10,
                'height.%': 6
            },
            speed: 0.09, // expressed in % per ms.
            max_laser_amount: 10 // TODO is it used ?
        },
    
        // ------ settings of an invader -----
    
        invader_column: {
            number: 10,
        },
        
        invader: {
            'height.%': 5,
            speed: {
                min: 0.001,
                max: 0.008
            },
            probability_shooting: 0.0005,//0.15 / 1000, // expressed in number of lasers shot by one invader during 1 ms
            probabity_creation: 0.35 // the probability of an invader to be created when an other died
        },
    
        // ----- settings of a ship laser ------
        laser_ship: {
            size: {
                'width.%': 1,
                'height.%': 4.4
            },
            speed: {
                min: 0.09,
                max: 0.11
            },
            damages: 35
        },
    
        // ----- settings of an invader laser -----
        laser_invader: {
            size: {
                'width.%': 0.8,
                'height.%': 4
            },
            speed: {
                min: 0.04,
                max: 0.06
            },
            damages: 50//5
        },
    
        // ---- points management -----
        points : {
            invader_killed: 1,
            invader_went_outside: -2,
        },

        // ----- events management -----
        eventsRemainingTime: {
            ship: {
                isCreated: 2000,
                isGoingLeft: 500,
                isGoingRight: 500,
                isShooting: 200,
                isTouchedByLaser: 1000
            },
            invader: {
                isTouchedByLaser: 1000,
                isKilled: 1000,
                isShooting: 500
            },
            board: {
                isGettingPoint: 1000
            }
        },
    
        // ----- game -----
        fps: 60,
    }
    
    