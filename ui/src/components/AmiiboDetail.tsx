import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { amiiboApi } from '../services/api';
import type { Amiibo } from '../types/amiibo';

export default function AmiiboDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [amiibo, setAmiibo] = useState<Amiibo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmiibo = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await amiiboApi.getById(parseInt(id));
        setAmiibo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch amiibo');
      } finally {
        setLoading(false);
      }
    };

    fetchAmiibo();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this Amiibo?')) return;

    try {
      await amiiboApi.delete(parseInt(id));
      navigate('/');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete amiibo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-void flex items-center justify-center bg-hexagon-pattern">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-glow-pulse">🎮</div>
          <div className="text-3xl font-display uppercase text-smash-flame text-shadow-fire animate-pulse">
            Loading
          </div>
        </div>
      </div>
    );
  }

  if (error || !amiibo) {
    return (
      <div className="min-h-screen bg-gradient-void flex items-center justify-center bg-hexagon-pattern">
        <div className="relative max-w-md">
          <div className="absolute inset-0 bg-smash-red blur-xl opacity-30" />
          <div className="relative bg-gradient-to-br from-bg-card to-bg-secondary clip-angle border-4 border-smash-red/60 p-8 text-center shadow-smash-lg">
            <div className="text-6xl mb-4 animate-flicker">⚠️</div>
            <h2 className="text-3xl font-display uppercase text-smash-flame text-shadow-fire mb-4">Error</h2>
            <p className="text-red-300 font-body mb-6">{error || 'Fighter not found'}</p>
            <Link
              to="/"
              className="inline-block bg-gradient-steel px-6 py-3 clip-angle-sm font-display uppercase text-white hover:bg-gradient-fire transition-all duration-300 transform hover:scale-105"
            >
              Back to Roster
            </Link>
            <div className="absolute top-0 left-0 right-0 h-1 bg-smash-red" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-void bg-hexagon-pattern">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary border-b-4 border-smash-flame shadow-smash-lg">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-fire" />
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-white hover:text-smash-flame transition-colors group"
          >
            <span className="text-2xl group-hover:-translate-x-2 transition-transform font-display">←</span>
            <span className="font-display uppercase tracking-wider">Back to Roster</span>
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-smash-gold to-transparent" />
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Character showcase card */}
          <div className="relative animate-slide-up">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-fire opacity-20 blur-2xl" />

            <div className="relative bg-gradient-to-br from-bg-card via-bg-tertiary to-bg-secondary clip-angle border-4 border-smash-steel/40 shadow-smash-lg overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-fire" />

              <div className="lg:flex">
                {/* Character portrait section */}
                <div className="lg:w-1/2 relative bg-gradient-to-br from-smash-void/90 to-bg-secondary/80 p-12 lg:p-16 flex items-center justify-center overflow-hidden min-h-[500px]">
                  {/* Dynamic background */}
                  <div className="absolute inset-0 bg-hexagon-pattern opacity-10" />
                  <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

                  {/* Corner frame accents */}
                  <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-smash-flame" />
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-smash-gold" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-smash-gold" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-smash-flame" />

                  {amiibo.image ? (
                    <div className="relative z-10">
                      <img
                        src={amiibo.image}
                        alt={amiibo.name}
                        className="w-full max-w-md object-contain drop-shadow-[0_0_40px_rgba(255,70,85,0.6)]"
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 w-64 h-64 bg-gradient-steel clip-angle flex items-center justify-center text-9xl shadow-smash">
                      🎮
                    </div>
                  )}

                  {/* Light rays effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,70,85,0.1)_0%,transparent_70%)]" />
                </div>

                {/* Info section */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                  <div>
                    {/* Fighter name */}
                    <div className="mb-8">
                      <h1 className="text-5xl lg:text-6xl font-display uppercase text-white text-shadow-fire mb-4 leading-tight">
                        {amiibo.name}
                      </h1>
                      <div className="h-1 w-24 bg-gradient-fire mb-6" />

                      {amiibo.series && (
                        <div className="inline-block bg-gradient-steel px-4 py-2 clip-angle-sm">
                          <span className="text-white font-display uppercase tracking-widest text-sm">
                            {amiibo.series.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="space-y-4 mb-8">
                      <div className="relative bg-bg-secondary/80 clip-angle-sm p-4 border-l-4 border-smash-flame">
                        <div className="text-smash-steel text-xs uppercase tracking-wider mb-1 font-display">Fighter ID</div>
                        <div className="text-white font-mono text-2xl">#{amiibo.id.toString().padStart(4, '0')}</div>
                      </div>

                      <div className="relative bg-bg-secondary/80 clip-angle-sm p-4 border-l-4 border-smash-gold">
                        <div className="text-smash-steel text-xs uppercase tracking-wider mb-1 font-display">Series ID</div>
                        <div className="text-white font-mono text-2xl">#{amiibo.series_id}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleDelete}
                      className="flex-1 relative bg-gradient-to-r from-smash-crimson to-smash-red text-white font-display uppercase py-4 px-6 clip-angle-sm border-2 border-smash-red hover:border-smash-flame transition-all transform hover:scale-105 active:scale-95 shadow-smash hover:shadow-smash-lg"
                    >
                      <span className="relative z-10">Delete</span>
                      <div className="absolute inset-0 bg-smash-flame opacity-0 hover:opacity-20 transition-opacity" />
                    </button>
                    <Link
                      to="/"
                      className="flex-1 relative bg-gradient-steel text-white font-display uppercase py-4 px-6 clip-angle-sm border-2 border-smash-steel hover:border-smash-gold transition-all transform hover:scale-105 active:scale-95 shadow-smash hover:shadow-smash-lg text-center"
                    >
                      <span className="relative z-10">View All</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-smash-flame via-smash-gold to-smash-flame" />
            </div>
          </div>

          {/* Info banner */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-smash-flame/10 blur-xl" />
            <div className="relative bg-gradient-to-r from-bg-secondary to-bg-tertiary clip-angle-sm border-2 border-smash-steel/30 p-6 text-center">
              <p className="text-smash-steel font-body italic text-sm lg:text-base">
                Amiibo figures unlock special content and features in compatible Nintendo games
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative corner accents */}
      <div className="fixed top-24 left-4 w-16 h-16 border-l-4 border-t-4 border-smash-flame/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-smash-gold/20 pointer-events-none" />
    </div>
  );
}
