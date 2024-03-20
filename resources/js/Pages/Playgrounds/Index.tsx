import AppLayout from '@/Layouts/AppLayout';
import { Playground } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';
import route from 'ziggy-js';

interface IndexProps {
  playgrounds: Playground[];
}

export default function Index({ playgrounds }: IndexProps) {
  return (
    <AppLayout
      title="Terrains"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Terrains
        </h2>
      )}
    >
      <div className='flex flex-col'>
        <Link href={route('playgrounds.create')}>
          <button>Créer Terrain Manuellement</button>
        </Link>
        <Link href={route('playgrounds.listApi')}>
          <button>Créer Terrain avec API</button>
        </Link>
      </div>
      <div>
        <h1>Liste des terrains</h1>
        <ul>
          {playgrounds.map(playground => (
            <li key={playground.id}>
              <Link href={`/playgrounds/${playground.id}`}>
                {playground.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
