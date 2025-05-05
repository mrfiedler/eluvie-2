import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useWaitlistUsers } from '@/hooks/useWaitlistUsers';
import { useVideoUrls } from '@/hooks/useVideoUrls';
import { ArrowLeft, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type AboutContent = {
  title: {
    en: string;
    'pt-BR': string;
  };
  subtitle: {
    en: string;
    'pt-BR': string;
  };
  description: {
    en: string;
    'pt-BR': string;
  };
  mission: {
    en: string;
    'pt-BR': string;
  };
  story: {
    en: string;
    'pt-BR': string;
  };
};

const defaultContent: AboutContent = {
  title: {
    en: 'About Eluvie',
    'pt-BR': 'Sobre a Eluvie',
  },
  subtitle: {
    en: 'Our story and mission',
    'pt-BR': 'Nossa história e missão',
  },
  description: {
    en: 'Eluvie is a financial platform designed specifically for creative professionals. We understand the unique challenges that designers, photographers, writers, and other creatives face when managing their finances.',
    'pt-BR': 'Eluvie é uma plataforma financeira projetada especificamente para profissionais criativos. Entendemos os desafios únicos que designers, fotógrafos, escritores e outros criativos enfrentam ao gerenciar suas finanças.'
  },
  mission: {
    en: 'Our mission is to empower creative professionals with financial tools that are as intuitive and beautiful as the work they produce. We believe that managing money should be simple, visual, and even enjoyable.',
    'pt-BR': 'Nossa missão é capacitar profissionais criativos com ferramentas financeiras tão intuitivas e bonitas quanto o trabalho que produzem. Acreditamos que gerenciar dinheiro deve ser simples, visual e até agradável.'
  },
  story: {
    en: "Founded in 2023 by a team of designers and developers who were frustrated with existing financial tools, Eluvie was born from the belief that creative professionals deserve better. We've combined our expertise in design and finance to create a platform that speaks your language.",
    'pt-BR': 'Fundada em 2023 por uma equipe de designers e desenvolvedores frustrados com as ferramentas financeiras existentes, a Eluvie nasceu da crença de que profissionais criativos merecem algo melhor. Combinamos nossa experiência em design e finanças para criar uma plataforma que fala a sua língua.'
  }
};

const Admin = () => {
  const { toast } = useToast();
  const { language, setLanguage } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultContent);
  const [activeTab, setActiveTab] = useState(language);
  const [currentSection, setCurrentSection] = useState('about');
  const { users, loading: loadingUsers, error: userError, refetch: refetchUsers } = useWaitlistUsers();
  const { videoUrls, updateVideoUrl, convertToEmbedUrl } = useVideoUrls();
  
  // Video URLs state - keep raw URLs for display in input fields
  const [homepageVideo, setHomepageVideo] = useState(videoUrls.homepage);
  const [comingSoonVideo, setComingSoonVideo] = useState(videoUrls.comingSoon);

  // Load saved content from localStorage on component mount
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem('eluvie_about_content');
      if (savedContent) {
        setAboutContent(JSON.parse(savedContent));
      }
    } catch (e) {
      console.error('Error loading saved content:', e);
    }
  }, []);

  const handleSaveAbout = () => {
    try {
      localStorage.setItem('eluvie_about_content', JSON.stringify(aboutContent));
      toast({
        title: "Success",
        description: "About page content has been updated.",
      });
    } catch (e) {
      console.error('Error saving content:', e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save content.",
      });
    }
  };

  const handleSaveVideos = () => {
    updateVideoUrl('homepage', homepageVideo);
    updateVideoUrl('comingSoon', comingSoonVideo);
    
    toast({
      title: "Success",
      description: "Video URLs have been updated.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const updateContent = (section: keyof AboutContent, language: 'en' | 'pt-BR', value: string) => {
    setAboutContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/" className="mr-4 hover:text-blue-400">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-[#2a2a2a]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <Alert className="mb-6 bg-blue-900/20 border-blue-800">
          <AlertTitle>Admin Area</AlertTitle>
          <AlertDescription>
            This area allows you to manage website content and settings.
          </AlertDescription>
        </Alert>
        
        <div className="grid md:grid-cols-[200px_1fr] gap-6">
          <div className="space-y-4">
            <Card className="bg-[#202020] border-gray-700">
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${currentSection === 'about' ? 'bg-blue-900/20 text-blue-400' : ''}`}
                    onClick={() => setCurrentSection('about')}
                  >
                    About Page
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${currentSection === 'videos' ? 'bg-blue-900/20 text-blue-400' : ''}`}
                    onClick={() => setCurrentSection('videos')}
                  >
                    Video Links
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${currentSection === 'users' ? 'bg-blue-900/20 text-blue-400' : ''}`}
                    onClick={() => setCurrentSection('users')}
                  >
                    User List
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setCurrentSection('settings')}
                  >
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* About Page Content Section */}
            {currentSection === 'about' && (
              <>
                <Card className="bg-[#202020] border-gray-700">
                  <CardHeader>
                    <CardTitle>About Page Content</CardTitle>
                    <CardDescription>
                      Edit the content that appears on the About page.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'en' | 'pt-BR')}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="en">English</TabsTrigger>
                        <TabsTrigger value="pt-BR">Portuguese</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="en" className="space-y-4">
                        <div>
                          <Label htmlFor="title-en">Title</Label>
                          <Input 
                            id="title-en" 
                            value={aboutContent.title.en} 
                            onChange={(e) => updateContent('title', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subtitle-en">Subtitle</Label>
                          <Input 
                            id="subtitle-en" 
                            value={aboutContent.subtitle.en} 
                            onChange={(e) => updateContent('subtitle', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description-en">Main Description</Label>
                          <Textarea 
                            id="description-en" 
                            value={aboutContent.description.en} 
                            onChange={(e) => updateContent('description', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="mission-en">Our Mission</Label>
                          <Textarea 
                            id="mission-en" 
                            value={aboutContent.mission.en} 
                            onChange={(e) => updateContent('mission', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="story-en">Our Story</Label>
                          <Textarea 
                            id="story-en" 
                            value={aboutContent.story.en} 
                            onChange={(e) => updateContent('story', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="pt-BR" className="space-y-4">
                        <div>
                          <Label htmlFor="title-pt">Título</Label>
                          <Input 
                            id="title-pt" 
                            value={aboutContent.title['pt-BR']} 
                            onChange={(e) => updateContent('title', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subtitle-pt">Subtítulo</Label>
                          <Input 
                            id="subtitle-pt" 
                            value={aboutContent.subtitle['pt-BR']} 
                            onChange={(e) => updateContent('subtitle', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description-pt">Descrição Principal</Label>
                          <Textarea 
                            id="description-pt" 
                            value={aboutContent.description['pt-BR']} 
                            onChange={(e) => updateContent('description', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="mission-pt">Nossa Missão</Label>
                          <Textarea 
                            id="mission-pt" 
                            value={aboutContent.mission['pt-BR']} 
                            onChange={(e) => updateContent('mission', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                        <div>
                          <Label htmlFor="story-pt">Nossa História</Label>
                          <Textarea 
                            id="story-pt" 
                            value={aboutContent.story['pt-BR']} 
                            onChange={(e) => updateContent('story', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700"
                            rows={4}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveAbout} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-[#202020] border-gray-700">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      This is how the about page will appear in {activeTab === 'en' ? 'English' : 'Portuguese'}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="bg-[#1a1a1a] rounded-md p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold mb-2">{aboutContent.title[activeTab as 'en' | 'pt-BR']}</h2>
                    <p className="text-gray-400 mb-4">{aboutContent.subtitle[activeTab as 'en' | 'pt-BR']}</p>
                    <p className="mb-6">{aboutContent.description[activeTab as 'en' | 'pt-BR']}</p>
                    <h3 className="text-xl font-semibold mb-2">
                      {activeTab === 'en' ? 'Our Mission' : 'Nossa Missão'}
                    </h3>
                    <p className="mb-6">{aboutContent.mission[activeTab as 'en' | 'pt-BR']}</p>
                    <h3 className="text-xl font-semibold mb-2">
                      {activeTab === 'en' ? 'Our Story' : 'Nossa História'}
                    </h3>
                    <p>{aboutContent.story[activeTab as 'en' | 'pt-BR']}</p>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Video Links Section */}
            {currentSection === 'videos' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader>
                  <CardTitle>Video URLs</CardTitle>
                  <CardDescription>
                    Manage the video URLs that appear on the homepage and coming soon pages.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="homepage-video">Homepage Video URL</Label>
                      <Input
                        id="homepage-video"
                        value={homepageVideo}
                        onChange={(e) => setHomepageVideo(e.target.value)}
                        className="bg-[#1a1a1a] border-gray-700"
                        placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        You can paste any YouTube URL format (watch, short, or embed)
                      </p>
                    </div>
                    
                    <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700">
                      <h3 className="text-sm font-medium mb-2">Preview:</h3>
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src={convertToEmbedUrl(homepageVideo)} 
                          title="Homepage Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t border-gray-700">
                    <div>
                      <Label htmlFor="coming-soon-video">Coming Soon Page Video URL</Label>
                      <Input
                        id="coming-soon-video"
                        value={comingSoonVideo}
                        onChange={(e) => setComingSoonVideo(e.target.value)}
                        className="bg-[#1a1a1a] border-gray-700"
                        placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        You can paste any YouTube URL format (watch, short, or embed)
                      </p>
                    </div>
                    
                    <div className="bg-[#1a1a1a] p-4 rounded-md border border-gray-700">
                      <h3 className="text-sm font-medium mb-2">Preview:</h3>
                      <div className="aspect-video rounded-md overflow-hidden">
                        <iframe 
                          className="w-full h-full"
                          src={convertToEmbedUrl(comingSoonVideo)} 
                          title="Coming Soon Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveVideos} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Video URLs
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* User List Section */}
            {currentSection === 'users' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Waitlist Users</CardTitle>
                    <CardDescription>
                      Users who have registered for the waitlist.
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={refetchUsers}
                    disabled={loadingUsers}
                    className="border-gray-700 hover:bg-gray-800"
                  >
                    Refresh List
                  </Button>
                </CardHeader>
                <CardContent>
                  {loadingUsers ? (
                    <div className="flex justify-center my-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : userError ? (
                    <Alert variant="destructive" className="bg-red-900/20 border-red-800">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Failed to load users: {userError}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="rounded-md border border-gray-700 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-[#1a1a1a] hover:bg-[#1a1a1a]">
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Date Registered</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                                No users have registered yet.
                              </TableCell>
                            </TableRow>
                          ) : (
                            users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.whatsapp || '—'}</TableCell>
                                <TableCell>
                                  {new Date(user.created_at).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
