import React, { useState, useEffect } from 'react';

import useRoute from '@/Hooks/useRoute';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/FormSection';
import ActionMessage from '@/Components/ActionMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import classNames from 'classnames';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { CreateGameProps, Sport, Team } from '@/types';
import ListPlaygrounds from '@/Pages/Playgrounds/ListPlaygrounds';
import FormSectionArray from '@/Components/FormSectionArray';
import { t } from 'i18next';

export default function CreateGameForm({
  sports,
  teams,
}: CreateGameProps) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [equipmentId, setEquipmentId] = useState<string>('');

  const route = useRoute();

  const form = useForm({
    date: '',
    start_time: '',
    end_time: '',
    max_player: '',
    sport_id: '',
    equipment_id: '',
    team_id: '',
  });

  useEffect(() => {
    form.setData('equipment_id', equipmentId);
    
  }, [equipmentId]);

  function createGame() {
    form.post(route('games.store'), {
      errorBag: 'createGame',
      preserveScroll: true,
    });

 

    setIsCompleted(false);
    setErrorMessage('');
  }

  function showAddTeam() {
    if (
      form.data.date &&
      form.data.start_time &&
      form.data.end_time &&
      form.data.max_player &&
      form.data.sport_id
    ) {
      setIsCompleted(true);
    }
    setErrorMessage(t('pages.games.error'));
  }

  return (
    <div>
      {!isCompleted ? (
        <FormSection
          onSubmit={showAddTeam}
          title={t('pages.games.details')}
          description={t('pages.games.descriptioncreate')}
          renderActions={() => (
            <>
              <ActionMessage on={form.recentlySuccessful} className="mr-3">
              {t('pages.games.nextpage')}
              </ActionMessage>

              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                {t('pages.games.next')}
              </PrimaryButton>
            </>
          )}
        >
          <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="sport" value={t('pages.games.sport')} />
            <select
              id="sports"
              className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              value={form.data.sport_id}
              onChange={e => form.setData('sport_id', e.target.value)}
            >
              <option value="">{t('pages.games.chooseSport')}</option>
              {sports.map((sport: Sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>

            <InputLabel htmlFor="date" value={t('pages.games.date')} />
            <TextInput
              id="date"
              type="date"
              className="mt-1 block w-full mb-2"
              value={form.data.date}
              onChange={e => form.setData('date', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.date} className="mt-2" />

            <InputLabel htmlFor="start_time" value={t('pages.games.startTime')} />
            <TextInput
              id="start_time"
              type="time"
              className="mt-1 block w-full mb-2"
              value={form.data.start_time}
              onChange={e => form.setData('start_time', e.currentTarget.value)}
              autoFocus
            />

            <InputLabel htmlFor="end_time" value={t('pages.games.endTime')} />
            <TextInput
              id="end_time"
              type="time"
              className="mt-1 block w-full mb-2"
              value={form.data.end_time}
              onChange={e => form.setData('end_time', e.currentTarget.value)}
              autoFocus
            />

            <div className="mt-2">
              <InputLabel htmlFor="team" value={t('pages.games.team')} />
              <select
                id="teams"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                value={form.data.team_id}
                onChange={e => form.setData('team_id', e.target.value)}
              >
                <option value="">{t('pages.games.chooseTeam')}</option>
                {teams.map((team: Team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2">
              <InputLabel htmlFor="max_players" value={t('pages.games.max')} />
              <TextInput
                id="max_players"
                type="number"
                min={2}
                className="mt-1 block w-full mb-2"
                value={form.data.max_player}
                onChange={e =>
                  form.setData('max_player', e.currentTarget.value)
                }
                autoFocus
              />
            </div>

            {errorMessage && (
              <InputError message={errorMessage} className="mt-2" />
            )}
          </div>
        </FormSection>
      ) : (
        <FormSectionArray
          onSubmit={createGame}
          title={t('pages.games.details')}
          description={t('pages.games.descriptioncreate')}
          renderActions={() => (
            <>
              <ActionMessage on={form.recentlySuccessful} className="mr-3">
              {t('pages.games.created')}
              </ActionMessage>

              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                {t('pages.games.save')}
              </PrimaryButton>
            </>
          )}
        >
          <div className="col-span-12 sm:col-span-12">
            <InputLabel htmlFor="playground" value={t('pages.games.choosePlayground')} />
            <ListPlaygrounds setEquipmentId={setEquipmentId} />
          </div>
        </FormSectionArray>
      )}
    </div>
  );
}
