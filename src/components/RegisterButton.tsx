'use client';

interface RegisterButtonProps {
  label: string;
  disabled?: boolean; // Optional boolean property to disable the button
}

export default function RegisterButton({ label, disabled }: RegisterButtonProps) {
  return (
    <button 
      className={`btn-primary w-full justify-center ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        // In the future, this could open a registration modal or navigate to a form
        if (!disabled) {
          console.log('Registration button clicked');
        }
      }}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
