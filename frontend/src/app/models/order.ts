export interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: {
    id: number;
    username: string;
    role: string;
  };
  items: OrderItem[];
  orderDate: string;
  totalAmount: number;
  status: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}