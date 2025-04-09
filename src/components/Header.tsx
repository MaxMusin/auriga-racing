import { cn } from '@/utils';

const Header = ({
  title,
  subtitle,
  centered,
}: {
  title: string;
  subtitle: string;
  centered?: boolean;
}) => {
  return (
    <div className={cn('mb-16', { 'text-center': centered })}>
      {subtitle !== '' && (
        <h3 className="text-racing-red uppercase tracking-wider font-semibold mb-2 text-xl md:text-2xl">
          {subtitle}
        </h3>
      )}
      <h2
        className={cn('text-4xl md:text-5xl font-bold mb-4 md:mb-6 uppercase', {
          'racing-stripe': !centered,
        })}
      >
        {title}
      </h2>
    </div>
  );
};

export default Header;
