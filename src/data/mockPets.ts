import { Pet } from '@/types';

// Import generated pet images
import goldenRetrieverImage from '@/assets/pet-golden-retriever.jpg';
import mixedBreedImage from '@/assets/pet-mixed-breed.jpg';
import orangeCatImage from '@/assets/pet-orange-cat.jpg';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    age: 2,
    breed: 'Labrador Mix',
    vaccines: ['V8', 'Antirrábica', 'Giárdia'],
    imageUrl: mixedBreedImage,
    institution: {
      name: 'ONG Amor Animal',
      email: 'contato@amoranimal.org',
      whatsapp: '11999887766'
    },
    description: 'Luna é uma cadela muito carinhosa e brincalhona. Adora crianças e se dá bem com outros pets!'
  },
  {
    id: '2',
    name: 'Milo',
    age: 1,
    breed: 'Vira-lata',
    vaccines: ['V10', 'Antirrábica'],
    imageUrl: goldenRetrieverImage,
    institution: {
      name: 'Proteção Animal SP',
      email: 'adocao@protecaosp.org',
      whatsapp: '11888776655'
    },
    description: 'Milo é um filhote cheio de energia, perfeito para uma família ativa!'
  },
  {
    id: '3',
    name: 'Bella',
    age: 4,
    breed: 'Golden Retriever',
    vaccines: ['V8', 'Antirrábica', 'Giárdia', 'Leishmaniose'],
    imageUrl: goldenRetrieverImage,
    institution: {
      name: 'Casa dos Animais',
      email: 'hello@casadosanimais.com',
      whatsapp: '11777665544'
    },
    description: 'Bella é uma cadela adulta, muito tranquila e companheira. Ideal para pessoas que buscam um pet mais calmo.'
  },
  {
    id: '4',
    name: 'Simba',
    age: 3,
    breed: 'Gato Persa',
    vaccines: ['V4 Felina', 'Antirrábica'],
    imageUrl: orangeCatImage,
    institution: {
      name: 'Gatil do Bem',
      email: 'contato@gatildobem.org',
      whatsapp: '11666554433'
    },
    description: 'Simba é um gato carinhoso que adora colo e brincadeiras suaves.'
  },
  {
    id: '5',
    name: 'Rex',
    age: 5,
    breed: 'Pastor Alemão',
    vaccines: ['V10', 'Antirrábica', 'Leishmaniose'],
    imageUrl: mixedBreedImage,
    institution: {
      name: 'SOS Animal',
      email: 'adocao@sosanimal.org',
      whatsapp: '11555443322'
    },
    description: 'Rex é um cão grande, muito protetor e leal. Precisa de um tutor experiente.'
  },
  {
    id: '6',
    name: 'Mel',
    age: 1,
    breed: 'Gata SRD',
    vaccines: ['V4 Felina', 'Antirrábica'],
    imageUrl: orangeCatImage,
    institution: {
      name: 'Amigos dos Felinos',
      email: 'info@amigosfelinos.com',
      whatsapp: '11444332211'
    },
    description: 'Mel é uma gatinha jovem, muito brincalhona e sociável!'
  }
];

let pets = [...mockPets];

export const getPets = (): Pet[] => {
  return pets;
};

export const getPetById = (id: string): Pet | undefined => {
  return pets.find(pet => pet.id === id);
};

export const addPet = (petData: Omit<Pet, 'id'>): Pet => {
  const newPet = {
    ...petData,
    id: Date.now().toString()
  };
  pets.push(newPet);
  return newPet;
};

export const updatePet = (id: string, petData: Partial<Pet>): Pet | undefined => {
  const index = pets.findIndex(pet => pet.id === id);
  if (index !== -1) {
    pets[index] = { ...pets[index], ...petData };
    return pets[index];
  }
  return undefined;
};

export const deletePet = (id: string): boolean => {
  const index = pets.findIndex(pet => pet.id === id);
  if (index !== -1) {
    pets.splice(index, 1);
    return true;
  }
  return false;
};