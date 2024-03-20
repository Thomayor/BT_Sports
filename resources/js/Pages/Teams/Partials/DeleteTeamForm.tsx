import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Team } from '@/types';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useState } from 'react';
import { t } from 'i18next';

interface Props {
  team: Team;
}

export default function DeleteTeamForm({ team }: Props) {
  const route = useRoute();
  const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
  const form = useForm({});

  function confirmTeamDeletion() {
    setConfirmingTeamDeletion(true);
  }

  function deleteTeam() {
    form.delete(route('teams.destroy', [team]), {
      errorBag: 'deleteTeam',
    });
  }

  return (
    <ActionSection
      title={t('pages.team.deleteTeam')}
      description={t('pages.team.permanently')}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
      {t('pages.team.text')}
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmTeamDeletion}> {t('pages.team.deleteTeam')}</DangerButton>
      </div>

      {/* <!-- Delete Team Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={confirmingTeamDeletion}
        onClose={() => setConfirmingTeamDeletion(false)}
      >
        <ConfirmationModal.Content title={t('pages.team.deleteTeam')}>
        {t('pages.team.sure')}
        </ConfirmationModal.Content>

        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
          {t('pages.team.cancel')}
          </SecondaryButton>

          <DangerButton
            onClick={deleteTeam}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
             {t('pages.team.deleteTeam')}
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </ActionSection>
  );
}
