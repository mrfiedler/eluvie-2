
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  whatsapp: z.string().min(10, { message: 'Please enter a valid WhatsApp number' }),
});

type FormValues = z.infer<typeof formSchema>;

const WaitlistSection = () => {
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
      // Insert data into Supabase
      const { error } = await supabase
        .from('waitlist')
        .insert([data]);
      
      if (error) {
        // Handle unique constraint error (user already registered)
        if (error.code === '23505') {
          toast({
            variant: "destructive",
            title: language === 'en' ? 'Already registered' : 'Já cadastrado',
            description: language === 'en' ? 'This email is already registered.' : 'Este email já está registrado.'
          });
          setIsSubmitting(false);
          return;
        }
        
        throw error;
      }
      
      toast({
        title: language === 'en' ? 'Successfully joined waitlist!' : 'Adicionado à lista de espera com sucesso!',
        description: language === 'en' ? "We'll notify you when Eluvie launches." : "Notificaremos você quando o Eluvie for lançado."
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
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
    <section id="waitlist" className="section bg-[#202020] relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="max-w-lg mx-auto md:mr-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {language === 'en' ? 'Join Our Waitlist' : 'Entre na Nossa Lista de Espera'}
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                {language === 'en' 
                  ? 'Be the first to know when Eluvie launches. Get early access and exclusive offers!' 
                  : 'Seja o primeiro a saber quando o Eluvie for lançado. Obtenha acesso antecipado e ofertas exclusivas!'}
              </p>
              
              {isSubmitted ? (
                <div className="bg-[#1a1a1a]/70 border border-gray-700 rounded-xl p-8 text-center">
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'en' ? 'Name' : 'Nome'}</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-[#1a1a1a] border-gray-700" 
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
                              className="bg-[#1a1a1a] border-gray-700" 
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
                              className="bg-[#1a1a1a] border-gray-700" 
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
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <img 
                  src="/lovable-uploads/fee0e698-51e9-462e-99b1-b5156482c06b.png" 
                  alt="Eluvie Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Floating notification card */}
              <div className="absolute -bottom-6 -left-6 bg-[#1a1a1a] rounded-xl shadow-lg p-4 max-w-[15rem] border border-gray-700 animate-float">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <p className="text-xs font-medium text-gray-200">{t('payment-received')}</p>
                </div>
                <p className="text-sm text-gray-400">{t('payment-info')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
