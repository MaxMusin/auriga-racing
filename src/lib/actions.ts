'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { emailFormSchema } from './schemas';

// Initialize Resend with a fallback for development
const resendApiKey = process.env.RESEND_API_KEY || 'test_api_key';
const resend = new Resend(resendApiKey);

export async function sendContactEmail(formData: z.infer<typeof emailFormSchema>) {
  try {
    const validatedFields = emailFormSchema.parse(formData);
    
    const { firstName, lastName, email, phone, interest, experience, message } = validatedFields;
    
    if (!resendApiKey || resendApiKey === 'test_api_key') {
      console.log('Using test mode - would have sent:');
      console.log({
        from: 'Auriga Racing <hello@aurigaracing.be>',
        to: ['hello@aurigaracing.be'],
        replyTo: email,
        subject: `Auriga Racing - Form: ${interest || 'Event Booking'} | ${firstName} ${lastName}`,
        message: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nInterest: ${interest || 'Event Booking'}\nExperience: ${experience || 'Not provided'}\nMessage: ${message || 'No message provided'}`
      });
      
      return { success: true, data: { id: 'test_email_id' } };
    }
    
    const { data, error } = await resend.emails.send({
      from: 'Auriga Racing <hello@aurigaracing.be>',
      to: ['hello@aurigaracing.be'],
      replyTo: email,
      subject: `Auriga Racing - Form: ${interest || 'Event Booking'} | ${firstName} ${lastName}`,
      html: `
        <h2>Auriga Racing</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest || 'Event Booking'}</p>
        <p><strong>Experience:</strong> ${experience || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'No message provided'}</p>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors };
    }
    
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
