'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck, Check, MapPin, Users } from 'lucide-react';
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
import { EventItem, formatEventDate, tracks } from '@/data/events';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/lib/actions';
import { bookingFormSchema } from '@/lib/schemas';

// Define props for the BookingSection component
interface BookingSectionProps {
  event: EventItem;
  locale: string;
}

const BookingSection = ({ event, locale }: BookingSectionProps) => {
  const t = useTranslations('events');
  const trackName = tracks[event.track];
  const formattedDate = formatEventDate(event.date, locale);

  return (
    <section
      id="booking"
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
              {t('bookingSection.title')}
            </h2>
            <div className="h-1 w-24 bg-white mb-8"></div>

            <p className="text-lg text-white/80 mb-8">
              {t('bookingSection.description', {
                track: trackName,
                date: formattedDate,
                fallback: `Book your spot for our event at ${trackName} on ${formattedDate}. Limited places available!`,
              })}
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('bookingSection.whyBook')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('bookingSection.benefits.coaching')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('bookingSection.benefits.track')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('bookingSection.benefits.equipment')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 h-5 w-5 mt-1" />
                  <span className="text-white/80">
                    {t('bookingSection.benefits.community')}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                {t('bookingSection.eventDetails')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CalendarCheck className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">
                    {formattedDate} | {event.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">{t('track', { track: trackName })}</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-white mr-3 h-5 w-5" />
                  <span className="text-white/80">
                    {t('bookingSection.sessionsLeft', {
                      sessions:
                        event.capacity && event.registrations
                          ? event.capacity - event.registrations
                          : 'Limited',
                      fallback: 'Limited spots available',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-6">
              {t('bookingSection.form.title')}
            </h3>
            <BookingForm event={event} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Booking form component with React Hook Form
const BookingForm = ({ event }: { event: EventItem }) => {
  const t = useTranslations('events');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize form with React Hook Form and Zod validation
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      experience: '',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
    setIsSubmitting(true);
    try {
      // Adapt the booking form values to match the contact form schema
      const contactFormData = {
        ...values,
        interest: `Event Booking: ${tracks[event.track]} - ${formatEventDate(event.date)}`,
        // Ensure message is not undefined for the contact form schema
        message:
          values.message || `Booking request for ${tracks[event.track]} event`,
      };

      const result = await sendContactEmail(contactFormData);

      if (result.success) {
        setIsSuccess(true);
        toast({
          title: t('bookingSection.form.successTitle'),
          description: t('bookingSection.form.successMessage'),
        });
        form.reset();
      } else {
        toast({
          title: t('bookingSection.form.errorTitle'),
          description: t('bookingSection.form.errorMessage'),
          variant: 'destructive',
        });
        console.error('Form submission error:', result.error);
      }
    } catch (error) {
      toast({
        title: t('bookingSection.form.errorTitle'),
        description: t('bookingSection.form.errorMessage'),
        variant: 'destructive',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSuccess ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-xl font-bold mb-2">
            {t('bookingSection.form.thankYou')}
          </h4>
          <p className="text-muted-foreground mb-6">
            {t('bookingSection.form.confirmationSent')}
          </p>
          <Button onClick={() => setIsSuccess(false)} className="btn-secondary">
            {t('bookingSection.form.bookAnother')}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      {t('bookingSection.form.firstName')}
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
                      {t('bookingSection.form.lastName')}
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
                    {t('bookingSection.form.email')}
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
                    {t('bookingSection.form.phone')}
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
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-muted-foreground">
                    {t('bookingSection.form.experience.label')}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t(
                            'bookingSection.form.experience.placeholder',
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">
                        {t('bookingSection.form.experience.none')}
                      </SelectItem>
                      <SelectItem value="beginner">
                        {t('bookingSection.form.experience.beginner')}
                      </SelectItem>
                      <SelectItem value="intermediate">
                        {t('bookingSection.form.experience.intermediate')}
                      </SelectItem>
                      <SelectItem value="experienced">
                        {t('bookingSection.form.experience.experienced')}
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
                    {t('bookingSection.form.message.label')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('bookingSection.form.message.placeholder')}
                      rows={3}
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
              {isSubmitting
                ? t('bookingSection.form.submitting')
                : t('bookingSection.form.submit')}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              {t('bookingSection.form.disclaimer')}
            </p>
          </form>
        </Form>
      )}
    </>
  );
};

export default BookingSection;
