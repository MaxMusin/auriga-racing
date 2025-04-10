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

const JoinSection = () => {
  const t = useTranslations('join');

  return (
    <section
      id="join"
      className="section-padding relative overflow-hidden bg-overlay-container"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/raidillon.jpg"
          alt="Raidillon corner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t('title')}
            </h2>
            <div className="h-1 w-24 bg-white mb-8"></div>

            <p className="text-lg text-white/80 mb-8">{t('description')}</p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('whyJoinUs')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.coaching')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.equipment')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">{t('benefits.events')}</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('benefits.community')}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('contact.title')}
              </h3>
              <div className="space-y-3">
              <div className="flex items-center">
                  <MapPin className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">
                    {t('contact.organization')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-white mr-3 h-5 w-5" />
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {t('contact.email')}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="text-white mr-3 h-5 w-5" />
                  <a
                    href={`tel:${t('contact.phone')}`}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {t('contact.phone')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">
              {t('form.title')}
            </h3>

            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact form component with React Hook Form and Resend integration
function ContactForm() {
  const t = useTranslations('join');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Define form with React Hook Form and zod validation
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
          title: t('form.success'),
          variant: 'default',
        });
        form.reset({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interest: '',
          experience: '',
          message: '',
        });
      } else {
        toast({
          title: t('form.error'),
          variant: 'destructive',
        });
        console.error('Form submission error:', result.error);
      }
    } catch (error) {
      toast({
        title: t('form.error'),
        variant: 'destructive',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name and Last Name in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    {t('form.firstName')}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    {t('form.lastName')}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  {t('form.email')}
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  {t('form.phone')}
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
                  {t('form.interest.label')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('form.interest.placeholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trackday">
                      {t('form.interest.trackday')}
                    </SelectItem>
                    <SelectItem value="simracing">
                      {t('form.interest.simracing')}
                    </SelectItem>
                    <SelectItem value="both">
                      {t('form.interest.both')}
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
                  {t('form.experience.label')}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t('form.experience.placeholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">
                      {t('form.experience.none')}
                    </SelectItem>
                    <SelectItem value="beginner">
                      {t('form.experience.beginner')}
                    </SelectItem>
                    <SelectItem value="intermediate">
                      {t('form.experience.intermediate')}
                    </SelectItem>
                    <SelectItem value="experienced">
                      {t('form.experience.experienced')}
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
                  {t('form.message.label')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('form.message.placeholder')}
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
            className="btn-primary w-full py-3 !mt-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : t('form.submit')}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t('form.disclaimer')}
          </p>
        </form>
      </Form>
    </>
  );
}

export default JoinSection;
