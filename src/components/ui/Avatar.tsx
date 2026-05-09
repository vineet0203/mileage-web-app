import React from 'react';
import { cn } from '../../lib/utils';
import { baseURL } from '../../lib/axios';

interface AvatarProps {
  src?: string | null;
  name: string;
  className?: string;
  fallbackType?: 'letter' | 'dicebear';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  className,
  fallbackType = 'letter',
}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div
      className={cn(
        "w-8 h-8 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden font-bold text-[10px] text-slate-400",
        className
      )}
    >
      {src ? (
        <img
          src={`${baseURL}${src}`}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : fallbackType === 'dicebear' ? (
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`}
          alt={`${name}'s avatar`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        firstLetter
      )}
    </div>
  );
};

export default Avatar;
