import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Team, User } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui';
import useRoute from '@/Hooks/useRoute';
import SendMessageModal from '@/Components/SendMessage';
import TeamCardList from './TeamCard';

interface TeamsIndexProps {
  teams: Team[];
}

export default function IndexTeams({ teams }: TeamsIndexProps) {
  console.log(teams, 'ok');
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

  const handleContactOwner = (ownerId: number) => {
    setIsModalOpen(true);
    setRecieverId(ownerId);
  };
  return (
    <AppLayout title={t('pages.team.teams')}>
      <div className="max-w-xl  sm:max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <h2 className="text-sky-500 text-2xl ml-2 mb-5">Equipes</h2>

        <div className="block sm:hidden">
          <TeamCardList teams={teams} onContactOwner={handleContactOwner} />
        </div>
        <div className="sm:block hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom d'equipe</TableHead>
                <TableHead>Membres</TableHead>
                <TableHead>Voir Equipe</TableHead>
                <TableHead>Contacter propriétaire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map(team => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.users.length + 1}</TableCell>
                  <TableCell>
                    <Link
                      className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                      href={`/team/${team.id}`}
                    >
                      Voir
                    </Link>
                  </TableCell>
                  <TableCell>
                    <button
                      className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                      onClick={() => {
                        setIsModalOpen(true);
                        setRecieverId(team.owner.id);
                      }}
                    >
                      Contacter
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
