
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';

// Type for waitlist entries
type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  created_at: string;
};

// Admin credentials - in a real app, these would be stored securely on the server
const ADMIN_USERNAME = 'admintesto';
const ADMIN_PASSWORD = 'tryout2025';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [waitlistData, setWaitlistData] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if user is already logged in via session storage
  useEffect(() => {
    const adminLoggedIn = sessionStorage.getItem('eluvie_admin_logged_in');
    if (adminLoggedIn === 'true') {
      setIsLoggedIn(true);
      loadWaitlistData();
    } else {
      setIsLoading(false);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem('eluvie_admin_logged_in', 'true');
      loadWaitlistData();
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid username or password',
      });
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('eluvie_admin_logged_in');
    setUsername('');
    setPassword('');
    navigate('/admin');
  };
  
  const loadWaitlistData = async () => {
    setIsLoading(true);
    try {
      // Fetch waitlist data from Supabase
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setWaitlistData(data || []);
    } catch (error) {
      console.error('Error loading waitlist data:', error);
      toast({
        variant: 'destructive',
        title: 'Error loading data',
        description: 'Could not load waitlist data',
      });
      setWaitlistData([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-md space-y-6 bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Admin Login</h1>
              <p className="text-gray-400 mt-2">Enter your credentials to access the admin panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <Input 
                  id="username"
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Enter username"
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
                  className="bg-gray-800 border-gray-700"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full py-6"
              >
                Login
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-400 mt-4">
              <a href="/" className="underline hover:text-blue-500">
                Return to home page
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-xl font-bold">Eluvie Admin Panel</h1>
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          size="sm"
        >
          Logout
        </Button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Waitlist Registrations</h2>
          <p className="text-gray-400">
            Here you can see all users who have registered for the waitlist.
          </p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading waitlist data...</p>
          </div>
        ) : waitlistData.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
            <p className="text-xl text-gray-400">No waitlist registrations yet</p>
          </div>
        ) : (
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waitlistData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.name}</TableCell>
                      <TableCell>{entry.email}</TableCell>
                      <TableCell>{entry.whatsapp}</TableCell>
                      <TableCell>{formatDate(entry.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Total registrations: {waitlistData.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
