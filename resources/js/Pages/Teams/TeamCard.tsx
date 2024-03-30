import * as React from 'react';
import { Team } from '@/types';
import { Link } from '@inertiajs/react';

interface TeamcardProps {
  team: Team;
  onContactOwner: (ownerId: number) => void;
}

const TeamCard = ({ team, onContactOwner }: TeamcardProps) => {
  const handleContactOwnerClick = () => {
    console.log('Contact owner clicked:', team.owner.id); // Vérifiez si la fonction est appelée avec le bon ID du propriétaire
    onContactOwner(team.owner.id);
  };
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="font-medium text-lg text-gray-800">{team.name}</div>
      </div>
      <div className="text-gray-600 mb-2">{team.users.length + 1} membres</div>
      <div>
        <Link
          href={`/team/${team.id}`}
          className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
        >
          Voir
        </Link>
      </div>
      <div>
        {' '}
        <button
          className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
          onClick={handleContactOwnerClick}
        >
          Contacter
        </button>
      </div>
    </div>
  );
}

interface TeamcardListProps {
  teams: Team[];
  onContactOwner: (ownerId: number) => void;
}

const TeamCardList = ({ teams, onContactOwner }:TeamcardListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.length === 0 ? (
        <div>PAS DEQUIPES</div>
      ) : (
        teams.map(team => {
          return (
            <TeamCard
              key={team.id}
              team={team}
              onContactOwner={onContactOwner}
            />
          );
        })
      )}
    </div>
  );
};


export default TeamCardList;
