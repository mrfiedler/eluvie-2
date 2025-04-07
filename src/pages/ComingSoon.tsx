
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  whatsapp: z.string().min(10, { message: 'Please enter a valid WhatsApp number' }),
});

type FormValues = z.infer<typeof formSchema>;

const ComingSoon = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Here you'd normally send this data to your backend
      // Since we don't have a backend connected yet, let's simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage for now (temporary solution until database is connected)
      const waitlist = JSON.parse(localStorage.getItem('eluvie_waitlist') || '[]');
      waitlist.push({...data, timestamp: new Date().toISOString()});
      localStorage.setItem('eluvie_waitlist', JSON.stringify(waitlist));
      
      toast({
        title: language === 'en' ? 'Successfully joined waitlist!' : 'Adicionado à lista de espera com sucesso!',
        description: language === 'en' ? "We'll notify you when Eluvie launches." : "Notificaremos você quando o Eluvie for lançado."
      });
      
      setIsSubmitted(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Something went wrong' : 'Algo deu errado',
        description: language === 'en' ? 'Please try again later.' : 'Por favor, tente novamente mais tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100 flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/204d15de-ebe8-4ccf-bdf6-365e6f347594.png"
            alt="Eluvie Logo" 
            className="h-8" 
          />
        </Link>
        <Link 
          to="/" 
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          {language === 'en' ? 'Back to Home' : 'Voltar para Início'}
        </Link>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' ? 'Coming Soon' : 'Em breve'}
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              {language === 'en' 
                ? 'We're working hard to bring you the ultimate financial platform for creatives. Join our waitlist to be the first to know when we launch.' 
                : 'Estamos trabalhando arduamente para trazer a você a melhor plataforma financeira para criativos. Junte-se à nossa lista de espera para ser o primeiro a saber quando lançarmos.'}
            </p>
            
            {isSubmitted ? (
              <div className="bg-[#202020]/70 border border-gray-700 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'en' ? 'Thank you for joining!' : 'Obrigado por se juntar a nós!'}
                </h3>
                <p className="text-gray-400">
                  {language === 'en' 
                    ? "We'll notify you as soon as Eluvie launches." 
                    : "Notificaremos você assim que o Eluvie for lançado."}
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? 'Name' : 'Nome'}</FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-[#202020] border-gray-700" 
                            placeholder={language === 'en' ? 'Your name' : 'Seu nome'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'en' ? 'Email' : 'Email'}</FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-[#202020] border-gray-700" 
                            type="email"
                            placeholder={language === 'en' ? 'Your email address' : 'Seu endereço de email'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input 
                            className="bg-[#202020] border-gray-700" 
                            placeholder={language === 'en' ? 'Your WhatsApp number' : 'Seu número de WhatsApp'} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (language === 'en' ? 'Submitting...' : 'Enviando...') 
                      : (language === 'en' ? 'Join the Waitlist' : 'Entrar na Lista de Espera')}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
        
        <div className="md:w-1/2 bg-gradient-to-br from-[#202020] to-[#1a1a1a] p-6 md:p-0 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-lg p-6">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-700">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/M0Sp7ZP96Xo?autoplay=1&mute=1&loop=1&playlist=M0Sp7ZP96Xo" 
                title="Eluvie demonstration video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {language === 'en' ? 'Get a sneak peek' : 'Veja uma prévia'}
              </h3>
              <p className="text-gray-300">
                {language === 'en' 
                  ? 'Watch our demo video to see what Eluvie has to offer.' 
                  : 'Assista ao nosso vídeo de demonstração para ver o que o Eluvie tem a oferecer.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
