import React, { useState } from 'react';
import { Team, User } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import SendMessageModal from '@/Components/SendMessage';
import { router } from '@inertiajs/react';

interface ShowTeamProps {
  team: Team;
}

export default function ShowInfoTeam({ team }: ShowTeamProps) {
  const route = useRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiverId, setRecieverId] = useState<number | null>(null);
  const handleSendMessageSubmit = ({ content }: { content: string }) => {
    router.post(route('conversations.store', { id: receiverId }), {
      content,
    });
    setIsModalOpen(false);
    setRecieverId(null);
  };
  return (
    <AppLayout title={t('pages.team.members')}>
      <div className="m-5">
        <div>
          <h2 className="text-sky-500 text-2xl ml-2 mb-5">Fiche de l'équipe</h2>

          <div className="my-2 bg-white rounded-lg p-4">
            <p className="my-2">Nom d'équipe : {team.name} </p>
            <p className="my-2">
              {' '}
              Création :{' '}
              {new Date(team.created_at).toLocaleTimeString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
            <p className="my-2">Matchs joués :</p>
            <p className="my-2">Sport Favori :</p>
          </div>
        </div>

        <h2 className="text-sky-500 text-2xl ml-2 my-5">
          {t('pages.team.members')}
        </h2>
        <div className="flex space-x-2 mt-2 p-4 bg-white rounded-lg">
          <div className="group cursor-pointer relative inline-block">
            <img
              src={team.owner.profile_photo_url}
              className="rounded-full w-16 h-16 transition-transform transform group-hover:scale-105 hover:opacity-50"
              alt={`Profil ${team.owner.firstname} ${team.owner.lastname}`}
            />
            <div className="absolute flex flex-col justify-center items-center mt-1 p-4 bg-white rounded-lg text-black opacity-0 group-hover:opacity-100 transition-opacity">
              <img
                src={team.owner.profile_photo_url}
                className="rounded-full w-16 h-16"
                alt={`Profil ${team.owner.firstname} ${team.owner.lastname}`}
              />
              <p className="mt-1 flex items-center space-x-2 text-lg font-semibold">
                <span>{team.owner.firstname}</span>{' '}
                <span>{team.owner.lastname}</span>
              </p>
              <button
                className="bg-sky-500 text-white py-2 px-4 rounded mt-2"
                onClick={() => {
                  setIsModalOpen(true);
                  setRecieverId(team.owner.id);
                }}
              >
                Contacter
              </button>
            </div>
          </div>

          {team.users.map(member => (
            <div
              key={member.id}
              className="group cursor-pointer relative inline-block mr-4"
            >
              <img
                src={member.profile_photo_url}
                className="rounded-full w-16 h-16 transition-transform transform group-hover:scale-105 hover:opacity-50"
                alt={`Profil ${member.firstname} ${member.lastname}`}
              />
              <div className="absolute flex flex-col justify-center items-center mt-1 p-4 bg-white rounded-lg text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <img
                  src={member.profile_photo_url}
                  className="rounded-full w-16 h-16"
                  alt={`Profil ${member.firstname} ${member.lastname}`}
                />
                <p className="mt-1 flex items-center space-x-2 text-lg font-semibold">
                  <span>{member.firstname}</span> <span>{member.lastname}</span>
                </p>
                <button
                  className="bg-sky-500 text-white py-2 px-4 rounded mt-2"
                  onClick={() => {
                    setIsModalOpen(true);
                    setRecieverId(member.id);
                  }}
                >
                  Contacter
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-4 mt-2">
          {isModalOpen && (
            <SendMessageModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={({ content }) => handleSendMessageSubmit({ content })}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
