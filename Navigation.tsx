import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Menu, X, ShoppingBag, Heart, Phone, Info, Home, Camera, User, Settings, LogOut, Package } from 'lucide-react';
import { ShoppingCart } from './ShoppingCart';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import exampleImage from 'figma:asset/85a7415c99171af2a2145518b1a037b066f7b393.png';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'recommendations', label: 'Recommendations', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleLogout = () => {
    logout();
    onPageChange('home');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src={exampleImage} 
              alt="Papela" 
              className="h-10 w-auto cursor-pointer"
              onClick={() => onPageChange('home')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right side - Cart and Account */}
          <div className="flex items-center space-x-4">
            <ShoppingCart onPageChange={onPageChange} />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name?.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onPageChange('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange('profile')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPageChange('profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onPageChange('auth')}
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-amber-100">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                      currentPage === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {isAuthenticated && (
                <>
                  <div className="border-t border-amber-100 pt-2 mt-2">
                    <button
                      onClick={() => {
                        onPageChange('profile');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-gray-700 hover:bg-primary/10 hover:text-primary"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 text-gray-700 hover:bg-primary/10 hover:text-primary"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}