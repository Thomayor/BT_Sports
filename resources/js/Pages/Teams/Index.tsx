import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Team, User } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui';
import useRoute from '@/Hooks/useRoute';
import SendMessageModal from '@/Components/SendMessage';

interface TeamsIndexProps {
  teams: Team[];
}

export default function Index({ teams }: TeamsIndexProps) {
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
  return (
    <AppLayout
      title={t('pages.team.teams')}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {t('pages.team.teams')}
        </h2>
      )}
    >
      <div className="mt-10">
        <Table className='bg-white rounded-xl m-2'>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d'equipe</TableHead>
              <TableHead >Membres</TableHead>
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
                    className="bg-blue-500 text-white py-2 px-8 rounded"
                    href={`/teams/${team.id}/members`}
                  >
                    Voir
                  </Link>
                </TableCell>
                <TableCell>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded"
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
