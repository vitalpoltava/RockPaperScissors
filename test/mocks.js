// Mocks

var config = [
    {
        name: 'Rock',
        wins: ['Scissors'],
        loose: ['Paper']
    },
    {
        name: 'Scissors',
        wins: ['Paper'],
        loose: ['Rock']
    },
    {
        name: 'Paper',
        wins: ['Rock'],
        loose: ['Scissors']
    }
];

var wrongConfig = [
    {
        name: 'Rock',
        wins: ['Scissors'] // no 'loose' prop here
    },
    {
        name: 'Scissors',
        wins: ['Paper'],
        loose: ['Rock']
    },
    {
        name: 'Paper',
        wins: ['Rock'],
        loose: ['Scissors']
    }
];

