export interface Shirt {
  id: string;
  name: string;
  description: string;
  price: number;
  material: string;
  sizeRange: string;
  image: string;
}

export const SHIRTS: Shirt[] = [
  {
    id: '1',
    name: 'Gengar Shadow Tee',
    description: 'A dark purple shirt with a glowing Gengar silhouette.',
    price: 24.99,
    material: '100% Cotton',
    sizeRange: 'S - XXL',
    image: '👻',
  },
  {
    id: '2',
    name: 'Snorlax Lounge Shirt',
    description: 'Extra soft and oversized, perfect for napping.',
    price: 34.99,
    material: 'Bamboo Fiber',
    sizeRange: 'M - 4XL',
    image: '💤',
  },
  {
    id: '3',
    name: 'Eevee Evolution Hoodie',
    description: 'Features all original Eeveelutions on the back.',
    price: 44.99,
    material: 'Fleece-lined Polyester',
    sizeRange: 'XS - XL',
    image: '🦊',
  },
  {
    id: '4',
    name: 'Magikarp Splash Tank',
    description: 'Breathable tank top for the gym. Does nothing.',
    price: 19.99,
    material: 'Quick-dry Mesh',
    sizeRange: 'S - L',
    image: '🐟',
  },
];
