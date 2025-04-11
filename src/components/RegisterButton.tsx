'use client';

interface RegisterButtonProps {
  label: string;
  disabled?: boolean; // Optional boolean property to disable the button
}

export default function RegisterButton({ label, disabled }: RegisterButtonProps) {
  const scrollToBooking = () => {
    // Find the booking section element
    const bookingSection = document.getElementById('booking');
    
    // If the element exists, scroll to it smoothly
    if (bookingSection) {
      bookingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <button 
      className={`btn-primary w-full justify-center ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) {
          scrollToBooking();
        }
      }}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
