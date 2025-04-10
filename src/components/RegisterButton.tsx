'use client';

interface RegisterButtonProps {
  label: string;
}

export default function RegisterButton({ label }: RegisterButtonProps) {
  return (
    <button 
      className="btn-primary w-full justify-center"
      onClick={(e) => {
        e.preventDefault();
        // In the future, this could open a registration modal or navigate to a form
        console.log('Registration button clicked');
      }}
    >
      {label}
    </button>
  );
}
