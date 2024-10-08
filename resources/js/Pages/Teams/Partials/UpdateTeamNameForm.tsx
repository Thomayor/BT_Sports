import useRoute from '@/Hooks/useRoute';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { JetstreamTeamPermissions, Team, User } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import { t } from 'i18next';

interface Props {
  team: Team & { owner: User };
  permissions: JetstreamTeamPermissions;
}

export default function UpdateTeamNameForm({ team, permissions }: Props) {
  const route = useRoute();
  const form = useForm({
    name: team.name,
  });

  function updateTeamName() {
    form.put(route('teams.update', [team]), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={updateTeamName}
      title={ t('pages.team.name') }
      description={ t('pages.team.nameDesc')}
      renderActions={
        permissions.canUpdateTeam
          ? () => (
              <>
                <ActionMessage on={form.recentlySuccessful} className="mr-3">
               { t('pages.team.alert')}
                </ActionMessage>

                <PrimaryButton
                  className={classNames({ 'opacity-25': form.processing })}
                  disabled={form.processing}
                >
                  { t('pages.team.save')}
                </PrimaryButton>
              </>
            )
          : undefined
      }
    >
      {/* <!-- Team Owner Information --> */}
      <div className="col-span-6">
        <InputLabel value={t('pages.team.teamOwner')} />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.firstname}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {team.owner.firstname}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {team.owner.email}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Team Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value={t('pages.team.name')} />

        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          disabled={!permissions.canUpdateTeam}
        />

        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
