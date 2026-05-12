
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
      // Make sure all required fields are non-optional to match Supabase schema requirements
      const waitlistData = {
        full_name: data.full_name,
        email: data.email,
        whatsapp: data.whatsapp,
      };

      // Insert data into Supabase with a 15s safety timeout so the
      // button never gets stuck on "Submitting..." if the network hangs.
      const insertPromise = supabase.from('waitlist').insert(waitlistData);
      const timeoutPromise = new Promise<{ error: { code?: string; message: string; status?: number } }>(
        (resolve) => setTimeout(
          () => resolve({ error: { message: 'Request timed out. Please try again.', code: 'TIMEOUT' } }),
          15000,
        ),
      );
      const { error } = (await Promise.race([insertPromise, timeoutPromise])) as
        { error: { code?: string; message: string; status?: number; details?: string } | null };

      if (error) {
        // Handle unique constraint / duplicate email — treat as success-like message,
        // the lead is already captured.
        const isDuplicate =
          error.code === '23505' ||
          error.status === 409 ||
          /duplicate key|already exists|unique constraint/i.test(error.message || '') ||
          /duplicate key|already exists|unique constraint/i.test(error.details || '');

        if (isDuplicate) {
          toast({
            title: language === 'en' ? "You're already on the list 🎉" : 'Você já está na lista 🎉',
            description: language === 'en'
              ? "We already have your email. We'll notify you when Eluvie launches."
              : 'Já temos seu email. Avisaremos você quando a Eluvie for lançada.',
          });
          if (onSuccess) onSuccess();
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
      console.error('Error submitting waitlist form:', error, JSON.stringify(error));

      // Fallback: don't lose the lead. Persist locally so it can be recovered later.
      try {
        const pending = JSON.parse(localStorage.getItem('waitlist_pending') || '[]');
        pending.push({ ...data, ts: new Date().toISOString() });
        localStorage.setItem('waitlist_pending', JSON.stringify(pending));
      } catch {}

      toast({
        variant: 'destructive',
        title: language === 'en' ? 'Something went wrong' : 'Algo deu errado',
        description: language === 'en'
          ? 'We saved your info locally. Please try again or contact us at suporte@eluvie.com.'
          : 'Salvamos seus dados localmente. Tente novamente ou entre em contato em suporte@eluvie.com.',
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
          className={buttonClassName || "w-full py-5 bg-brand-gradient hover:opacity-90 transition-opacity"}
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
