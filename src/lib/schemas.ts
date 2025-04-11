import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  interest: z.string().min(1, {
    message: "Please select an interest.",
  }),
  experience: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export const bookingFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required for event registration.",
  }),
  experience: z.string().min(1, {
    message: "Please select your experience level.",
  }),
  message: z.string().optional(),
  interest: z.string().optional(), // Added for compatibility with the email function
});

// Combined type for the email action function
export const emailFormSchema = z.union([contactFormSchema, bookingFormSchema]);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type BookingFormValues = z.infer<typeof bookingFormSchema>;
export type EmailFormValues = z.infer<typeof emailFormSchema>;
