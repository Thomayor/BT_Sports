import React, { useState } from 'react';
import { Team, User } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import SendMessageModal from '@/Components/SendMessage';
import { router } from '@inertiajs/react';

interface TeamMembersProps {
  team: Team;
  members: User[];
  owner: User;
}

export default function Members({ team, members, owner }: TeamMembersProps) {
  const route = useRoute();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiverId, setRecieverId] = useState<number | null>(null);
  const handleSendMessageSubmit = ({
    content,
  }: {
    content: string;
  }) => {
    router.post(
      route('conversations.store', { id: receiverId }),
      {
        content,
      },
    );
    setIsModalOpen(false);
    setRecieverId(null);
  };
  return (
    <AppLayout
      title={t('pages.team.members')}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {t('pages.team.members')}
        </h2>
      )}
    >
      <div>
        <h3>
          {t('pages.team.members')} {team.name}
        </h3>

        <div className="mt-2 group cursor-pointer relative inline-block mr-4">
          <img
            src={owner.profile_photo_url}
            className="rounded-full w-16 h-16 transition-transform transform group-hover:scale-105 hover:opacity-50"
            alt={`Profil ${owner.firstname} ${owner.lastname}`}
          />
          <div className="absolute flex flex-col justify-center items-center mt-1 p-4 bg-white rounded-lg text-black opacity-0 group-hover:opacity-100 transition-opacity">
            <img
              src={owner.profile_photo_url}
              className="rounded-full w-16 h-16"
              alt={`Profil ${owner.firstname} ${owner.lastname}`}
            />
            <p className="mt-1 flex items-center space-x-2 text-lg font-semibold">
              <span>{owner.firstname}</span> <span>{owner.lastname}</span>
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
              onClick={() => {
                setIsModalOpen(true);
                setRecieverId(owner.id);
              }}
            >
              Contacter
            </button>
          </div>
        </div>

        {members.map(member => (
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
                className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
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

        <div className="ml-4 mt-2">
          {isModalOpen && (
            <SendMessageModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={({ content }) =>
                handleSendMessageSubmit({ content })
              }
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
