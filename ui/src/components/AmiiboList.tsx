import { useEffect, useState } from 'react';
import AmiiboCard from './AmiiboCard';
import { amiiboApi } from '../services/api';
import type { Amiibo } from '../types/amiibo';

export default function AmiiboList() {
  const [amiibos, setAmiibos] = useState<Amiibo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmiibos = async () => {
      try {
        setLoading(true);
        const data = await amiiboApi.getAll();
        setAmiibos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch amiibos');
      } finally {
        setLoading(false);
      }
    };

    fetchAmiibos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-void flex items-center justify-center bg-hexagon-pattern">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-glow-pulse">🎮</div>
          <div className="text-3xl font-display uppercase text-smash-flame text-shadow-fire animate-pulse">
            Loading
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <div className="w-3 h-3 bg-smash-flame clip-angle-sm animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-smash-ember clip-angle-sm animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-smash-gold clip-angle-sm animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-void flex items-center justify-center bg-hexagon-pattern">
        <div className="relative max-w-md">
          <div className="absolute inset-0 bg-smash-red blur-xl opacity-30" />
          <div className="relative bg-gradient-to-br from-bg-card to-bg-secondary clip-angle border-4 border-smash-red/60 p-8 text-center shadow-smash-lg">
            <div className="text-6xl mb-4 animate-flicker">⚠️</div>
            <h2 className="text-3xl font-display uppercase text-smash-flame text-shadow-fire mb-4">Error</h2>
            <p className="text-red-300 font-body">{error}</p>
            <div className="absolute top-0 left-0 right-0 h-1 bg-smash-red" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-void bg-hexagon-pattern">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-bg-secondary via-bg-tertiary to-bg-secondary border-b-4 border-smash-flame sticky top-0 z-50 shadow-smash-lg">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-fire" />

        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="text-5xl animate-glow-pulse">🎯</div>
              <div className="absolute inset-0 bg-smash-flame blur-xl opacity-40 animate-glow-pulse" />
            </div>
            <div>
              <h1 className="text-5xl font-display uppercase text-white text-shadow-fire tracking-tight">
                AmiiBox
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1 w-12 bg-gradient-fire" />
                <p className="text-smash-steel font-body text-sm uppercase tracking-widest">
                  {amiibos.length} Fighter{amiibos.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom angular accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-smash-gold to-transparent" />
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        {amiibos.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="text-9xl mb-8">📦</div>
              <div className="absolute inset-0 bg-smash-flame blur-2xl opacity-20" />
            </div>
            <h2 className="text-4xl font-display uppercase text-white text-shadow-smash mb-4">
              No Fighters
            </h2>
            <p className="text-smash-steel font-body text-lg">
              Your roster is empty
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {amiibos.map((amiibo) => (
              <AmiiboCard key={amiibo.id} amiibo={amiibo} />
            ))}
          </div>
        )}
      </main>

      {/* Decorative corner accents */}
      <div className="fixed top-24 left-4 w-16 h-16 border-l-4 border-t-4 border-smash-flame/20 pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-smash-gold/20 pointer-events-none" />
    </div>
  );
}
