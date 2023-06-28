import React from 'react'
import { SvgProps } from 'react-native-svg'

import Americano from '../assets/americano.svg'
import Arabe from '../assets/arabe.svg'
import Gelado from '../assets/cafe-gelado.svg'
import Capuccino from '../assets/capuccino.svg'
import ChocolateQuente from '../assets/chocolate-quente.svg'
import Cubano from '../assets/cubano.svg'
import ExpressoCremoso from '../assets/expresso-cremoso.svg'
import Expresso from '../assets/expresso.svg'
import Havaiano from '../assets/havaiano.svg'
import Irlandes from '../assets/irlandes.svg'
import Late from '../assets/latte.svg'
import Mocaccino from '../assets/mochaccino.svg'

export interface Coffee {
  id: string
  name: string
  type: string
  description: string
  price: number
  svg: React.FC<SvgProps>
}

export interface CoffeeTypes {
  title: string
}

export const coffeeList = [
  {
    title: 'Tradicionais',
    data: [
      {
        id: '1',
        name: 'Expresso Tradicional',
        type: 'tradicional',
        description: 'O tradicional café feito com água quente e grãos moídos',
        price: 9.9,
        svg: Expresso,
      },
      {
        id: '2',
        name: 'Expresso Americano',
        type: 'tradicional',
        description: 'Expresso diluído, menos intenso que o tradicional',
        price: 9.9,
        svg: Americano,
      },
      {
        id: '3',
        name: 'Expresso Cremoso',
        type: 'tradicional',
        description: 'Café expresso tradicional com espuma cremosa',
        price: 9.9,
        svg: ExpressoCremoso,
      },
      {
        id: '4',
        name: 'Latte',
        type: 'tradicional',
        description: 'Café expresso com o dobro de leite e espuma cremosa',
        price: 9.9,
        svg: Late,
      },
      {
        id: '5',
        name: 'Expresso Gelado',
        type: 'tradicional',
        description: 'Bebida preparada com café expresso e cubos de gelo',
        price: 9.9,
        svg: Gelado,
      },
    ],
  },
  {
    title: 'Doces',
    data: [
      {
        id: '6',
        name: 'Capuccino',
        type: 'doce',
        description: 'Bebida com canela feita de doses de café, leite e espuma',
        price: 9.9,
        svg: Capuccino,
      },
      {
        id: '7',
        name: 'Mocaccino',
        type: 'doce',
        description:
          'Café expresso com calda de chocolate, pouco leite e espuma',
        price: 9.9,
        svg: Mocaccino,
      },
      {
        id: '8',
        name: 'Chocolate Quente',
        type: 'doce',
        description:
          'Bebida feita com chocolate dissolvido no leite quente e café',
        price: 9.9,
        svg: ChocolateQuente,
      },
    ],
  },
  {
    title: 'Especiais',
    data: [
      {
        id: '9',
        name: 'Cubano',
        type: 'especial',
        description:
          'Drink gelado de café expresso com rum, creme de leite e hortelã',
        price: 9.9,
        svg: Cubano,
      },
      {
        id: '10',
        name: 'Havaiano',
        type: 'especial',
        description: 'Bebida adocicada preparada com café e leite de coco',
        price: 9.9,
        svg: Havaiano,
      },
      {
        id: '11',
        name: 'Árabe',
        type: 'especial',
        description: 'Bebida preparada com grãos de café árabe e especiarias',
        price: 9.9,
        svg: Arabe,
      },
      {
        id: '12',
        name: 'Irlandês',
        type: 'especial',
        description:
          'Bebida a base de café, uísque irlandês, açúcar e chantilly',
        price: 9.9,
        svg: Irlandes,
      },
    ],
  },
]
