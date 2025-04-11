'use server';

import axios from 'axios';

// Brevo API configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_API_URL = 'https://api.brevo.com/v3';
// Use environment variable for list ID with fallback to 2
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '2', 10);

// Log pour débogage en production
console.log('Environment check on server load:');
console.log('- BREVO_API_KEY configured:', BREVO_API_KEY ? 'Yes' : 'No');
console.log('- BREVO_LIST_ID:', BREVO_LIST_ID);
console.log('- Node environment:', process.env.NODE_ENV);

/**
 * Subscribe an email to the Brevo newsletter list
 * @param email - Email address to subscribe
 * @param attributes - Optional additional attributes like name, etc.
 * @returns Promise with the subscription result
 */
export async function subscribeToNewsletter(
  email: string,
  attributes: Record<string, unknown> = {}
): Promise<{ success: boolean; message: string }> {
  // Log pour débogage
  console.log('Attempting to subscribe email:', email);
  console.log('API Key configured:', BREVO_API_KEY ? 'Yes' : 'No');
  console.log('List ID configured:', BREVO_LIST_ID);
  console.log('Server environment:', process.env.NODE_ENV);
  
  if (!BREVO_API_KEY) {
    console.error('Brevo API key is not configured');
    return { 
      success: false, 
      message: 'Newsletter service is not properly configured' 
    };
  }

  try {
    console.log('Making API request to Brevo...');
    
    // Validate email format before sending to API
    if (!email || !email.includes('@') || !email.includes('.')) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      };
    }
    
    const response = await axios.post(
      `${BREVO_API_URL}/contacts`,
      {
        email,
        attributes,
        listIds: [2],
        updateEnabled: true, // Update contact if it already exists
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY,
        },
      }
    );

    console.log('Brevo API response status:', response.status);
    console.log('Brevo API response data:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 201 || response.status === 204) {
      return { 
        success: true, 
        message: 'Thank you for subscribing to our newsletter!' 
      };
    }

    return { 
      success: true, 
      message: 'Your subscription has been updated.' 
    };
  } catch (error: unknown) {
    console.error('Error subscribing to newsletter:');
    
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.message);
      console.error('Response data:', JSON.stringify(error.response?.data, null, 2));
      console.error('Response status:', error.response?.status);
      
      // Handle specific error cases
      if (error.response?.status === 400 && 
          error.response?.data?.code === 'duplicate_parameter') {
        return { 
          success: true, 
          message: 'You are already subscribed to our newsletter.' 
        };
      }
      
      // Handle rate limiting
      if (error.response?.status === 429) {
        return {
          success: false,
          message: 'Too many subscription attempts. Please try again later.'
        };
      }
      
      // Handle authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.error('Authentication error with Brevo API');
        return {
          success: false,
          message: 'Newsletter service authentication error. Please contact support.'
        };
      }
      
      // Return more specific error message if available
      if (error.response?.data?.message) {
        return {
          success: false,
          message: `Subscription error: ${error.response.data.message}`
        };
      }
    } else {
      console.error('Unknown error:', error);
    }

    return { 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    };
  }
}
