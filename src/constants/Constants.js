export const Talents = [
    {
        id: 'CHEVRONS',
        title: 'Chevrons',
        selected: false,
        root: true,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+1 Power',
        children: ['SILVERWARE']
    },
    {
        id: 'SILVERWARE',
        title: 'Silverware',
        selected: false,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+1 Constitution',
        children: ['CAKE']
    },
    {
        id: 'CAKE',
        title: 'Cake',
        selected: false,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+1 Party',
        children: ['CROWN', 'TEST']
    },
    {
        id: 'CROWN',
        title: 'Crown',
        selected: false,
        bonus: '+2 Glamor',
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 'BOAT',
        title: 'Boat',
        selected: false,
        root: true,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+1 Party, -1 Wealth',
        children: ['SNORKEL']
    },
    {
        id: 'SNORKEL',
        title: 'Snorkel',
        selected: false,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+2 Swimming',
        children: ['LIGHTNING']
    },
    {
        id: 'LIGHTNING',
        title: 'Lightning',
        selected: false,
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        bonus: '+1 Thunder Damage',
        children: ['SKULL']
    },
    {
        id: 'SKULL',
        title: 'Skull',
        selected: false,
        bonus: '+3 Spooky',
        tooltip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }
];

export const MAX_POINTS = 6;
