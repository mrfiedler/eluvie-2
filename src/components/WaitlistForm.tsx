
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
  full_name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  whatsapp: z.string().min(10, { message: 'Please enter a valid WhatsApp number' }),
});

export type FormValues = z.infer<typeof formSchema>;

interface WaitlistFormProps {
  onSuccess?: () => void;
  buttonClassName?: string;
}

const WaitlistForm = ({ onSuccess, buttonClassName }: WaitlistFormProps) => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      email: '',
      whatsapp: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Insert data into Supabase with explicitly defined required fields
      const { error } = await supabase
        .from('waitlist')
        .insert(data);
      
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
      
      if (onSuccess) {
        onSuccess();
      }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="full_name"
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
          className={buttonClassName || "w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (language === 'en' ? 'Submitting...' : 'Enviando...') 
            : (language === 'en' ? 'Join the Waitlist' : 'Entrar na Lista de Espera')}
        </Button>
      </form>
    </Form>
  );
};

export default WaitlistForm;
