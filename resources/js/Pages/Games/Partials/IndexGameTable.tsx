import { ShowGamesProps } from '@/types';
import React from 'react';
import formatTime from '@/Services/formatTime';
import formatDate from '@/Services/formatDate';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui';
import GameCardList from './Gamecard';
import { Card } from '@/Components/ui/card';

export default function IndexGameTable({
  games,
  sports,
  playgrounds,
  teams,
}: ShowGamesProps) {
  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <h2 className="text-sky-500 text-2xl ml-2 mb-5">Matchs</h2>
      <Link href="games/create/">
        <PrimaryButton className="opacity-80 mb-2 bg-sky-500 ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="top-0 right-0 w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
              clipRule="evenodd"
            />
          </svg>
        </PrimaryButton>
      </Link>
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sport</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>From / To</TableHead>
              <TableHead>Playground</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Max Player</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {games.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>PAS DE MATCHS CRÉÉS</TableCell>
              </TableRow>
            ) : (
              games.map(game => {
                const sport = sports.find(sport => sport.id === game.sport_id);
                const playground = playgrounds.find(
                  playground => playground.equipment_id === game.equipment_id,
                );

                return (
                  <TableRow key={game.id}>
                    <TableHead>{sport?.name}</TableHead>
                    <TableCell>{formatDate(game.date)}</TableCell>
                    <TableCell>
                      {formatTime(game.start_time)} /{' '}
                      {formatTime(game.end_time)}
                    </TableCell>
                    <TableCell>{playground?.name}</TableCell>
                    <TableCell>
                      {playground?.adress}, {playground?.postcode}{' '}
                      {playground?.city}
                    </TableCell>
                    <TableCell>{game.max_player} players</TableCell>
                    <TableCell>
                      <Link
                        href={`games/${game.id}`}
                        className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                      >
                        Show Details
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="block sm:hidden">
        {games.map(game => {
          const sport = sports.find(sport => sport.id === game.sport_id);
          const playground = playgrounds.find(
            playground => playground.equipment_id === game.equipment_id,
          );

          return (
            <Card key={game.id} className="my-4">
              <div className="p-4">
                <div className='flex justify-between'>
                  <span className='font-bold'>{sport?.name} </span>
              <span>{formatDate(game.date)} </span>  </div>
                <div className='mt-1 flex justify-center font-bold'>
                  {playground?.name}
                </div>
                <div className='mt-1 flex justify-center'>
             
                  {playground?.adress}, {playground?.postcode}{' '}
                  {playground?.city}
                </div>
                <div className='mt-1 flex justify-center'>
               <span className='font-bold mr-1'>From / To:</span> 
                  {formatTime(game.start_time)} / {formatTime(game.end_time)}
                </div>
                <div className='mt-1 flex justify-center'>
                  {game.max_player} players
                </div>
                <div>
                  <Link
                    href={`games/${game.id}`}
                    className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
