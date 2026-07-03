export interface LegoSet {
  id: string;
  name: string;
  description: string;
  price: number;
  pieces: number;
  ageRange: string;
  image: string;
}

export const LEGO_SETS: LegoSet[] = [
  {
    id: '1',
    name: 'Pikachu Adventure',
    description: 'Build a posable Pikachu with lightning bolt tail!',
    price: 29.99,
    pieces: 211,
    ageRange: '7+',
    image: '⚡',
  },
  {
    id: '2',
    name: 'Charizard Burning Forest',
    description: 'A massive Charizard breathing fire in a buildable forest.',
    price: 49.99,
    pieces: 450,
    ageRange: '10+',
    image: '🔥',
  },
  {
    id: '3',
    name: 'Squirtle Beach Bash',
    description: 'Help Squirtle build a sandcastle on the beach.',
    price: 19.99,
    pieces: 120,
    ageRange: '6+',
    image: '💧',
  },
  {
    id: '4',
    name: 'Bulbasaur Garden Retreat',
    description: 'A peaceful garden for Bulbasaur to rest.',
    price: 24.99,
    pieces: 180,
    ageRange: '6+',
    image: '🍃',
  },
];
