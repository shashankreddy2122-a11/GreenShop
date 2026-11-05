export type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  discount?: string
  image: string // e.g. '/images/barberton-daisy.png'
  tab: 'new' | 'sale' | 'all'
  category: string
}

export const products: Product[] = [
  { id: 1, name: 'Barberton Daisy', price: 119, image: '/assets/p1.png', tab: 'new', category: 'Potter Plants' },
  { id: 2, name: 'Angel Wing Begonia', price: 169, image: '/assets/p2.png', tab: 'new', category: 'House Plants' },
  { id: 3, name: 'African Violet', price: 199, oldPrice: 229, discount: '13% OFF', image: '/assets/p3.png', tab: 'sale', category: 'House Plants' },
  { id: 4, name: 'Beach Spider Lily', price: 129, image: '/assets/h1.png', tab: 'all', category: 'House Plants' },
  { id: 5, name: 'Blushing Bromeliad', price: 139, image: '/assets/p5.png', tab: 'all', category: 'House Plants' },
  { id: 6, name: 'Aluminum Plant', price: 179, image: '/assets/p6.png', tab: 'new', category: 'Succulents' },
  { id: 7, name: "Bird's Nest Fern", price: 99, image: '/assets/p7.png', tab: 'all', category: 'House Plants' },
  { id: 8, name: 'Broadleaf Lady Palm', price: 59, image: '/assets/p8.png', tab: 'sale', category: 'Terrariums' },
  { id: 9, name: 'Chinese Evergreen', price: 39, image: '/assets/p9.png', tab: 'all', category: 'House Plants' },
]