import React from "react";
import { Calendar } from "lucide-react";
import { Avatar, AvatarImage } from '../page/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '../page/ui/popover';
import { Button } from '../page/ui/button';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between py-4 border-b border-gray-200 px-4 md:px-8">
      <h1 className="text-xl md:text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>QUICKCOURT</h1>

      <div className="hidden md:flex items-center space-x-4">
        <button className="flex items-center text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
          <Calendar size={18} className="mr-2" />
          <span>Book</span>
        </button>

        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage src={user?.profile?.profilePhoto} alt="" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col items-center space-y-4 p-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="" />
                </Avatar>
                <div className="text-center">
                  <h4 className="font-semibold text-lg">{user?.fullName}</h4>
                  <p className="text-sm text-gray-600">{user?.email || 'No email provided'}</p>
                </div>
                <Link to="/profile" className="w-full">
                  <Button className="w-full mb-2">
                    View Profile
                  </Button>
                </Link>
                <Button onClick={logoutHandler} className="w-full">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Button 
              onClick={() => navigate('/login')}
              className="text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              variant="outline"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="text-white bg-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
