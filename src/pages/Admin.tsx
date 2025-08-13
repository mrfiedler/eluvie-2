import React, { useState, useEffect } from 'react';
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
import { ArrowLeft, LogOut, Plus, Trash, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Define the AboutContent type properly
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
  values_title: {
    en: string;
    'pt-BR': string;
  };
  values_content: {
    en: string[];
    'pt-BR': string[];
  };
  values_headers: {
    en: string[];
    'pt-BR': string[];
  };
  image_url: string;
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
  },
  values_title: {
    en: 'Our Values',
    'pt-BR': 'Nossos Valores'
  },
  values_headers: {
    en: ['Simplicity:', 'Transparency:', 'Empowerment:'],
    'pt-BR': ['Simplicidade:', 'Transparência:', 'Capacitação:']
  },
  values_content: {
    en: [
      'We believe financial tools should be as simple and intuitive as the creative tools you already love.',
      'No hidden fees, no confusing terms—just clear, visual representations of your financial state.',
      'We want to give creative professionals the confidence to make informed business decisions.'
    ],
    'pt-BR': [
      'Acreditamos que as ferramentas financeiras devem ser tão simples e intuitivas quanto as ferramentas criativas que você já ama.',
      'Sem taxas ocultas, sem termos confusos—apenas representações claras e visuais do seu estado financeiro.',
      'Queremos dar aos profissionais criativos a confiança para tomar decisões de negócios informadas.'
    ]
  },
  image_url: '/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png'
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
        const parsedContent = JSON.parse(savedContent);
        // Ensure parsedContent is an object before merging
        if (parsedContent && typeof parsedContent === 'object') {
          setAboutContent({
            title: {
              en: parsedContent.title?.en || defaultContent.title.en,
              'pt-BR': parsedContent.title?.['pt-BR'] || defaultContent.title['pt-BR']
            },
            subtitle: {
              en: parsedContent.subtitle?.en || defaultContent.subtitle.en,
              'pt-BR': parsedContent.subtitle?.['pt-BR'] || defaultContent.subtitle['pt-BR']
            },
            description: {
              en: parsedContent.description?.en || defaultContent.description.en,
              'pt-BR': parsedContent.description?.['pt-BR'] || defaultContent.description['pt-BR']
            },
            mission: {
              en: parsedContent.mission?.en || defaultContent.mission.en,
              'pt-BR': parsedContent.mission?.['pt-BR'] || defaultContent.mission['pt-BR']
            },
            story: {
              en: parsedContent.story?.en || defaultContent.story.en,
              'pt-BR': parsedContent.story?.['pt-BR'] || defaultContent.story['pt-BR']
            },
            values_title: {
              en: parsedContent.values_title?.en || defaultContent.values_title.en,
              'pt-BR': parsedContent.values_title?.['pt-BR'] || defaultContent.values_title['pt-BR']
            },
            values_headers: {
              en: parsedContent.values_headers?.en || defaultContent.values_headers.en,
              'pt-BR': parsedContent.values_headers?.['pt-BR'] || defaultContent.values_headers['pt-BR']
            },
            values_content: {
              en: parsedContent.values_content?.en || defaultContent.values_content.en,
              'pt-BR': parsedContent.values_content?.['pt-BR'] || defaultContent.values_content['pt-BR']
            },
            image_url: parsedContent.image_url || defaultContent.image_url
          });
        }
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

  const updateContent = (section: keyof AboutContent, language: 'en' | 'pt-BR', value: string | string[]) => {
    setAboutContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [language]: value
      }
    }));
  };

  const updateImageUrl = (url: string) => {
    setAboutContent(prev => ({
      ...prev,
      image_url: url
    }));
  };

  const addValue = (language: 'en' | 'pt-BR') => {
    setAboutContent(prev => {
      const newHeaders = [...prev.values_headers[language], ''];
      const newContent = [...prev.values_content[language], ''];
      
      return {
        ...prev,
        values_headers: {
          ...prev.values_headers,
          [language]: newHeaders
        },
        values_content: {
          ...prev.values_content,
          [language]: newContent
        }
      };
    });
  };

  const removeValue = (language: 'en' | 'pt-BR', index: number) => {
    setAboutContent(prev => {
      const newHeaders = [...prev.values_headers[language]];
      const newContent = [...prev.values_content[language]];
      
      newHeaders.splice(index, 1);
      newContent.splice(index, 1);
      
      return {
        ...prev,
        values_headers: {
          ...prev.values_headers,
          [language]: newHeaders
        },
        values_content: {
          ...prev.values_content,
          [language]: newContent
        }
      };
    });
  };

  const updateValueHeader = (language: 'en' | 'pt-BR', index: number, value: string) => {
    setAboutContent(prev => {
      const newHeaders = [...prev.values_headers[language]];
      newHeaders[index] = value;
      
      return {
        ...prev,
        values_headers: {
          ...prev.values_headers,
          [language]: newHeaders
        }
      };
    });
  };

  const updateValueContent = (language: 'en' | 'pt-BR', index: number, value: string) => {
    setAboutContent(prev => {
      const newContent = [...prev.values_content[language]];
      newContent[index] = value;
      
      return {
        ...prev,
        values_content: {
          ...prev.values_content,
          [language]: newContent
        }
      };
    });
  };

  // Function to handle image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Image is already uploaded to /lovable-uploads, just use the URL
      const reader = new FileReader();
      reader.onload = () => {
        // Temporary preview
        // The actual image path will be set when the file is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to select an existing uploaded image
  const selectUploadedImage = (imagePath: string) => {
    updateImageUrl(imagePath);
    toast({
      title: "Image Selected",
      description: "The image has been selected for the About page.",
    });
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
                    className={`w-full justify-start ${currentSection === 'images' ? 'bg-blue-900/20 text-blue-400' : ''}`}
                    onClick={() => setCurrentSection('images')}
                  >
                    About Image
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
                        
                        {/* Values Section */}
                        <div className="pt-4 border-t border-gray-700">
                          <div className="flex justify-between items-center mb-3">
                            <Label htmlFor="values-title-en">Values Section Title</Label>
                          </div>
                          <Input 
                            id="values-title-en" 
                            value={aboutContent.values_title.en} 
                            onChange={(e) => updateContent('values_title', 'en', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700 mb-4"
                          />
                          
                          <div className="space-y-6">
                            {aboutContent.values_headers.en.map((header, index) => (
                              <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-md relative">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="absolute right-2 top-2 text-gray-400 hover:text-red-400"
                                  onClick={() => removeValue('en', index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                                
                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor={`value-header-en-${index}`}>Value Header</Label>
                                    <Input 
                                      id={`value-header-en-${index}`} 
                                      value={header} 
                                      onChange={(e) => updateValueHeader('en', index, e.target.value)}
                                      className="bg-[#2a2a2a] border-gray-700"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`value-content-en-${index}`}>Value Description</Label>
                                    <Textarea 
                                      id={`value-content-en-${index}`} 
                                      value={aboutContent.values_content.en[index]} 
                                      onChange={(e) => updateValueContent('en', index, e.target.value)}
                                      className="bg-[#2a2a2a] border-gray-700"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            <Button 
                              variant="outline" 
                              className="w-full border-dashed bg-transparent border-gray-700 hover:bg-[#2a2a2a]"
                              onClick={() => addValue('en')}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add New Value
                            </Button>
                          </div>
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
                        
                        {/* Values Section - Portuguese */}
                        <div className="pt-4 border-t border-gray-700">
                          <div className="flex justify-between items-center mb-3">
                            <Label htmlFor="values-title-pt">Título da Seção de Valores</Label>
                          </div>
                          <Input 
                            id="values-title-pt" 
                            value={aboutContent.values_title['pt-BR']} 
                            onChange={(e) => updateContent('values_title', 'pt-BR', e.target.value)}
                            className="bg-[#1a1a1a] border-gray-700 mb-4"
                          />
                          
                          <div className="space-y-6">
                            {aboutContent.values_headers['pt-BR'].map((header, index) => (
                              <div key={index} className="p-4 bg-[#1a1a1a] border border-gray-700 rounded-md relative">
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="absolute right-2 top-2 text-gray-400 hover:text-red-400"
                                  onClick={() => removeValue('pt-BR', index)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                                
                                <div className="space-y-3">
                                  <div>
                                    <Label htmlFor={`value-header-pt-${index}`}>Cabeçalho do Valor</Label>
                                    <Input 
                                      id={`value-header-pt-${index}`} 
                                      value={header} 
                                      onChange={(e) => updateValueHeader('pt-BR', index, e.target.value)}
                                      className="bg-[#2a2a2a] border-gray-700"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`value-content-pt-${index}`}>Descrição do Valor</Label>
                                    <Textarea 
                                      id={`value-content-pt-${index}`} 
                                      value={aboutContent.values_content['pt-BR'][index]} 
                                      onChange={(e) => updateValueContent('pt-BR', index, e.target.value)}
                                      className="bg-[#2a2a2a] border-gray-700"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            <Button 
                              variant="outline" 
                              className="w-full border-dashed bg-transparent border-gray-700 hover:bg-[#2a2a2a]"
                              onClick={() => addValue('pt-BR')}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Adicionar Novo Valor
                            </Button>
                          </div>
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
                    <p className="mb-6">{aboutContent.story[activeTab as 'en' | 'pt-BR']}</p>
                    
                    <h3 className="text-xl font-semibold mb-2">
                      {aboutContent.values_title[activeTab as 'en' | 'pt-BR']}
                    </h3>
                    <ul className="list-disc ml-6 space-y-2">
                      {aboutContent.values_headers[activeTab as 'en' | 'pt-BR'].map((header, index) => (
                        <li key={index}>
                          <strong>{header}</strong>{' '}
                          {aboutContent.values_content[activeTab as 'en' | 'pt-BR'][index]}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            )}

            {/* About Page Image Section */}
            {currentSection === 'images' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader>
                  <CardTitle>About Page Image</CardTitle>
                  <CardDescription>
                    Select or upload an image to be displayed on the About page.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="current-image">Current Image</Label>
                    <div className="mt-2 bg-[#1a1a1a] p-4 rounded-md border border-gray-700">
                      <div className="aspect-video rounded-md overflow-hidden mb-4 border border-gray-800">
                        <img 
                          src={aboutContent.image_url} 
                          alt="Current About Page" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-400">
                        {aboutContent.image_url}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Label className="mb-2 block">Select from Uploaded Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div 
                        className={`aspect-video relative cursor-pointer rounded-md overflow-hidden border-2 ${aboutContent.image_url === '/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png' ? 'border-blue-500' : 'border-gray-700'}`}
                        onClick={() => selectUploadedImage('/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png')}
                      >
                        <img 
                          src="/lovable-uploads/8b6cf37b-9352-4ffb-9d5f-7d50333791ee.png" 
                          alt="Team photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div 
                        className={`aspect-video relative cursor-pointer rounded-md overflow-hidden border-2 ${aboutContent.image_url === '/lovable-uploads/0da950c7-6e18-4083-8c37-72fc551f9225.png' ? 'border-blue-500' : 'border-gray-700'}`}
                        onClick={() => selectUploadedImage('/lovable-uploads/0da950c7-6e18-4083-8c37-72fc551f9225.png')}
                      >
                        <img 
                          src="/lovable-uploads/0da950c7-6e18-4083-8c37-72fc551f9225.png" 
                          alt="Interface screenshot" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div 
                        className={`aspect-video relative cursor-pointer rounded-md overflow-hidden border-2 ${aboutContent.image_url === '/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png' ? 'border-blue-500' : 'border-gray-700'}`}
                        onClick={() => selectUploadedImage('/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png')}
                      >
                        <img 
                          src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png" 
                          alt="App screenshot" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div 
                        className={`aspect-video relative cursor-pointer rounded-md overflow-hidden border-2 ${aboutContent.image_url === '/lovable-uploads/50090990-842e-4cea-a92b-ced353291b87.png' ? 'border-blue-500' : 'border-gray-700'}`}
                        onClick={() => selectUploadedImage('/lovable-uploads/50090990-842e-4cea-a92b-ced353291b87.png')}
                      >
                        <img 
                          src="/lovable-uploads/50090990-842e-4cea-a92b-ced353291b87.png" 
                          alt="Creative work" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div 
                        className={`aspect-video relative cursor-pointer rounded-md overflow-hidden border-2 ${aboutContent.image_url === '/lovable-uploads/9ecfcd8a-ead0-42a7-b0c3-24fd832ae490.png' ? 'border-blue-500' : 'border-gray-700'}`}
                        onClick={() => selectUploadedImage('/lovable-uploads/9ecfcd8a-ead0-42a7-b0c3-24fd832ae490.png')}
                      >
                        <img 
                          src="/lovable-uploads/9ecfcd8a-ead0-42a7-b0c3-24fd832ae490.png" 
                          alt="Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                    
                  <div className="pt-4 border-t border-gray-700">
                    <Label htmlFor="upload-image">Upload New Image</Label>
                    <p className="text-sm text-gray-400 mb-3">
                      Upload a new image to use on the About page.
                    </p>
                    <div className="flex items-center">
                      <Label
                        htmlFor="image-upload"
                        className="flex items-center gap-2 cursor-pointer bg-[#2a2a2a] hover:bg-[#333] px-4 py-2 rounded-md border border-gray-700 transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveAbout} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Video Links Section */}
            {currentSection === 'videos' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader>
                  <CardTitle>Video URLs</CardTitle>
                  <CardDescription>
                    Manage video URLs for homepage and coming soon page.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="homepage-video">Homepage Video URL</Label>
                    <p className="text-sm text-gray-400 mb-2">
                      Enter a YouTube URL for the background video on the homepage.
                    </p>
                    <Input 
                      id="homepage-video" 
                      value={homepageVideo} 
                      onChange={(e) => setHomepageVideo(e.target.value)}
                      className="bg-[#1a1a1a] border-gray-700"
                      placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Label htmlFor="coming-soon-video">Coming Soon Page Video URL</Label>
                    <p className="text-sm text-gray-400 mb-2">
                      Enter a YouTube URL for the background video on the coming soon page.
                    </p>
                    <Input 
                      id="coming-soon-video" 
                      value={comingSoonVideo} 
                      onChange={(e) => setComingSoonVideo(e.target.value)}
                      className="bg-[#1a1a1a] border-gray-700"
                      placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveVideos} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Video URLs
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Waitlist Users Section */}
            {currentSection === 'users' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader>
                  <CardTitle>Waitlist Users</CardTitle>
                  <CardDescription>
                    View and manage users who have signed up for the waitlist.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingUsers ? (
                    <div className="flex justify-center py-8">
                      <p>Loading users...</p>
                    </div>
                  ) : userError ? (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{userError}</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableCaption>List of waitlist users</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>WhatsApp</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.full_name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.whatsapp || 'N/A'}</TableCell>
                              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                          ))}
                          {users.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center">No users found</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={refetchUsers} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Refresh Users List
                  </Button>
                </CardFooter>
              </Card>
            )}

            {/* Settings Section */}
            {currentSection === 'settings' && (
              <Card className="bg-[#202020] border-gray-700">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage general settings for the website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="language-setting">Default Language</Label>
                    <p className="text-sm text-gray-400 mb-2">
                      Select the default language for the website.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        variant={language === 'en' ? 'default' : 'outline'} 
                        className={language === 'en' ? '' : 'bg-[#1a1a1a] hover:bg-[#2a2a2a]'}
                        onClick={() => setLanguage('en')}
                      >
                        English
                      </Button>
                      <Button 
                        variant={language === 'pt-BR' ? 'default' : 'outline'} 
                        className={language === 'pt-BR' ? '' : 'bg-[#1a1a1a] hover:bg-[#2a2a2a]'}
                        onClick={() => setLanguage('pt-BR')}
                      >
                        Portuguese
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
