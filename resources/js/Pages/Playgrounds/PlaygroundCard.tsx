import * as React from 'react';
import { Playground } from '@/types';
import { Link } from '@inertiajs/react';

interface PlaygroundCardProps {
  playground: Playground;
  onDeletePlayground: (playgroundID: number, e: React.MouseEvent) => void;
}

const TeamCard = ({ playground,onDeletePlayground }: PlaygroundCardProps) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="font-medium text-lg text-gray-800">
          {playground.name}
        </div>
      </div>
      <div className="font-medium text-lg text-gray-800">
        {playground.playground_type}
      </div>
      <div className="text-gray-600 mb-2">{playground.city}</div>
      <div>
        <Link
          className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
          href={`/playgrounds/${playground.id}/edit`}
        >
          Modifier
        </Link>
      </div>
      <div>
        <button
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
          onClick={e => onDeletePlayground(playground.id, e)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

interface PlaygroundCardListProps {
  playgrounds: Playground[];
  onDeletePlayground: (playgroundID: number, e: React.MouseEvent) => void;
}

const PlaygroundCardList = ({
  playgrounds,
  onDeletePlayground,
}: PlaygroundCardListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {playgrounds.length === 0 ? (
        <div className='bg-white rounded-lg flex justify-center p-10'>PAS DE TERRAINS CRÉÉS</div>
      ) : (
        playgrounds.map(playground => {
          return (
            <TeamCard
              key={playground.id}
              playground={playground}
              onDeletePlayground={onDeletePlayground}
            />
          );
        })
      )}
    </div>
  );
};

export default PlaygroundCardList;
