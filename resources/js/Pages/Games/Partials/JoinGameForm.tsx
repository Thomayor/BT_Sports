import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import useRoute from '@/Hooks/useRoute';
import { JoinGameProps, Team } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';

export default function JoinGameForm({ game, teams }: JoinGameProps) {
  const route = useRoute();
  const form = useForm({
    game_id: game.id,
    team_id: '',
  });

  function joinGame() {
    form.post(route('games.teams.store', game.id), {
      errorBag: 'joinGame',
      preserveScroll: true,
    });
  }

  return (
    <div>
      <FormSection
        onSubmit={joinGame}
        title={'Game Details'}
        description={'Create a new game and challenge opponents'}
        renderActions={() => (
          <>
            <ActionMessage on={form.recentlySuccessful} className="mr-3">
              Game joined.
            </ActionMessage>

            <PrimaryButton
              className={classNames({ 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Join the Game
            </PrimaryButton>
          </>
        )}
      >
        <div className="col-span-6 sm:col-span-4">
          <InputLabel htmlFor="team" value="Team" />
          <select
            id="teams"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            value={form.data.team_id}
            onChange={e => form.setData('team_id', e.target.value)}
          >
            <option value="">Choisir une équipe</option>
            {teams.map((team: Team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </FormSection>
    </div>
  );
}
