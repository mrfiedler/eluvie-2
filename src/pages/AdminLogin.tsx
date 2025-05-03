
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LockIcon } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid username or password.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#202020] border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 bg-blue-900/20 rounded-full flex items-center justify-center">
              <LockIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#1a1a1a] border-gray-700"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1a1a1a] border-gray-700"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
