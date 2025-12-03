import { Link } from 'react-router-dom';
import type { Amiibo } from '../types/amiibo';

interface AmiiboCardProps {
  amiibo: Amiibo;
}

export default function AmiiboCard({ amiibo }: AmiiboCardProps) {
  return (
    <Link
      to={`/amiibo/${amiibo.id}`}
      className="group relative block animate-slide-up"
    >
      <div className="relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:translate-y-[-8px]">
        {/* Angular frame with fire gradient border */}
        <div className="absolute inset-0 bg-gradient-fire opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

        <div className="relative bg-gradient-to-br from-bg-card via-bg-tertiary to-bg-secondary clip-angle-sm border-2 border-smash-steel/40 group-hover:border-smash-flame transition-all duration-300 shadow-smash group-hover:shadow-smash-lg">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-fire" />

          {/* Character portrait section */}
          <div className="relative bg-gradient-to-b from-smash-void/80 to-bg-secondary/60 p-6 aspect-square flex items-center justify-center overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-hexagon-pattern opacity-20" />

            {/* Dramatic lighting overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

            {amiibo.image ? (
              <img
                src={amiibo.image}
                alt={amiibo.name}
                className="relative z-10 w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_20px_rgba(255,70,85,0.4)]"
              />
            ) : (
              <div className="relative z-10 w-32 h-32 bg-gradient-steel flex items-center justify-center text-6xl clip-angle">
                🎮
              </div>
            )}

            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-smash-flame opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-smash-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Info section */}
          <div className="relative p-4 bg-gradient-to-r from-bg-secondary to-bg-primary border-t-2 border-smash-gunmetal/30">
            {/* Name with Smash style text */}
            <h3 className="text-xl font-display uppercase text-white mb-2 truncate group-hover:text-smash-flame transition-colors text-shadow-smash">
              {amiibo.name}
            </h3>

            {/* Series badge with angular design */}
            {amiibo.series && (
              <div className="inline-block">
                <div className="relative bg-gradient-steel px-3 py-1 clip-angle-sm">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    {amiibo.series.name}
                  </span>
                  <div className="absolute inset-0 bg-gradient-fire opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
              </div>
            )}
          </div>

          {/* Scan line effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-smash-flame/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-fire opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10" />
        </div>
      </div>
    </Link>
  );
}
