import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui';
import AppLayout from '@/Layouts/AppLayout';
import { Playground } from '@/types';
import React from 'react';
import { Link, useForm as inertiaForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';

interface IndexProps {
  playgrounds: Playground[];
  playground?: Playground;
}

export default function IndexPlaygrounds({
  playgrounds,
  playground,
}: IndexProps) {
  const route = useRoute();

  const { delete: destroy, reset } = inertiaForm({
    playground,
  });

  const deletePlayground = (playgroundID: number, e: React.MouseEvent) => {
    e.preventDefault();
    destroy(route('playgrounds.destroy', { id: playgroundID }), {
      preserveScroll: true,
      onFinish: () => reset(),
    });
  };
  return (
    <AppLayout
      title="Terrains"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Terrains
        </h2>
      )}
    >
      <div>
        <h1>Liste des terrains</h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du terrain</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Activite</TableHead>
              <TableHead>Modification</TableHead>
              <TableHead>Suppression</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playgrounds.map(playground => (
              <TableRow key={playground.id}>
                <TableCell>
                  <Link href={`/playgrounds/${playground.id}`}>
                    {playground.name}
                  </Link>
                </TableCell>
                <TableCell>{playground.city}</TableCell>
                <TableCell>{playground.playground_type}</TableCell>
                <TableCell>
                  {' '}
                  <Link href={`/playgrounds/${playground.id}/edit`}>
                    {' '}
                    Modifier{' '}
                  </Link>
                </TableCell>
                <TableCell>
                  {' '}
                  <button onClick={e => deletePlayground(playground.id, e)}>
                    Supprimer
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
