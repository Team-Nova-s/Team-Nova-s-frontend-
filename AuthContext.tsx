import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
    duration: number;
    eventDate: string;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  eventDate: string;
  deliveryAddress: string;
  orderDate: string;
  specialInstructions?: string;
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'orderDate'>) => void;
  getOrderById: (orderId: string) => Order | undefined;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock users database
  const mockUsers = [
    {
      id: '1',
      email: 'demo@example.com',
      password: 'password123',
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop',
      createdAt: '2024-01-15T10:00:00Z',
      preferences: {
        newsletter: true,
        notifications: true
      }
    }
  ];

  // Mock orders data
  const mockOrders: Order[] = [
    {
      id: 'order-001',
      userId: '1',
      items: [
        {
          id: 1,
          name: 'Elegant Wedding Arch',
          price: 250,
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
          category: 'wedding',
          quantity: 1,
          duration: 3,
          eventDate: '2024-08-15'
        }
      ],
      total: 750,
      status: 'completed',
      eventDate: '2024-08-15',
      deliveryAddress: '123 Main St, Los Angeles, CA 90210',
      orderDate: '2024-07-20T14:30:00Z',
      specialInstructions: 'Please set up by 2 PM'
    },
    {
      id: 'order-002',
      userId: '1',
      items: [
        {
          id: 4,
          name: 'Birthday Party Package',
          price: 120,
          image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
          category: 'birthday',
          quantity: 1,
          duration: 1,
          eventDate: '2024-12-25'
        }
      ],
      total: 120,
      status: 'confirmed',
      eventDate: '2024-12-25',
      deliveryAddress: '456 Oak Ave, Beverly Hills, CA 90210',
      orderDate: '2024-12-01T09:15:00Z'
    }
  ];

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('papela_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      // Load orders for this user
      const userOrders = mockOrders.filter(order => order.userId === userData.id);
      setOrders(userOrders);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('papela_user', JSON.stringify(userWithoutPassword));
      
      // Load orders for this user
      const userOrders = mockOrders.filter(order => order.userId === mockUser.id);
      setOrders(userOrders);
      
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
      preferences: {
        newsletter: true,
        notifications: true
      }
    };
    
    setUser(newUser);
    localStorage.setItem('papela_user', JSON.stringify(newUser));
    setOrders([]);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('papela_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('papela_user', JSON.stringify(updatedUser));
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'userId' | 'orderDate'>) => {
    if (user) {
      const newOrder: Order = {
        ...orderData,
        id: `order-${Date.now()}`,
        userId: user.id,
        orderDate: new Date().toISOString()
      };
      setOrders(prev => [newOrder, ...prev]);
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      orders,
      login,
      register,
      logout,
      updateProfile,
      addOrder,
      getOrderById,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}