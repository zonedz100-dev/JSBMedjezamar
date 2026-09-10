import React from 'react';
import { CLUBS_DATA } from '../data/clubsData';

interface ClubBadgeProps {
  clubId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ClubBadge: React.FC<ClubBadgeProps> = ({ clubId, size = 'md', className = '' }) => {
  const [imageError, setImageError] = React.useState(false);
  const club = CLUBS_DATA.find((c) => c.id === clubId) || CLUBS_DATA[0];

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  }[size];

  // If real club logo image is available and hasn't errored
  if (club?.logoUrl && !imageError) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
        title={`${club.nameAr} (${club.acronym})`}
      >
        <img
          src={club.logoUrl}
          alt={club.nameAr}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Official club logo for JSBMA (الجيل الصاعد لبلدية مجاز عمار) fallback
  if (clubId === 'jsbma') {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
        title={club.nameAr}
      >
        <img
          src="/logos/clubs/jsbma.png"
          alt={club.nameAr}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Official club logo for IRBEH (اتحاد بلدية الحجار) fallback
  if (clubId === 'irbeh') {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}
        title={club.nameAr}
      >
        <img
          src="/logos/clubs/irbeh.png"
          alt={club.nameAr}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Generic customized crests for remaining 14 clubs with their authentic colors & acronyms
  const isCircle = club.badgeStyle === 'circle';

  return (
    <div className={`relative inline-block select-none ${sizeClasses} ${className}`} title={club.nameAr}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm">
        {isCircle ? (
          <>
            <circle cx="80" cy="80" r="74" fill={club.primaryColor} stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="80" cy="80" r="66" fill={club.secondaryColor} opacity="0.15" />
            <circle cx="80" cy="80" r="56" fill={club.primaryColor} stroke="#FFFFFF" strokeWidth="2" />
          </>
        ) : (
          <>
            <path
              d="M 25 20 L 135 20 C 135 70 135 110 80 150 C 25 110 25 70 25 20 Z"
              fill={club.primaryColor}
              stroke="#FFFFFF"
              strokeWidth="4"
            />
            <path
              d="M 33 28 L 127 28 C 127 66 127 104 80 140 C 33 104 33 66 33 28 Z"
              fill={club.secondaryColor}
              opacity="0.2"
            />
          </>
        )}

        {/* Founding Year */}
        <rect x="56" y="32" width="48" height="16" rx="3" fill="#FFFFFF" opacity="0.9" />
        <text x="80" y="44" textAnchor="middle" fill={club.primaryColor} fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          {club.foundedYear}
        </text>

        {/* Club Acronym */}
        <text
          x="80"
          y="84"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={club.acronym.length > 5 ? '16' : '20'}
          fontWeight="900"
          fontFamily="sans-serif"
          stroke="#000000"
          strokeWidth="0.5"
        >
          {club.acronym}
        </text>

        {/* Short City / Wilaya */}
        <text x="80" y="115" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
          {club.city}
        </text>
      </svg>
    </div>
  );
};

export const LRFALogo: React.FC<{ size?: string; className?: string }> = ({ size = 'w-12 h-12', className = '' }) => {
  return (
    <div className={`relative inline-block ${size} ${className}`} title="رابطة عنابة لكرة القدم">
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
        {/* Outer White Badge */}
        <circle cx="80" cy="80" r="76" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        
        {/* Colorful Rainbow Arcs (like official LRFA logo) */}
        <path d="M 25 80 A 55 55 0 0 1 135 80" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
        <path d="M 32 80 A 48 48 0 0 1 128 80" fill="none" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
        <path d="M 39 80 A 41 41 0 0 1 121 80" fill="none" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
        <path d="M 46 80 A 34 34 0 0 1 114 80" fill="none" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />

        {/* Center Soccer Ball with Algerian Flag Crescent */}
        <circle cx="80" cy="52" r="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
        {/* Pentagon pattern on ball */}
        <polygon points="80,44 86,49 84,56 76,56 74,49" fill="#1E293B" />
        <circle cx="80" cy="52" r="3" fill="#DC2626" />

        {/* Banner Texts */}
        <rect x="25" y="85" width="110" height="24" rx="4" fill="#0F172A" />
        <text x="80" y="101" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
          LRFA
        </text>

        <text x="80" y="122" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="bold">
          ANNABA
        </text>
        <text x="80" y="142" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="900">
          عنابة
        </text>
      </svg>
    </div>
  );
};
