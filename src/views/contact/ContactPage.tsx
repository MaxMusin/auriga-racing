'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/actions';
import { contactFormSchema } from '@/lib/schemas';

const ContactPage = () => {
  const t = useTranslations('contact');

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/raidillon.jpg"
            alt="Raidillon corner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t('contactInfo.title')}
              </h2>
              <div className="h-1 w-24 bg-racing-red mb-8"></div>

              <p className="text-lg text-muted-foreground mb-8">
                {t('contactInfo.description')}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">
                  {t('contactInfo.whyContactUs')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-racing-red mr-2 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">
                      {t('contactInfo.reasons.events')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-racing-red mr-2 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">
                      {t('contactInfo.reasons.membership')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-racing-red mr-2 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">
                      {t('contactInfo.reasons.partnership')}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-racing-red mr-2 h-5 w-5 mt-1" />
                    <span className="text-muted-foreground">
                      {t('contactInfo.reasons.support')}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">
                  {t('contactInfo.details.title')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="text-racing-red mr-3 h-5 w-5" />
                    <span className="text-muted-foreground">
                      {t('contactInfo.details.address')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-racing-red mr-3 h-5 w-5" />
                    <a
                      href="mailto:hello@aurigaracing.be"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@aurigaracing.be
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-racing-red mr-3 h-5 w-5" />
                    <a
                      href="tel:+32123456789"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +32 123 456 789
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6">{t('form.title')}</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact form component with React Hook Form and Resend integration
function ContactForm() {
  const t = useTranslations('contact.form');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: '',
      experience: '',
      message: '',
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(values);

      if (result.success) {
        toast({
          title: t('success.title'),
          description: t('success.message'),
        });
        form.reset();
      } else {
        toast({
          title: t('error.title'),
          description: result.error ? String(result.error) : t('error.message'),
          variant: 'destructive',
        });
      }
    } catch {
      // Catch any unexpected errors without binding to a variable
      toast({
        title: t('error.title'),
        description: t('error.message'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    {t('firstName.label')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('firstName.placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    {t('lastName.label')}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t('lastName.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  {t('email.label')}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('email.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  {t('phone.label')}
                </FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  {t('interest.label')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('interest.placeholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trackday">
                      {t('interest.trackday')}
                    </SelectItem>
                    <SelectItem value="simracing">
                      {t('interest.simracing')}
                    </SelectItem>
                    <SelectItem value="partnership">
                      {t('interest.partnership')}
                    </SelectItem>
                    <SelectItem value="other">
                      {t('interest.other')}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  {t('experience.label')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('experience.placeholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">
                      {t('experience.none')}
                    </SelectItem>
                    <SelectItem value="beginner">
                      {t('experience.beginner')}
                    </SelectItem>
                    <SelectItem value="intermediate">
                      {t('experience.intermediate')}
                    </SelectItem>
                    <SelectItem value="experienced">
                      {t('experience.experienced')}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-muted-foreground">
                  {t('message.label')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('message.placeholder')}
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="btn-primary w-full py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t('disclaimer')}
          </p>
        </form>
      </Form>
    </>
  );
}

export default ContactPage;
