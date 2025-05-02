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
import { Edit, Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';

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
  const [videoLink, setVideoLink] = useState('https://www.youtube.com/embed/M0Sp7ZP96Xo');
  const [aboutText, setAboutText] = useState({
    en: 'Eluvie is a financial platform designed specifically for creative professionals and agencies. Manage finances, invoices, projects, and subscriptions, all in one place.',
    'pt-BR': 'Eluvie é uma plataforma financeira projetada especificamente para profissionais e agências criativas. Gerencie finanças, faturas, projetos e assinaturas, tudo em um só lugar.'
  });
  const [aboutPageContent, setAboutPageContent] = useState({
    title: {
      en: 'About Eluvie',
      'pt-BR': 'Sobre a Eluvie'
    },
    subtitle: {
      en: 'A financial platform created by creatives, for creatives',
      'pt-BR': 'Uma plataforma financeira criada por criativos, para criativos'
    },
    description: {
      en: 'Eluvie was born from a simple observation: creative professionals need financial tools that match their workflow. Traditional financial software is often built for accountants and large corporations, not for the unique needs of creative businesses. We set out to change that.',
      'pt-BR': 'O Eluvie nasceu de uma simples observação: profissionais criativos precisam de ferramentas financeiras que combinem com seu fluxo de trabalho. Softwares financeiros tradicionais são frequentemente desenvolvidos para contadores e grandes corporações, não para as necessidades únicas de negócios criativos. Decidimos mudar isso.'
    },
    mission: {
      en: 'To create the most intuitive financial management platform for creative professionals, removing the technical barriers and making financial organization a seamless part of the creative workflow.',
      'pt-BR': 'Criar a plataforma de gerenciamento financeiro mais intuitiva para profissionais criativos, removendo as barreiras técnicas e tornando a organização financeira uma parte integrada do fluxo de trabalho criativo.'
    },
    story: {
      en: 'Founded in 2023 by a team of designers, developers, and creative entrepreneurs who were frustrated with existing financial tools. We combined our expertise in user experience, software development, and financial management to build the tool we wished we had.',
      'pt-BR': 'Fundado em 2023 por uma equipe de designers, desenvolvedores e empreendedores criativos frustrados com as ferramentas financeiras existentes. Combinamos nossa experiência em experiência do usuário, desenvolvimento de software e gestão financeira para construir a ferramenta que gostaríamos de ter.'
    },
    values: [
      {
        title: {
          en: 'Simplicity',
          'pt-BR': 'Simplicidade'
        },
        description: {
          en: 'We believe financial tools should be as simple and intuitive as the creative tools you already love.',
          'pt-BR': 'Acreditamos que as ferramentas financeiras devem ser tão simples e intuitivas quanto as ferramentas criativas que você já ama.'
        }
      },
      {
        title: {
          en: 'Transparency',
          'pt-BR': 'Transparência'
        },
        description: {
          en: 'No hidden fees, no confusing terms—just clear, visual representations of your financial state.',
          'pt-BR': 'Sem taxas ocultas, sem termos confusos—apenas representações claras e visuais do seu estado financeiro.'
        }
      },
      {
        title: {
          en: 'Empowerment',
          'pt-BR': 'Capacitação'
        },
        description: {
          en: 'We want to give creative professionals the confidence to make informed business decisions.',
          'pt-BR': 'Queremos dar aos profissionais criativos a confiança para tomar decisões de negócios informadas.'
        }
      }
    ]
  });
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
    
    // Load saved about page content from localStorage if available
    const savedAboutContent = localStorage.getItem('eluvie_about_content');
    if (savedAboutContent) {
      try {
        setAboutPageContent(JSON.parse(savedAboutContent));
      } catch (e) {
        console.error('Error parsing saved about content:', e);
      }
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

  const saveVideoLink = () => {
    // In a real application, this would save to a database
    localStorage.setItem('eluvie_video_link', videoLink);
    toast({
      title: 'Success',
      description: 'Video link updated successfully',
    });
  };

  const saveAboutText = () => {
    // In a real application, this would save to a database
    localStorage.setItem('eluvie_about_text', JSON.stringify(aboutText));
    toast({
      title: 'Success',
      description: 'About text updated successfully',
    });
  };
  
  const saveAboutPageContent = () => {
    localStorage.setItem('eluvie_about_content', JSON.stringify(aboutPageContent));
    
    // Also update the translations file if we had access to file system
    // In a real app, this would save to a database or API
    toast({
      title: 'Success',
      description: 'About page content updated successfully',
    });
    
    // Update translations in memory so changes apply immediately
    try {
      const translationsModule = require('@/translations/about').default;
      Object.entries(aboutPageContent).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          translationsModule[`about-${key}`] = value;
        }
      });
    } catch (e) {
      console.error('Could not update translations in memory:', e);
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
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Eluvie Admin Panel</h1>
          <a href="/" className="text-blue-500 hover:text-blue-400 flex items-center gap-1 text-sm">
            <Home size={16} />
            Visit Site
          </a>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          size="sm"
        >
          Logout
        </Button>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="waitlist">
          <TabsList className="mb-6">
            <TabsTrigger value="waitlist">Waitlist Registrations</TabsTrigger>
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="about">About Page</TabsTrigger>
          </TabsList>
          
          <TabsContent value="waitlist">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Waitlist Registrations</h2>
              <p className="text-gray-400">
                Here you can see all users who have registered for the waitlist.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadWaitlistData} 
                className="mt-2"
              >
                Refresh Data
              </Button>
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
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-8">
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Edit size={18} className="text-blue-500" />
                  <h3 className="text-xl font-medium">Video Link Editor</h3>
                </div>
                <p className="text-gray-400 mb-4">Edit the demonstration video link that appears on the website.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="video-link" className="text-sm font-medium block mb-2">YouTube Embed URL</label>
                    <Input 
                      id="video-link" 
                      value={videoLink} 
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <Button onClick={saveVideoLink}>Save Video Link</Button>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Edit size={18} className="text-blue-500" />
                  <h3 className="text-xl font-medium">About Text Editor</h3>
                </div>
                <p className="text-gray-400 mb-4">Edit the About text that appears in the website footer.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="about-en" className="text-sm font-medium block mb-2">English Text</label>
                    <Textarea 
                      id="about-en" 
                      value={aboutText.en} 
                      onChange={(e) => setAboutText({...aboutText, en: e.target.value})}
                      className="bg-gray-800 border-gray-700 h-24"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="about-pt" className="text-sm font-medium block mb-2">Portuguese Text</label>
                    <Textarea 
                      id="about-pt" 
                      value={aboutText["pt-BR"]} 
                      onChange={(e) => setAboutText({...aboutText, "pt-BR": e.target.value})}
                      className="bg-gray-800 border-gray-700 h-24"
                    />
                  </div>
                  
                  <Button onClick={saveAboutText}>Save About Text</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="space-y-8">
              <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Edit size={18} className="text-blue-500" />
                  <h3 className="text-xl font-medium">About Page Content</h3>
                </div>
                <p className="text-gray-400 mb-4">Edit the content that appears on the About page.</p>
                
                <div className="space-y-6">
                  {/* Title */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Title (English)</label>
                      <Input 
                        value={aboutPageContent.title.en} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          title: { ...aboutPageContent.title, en: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Title (Portuguese)</label>
                      <Input 
                        value={aboutPageContent.title["pt-BR"]} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          title: { ...aboutPageContent.title, "pt-BR": e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>
                  
                  {/* Subtitle */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Subtitle (English)</label>
                      <Input 
                        value={aboutPageContent.subtitle.en} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          subtitle: { ...aboutPageContent.subtitle, en: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Subtitle (Portuguese)</label>
                      <Input 
                        value={aboutPageContent.subtitle["pt-BR"]} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          subtitle: { ...aboutPageContent.subtitle, "pt-BR": e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Description (English)</label>
                      <Textarea 
                        value={aboutPageContent.description.en} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          description: { ...aboutPageContent.description, en: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-32"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Description (Portuguese)</label>
                      <Textarea 
                        value={aboutPageContent.description["pt-BR"]} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          description: { ...aboutPageContent.description, "pt-BR": e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-32"
                      />
                    </div>
                  </div>
                  
                  {/* Mission */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Mission (English)</label>
                      <Textarea 
                        value={aboutPageContent.mission.en} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          mission: { ...aboutPageContent.mission, en: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-24"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Mission (Portuguese)</label>
                      <Textarea 
                        value={aboutPageContent.mission["pt-BR"]} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          mission: { ...aboutPageContent.mission, "pt-BR": e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-24"
                      />
                    </div>
                  </div>
                  
                  {/* Story */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium block mb-2">Story (English)</label>
                      <Textarea 
                        value={aboutPageContent.story.en} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          story: { ...aboutPageContent.story, en: e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-24"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-2">Story (Portuguese)</label>
                      <Textarea 
                        value={aboutPageContent.story["pt-BR"]} 
                        onChange={(e) => setAboutPageContent({
                          ...aboutPageContent, 
                          story: { ...aboutPageContent.story, "pt-BR": e.target.value }
                        })}
                        className="bg-gray-800 border-gray-700 h-24"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={saveAboutPageContent} className="mt-4">Save About Page Content</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
