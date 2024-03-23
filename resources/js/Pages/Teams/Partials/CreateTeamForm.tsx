import { useForm } from '@inertiajs/react';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import classNames from 'classnames';
import { t } from 'i18next';

export default function CreateTeamForm() {
  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: '',
  });

  function createTeam() {
    form.post(route('teams.store'), {
      errorBag: 'createTeam',
      preserveScroll: true,
    });
  }

  return (
    <FormSection
      onSubmit={createTeam}
      title={t('pages.team.title')}
      description={t('pages.team.createDesc')}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
          {t('pages.team.alert')}
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('pages.team.save')}
          </PrimaryButton>
        </>
      )}
    >
      <div className="col-span-6">
        <InputLabel value={t('pages.team.teamOwner')} />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={page.props.auth.user?.profile_photo_url}
            alt={page.props.auth.user?.firstname}
          />

          <div className="ml-4 leading-tight">
            <div className="text-gray-900 dark:text-white">
              {page.props.auth.user?.firstname}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">
              {page.props.auth.user?.email}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value={t('pages.team.name')} />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoFocus
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>
    </FormSection>
  );
}
