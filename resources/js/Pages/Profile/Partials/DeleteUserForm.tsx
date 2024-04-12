import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import ActionSection from '@/Components/ActionSection';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteUserForm() {
  const route = useRoute();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);

    setTimeout(() => passwordRef.current?.focus(), 250);
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    form.reset();
  };
  const deleteUser = () => {
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  };

  return (
    <ActionSection
      title={t('pages.profile.deleteUser.title')}
      description={t('pages.profile.deleteUser.description')}
    >
      <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
        {t('pages.profile.deleteUser.text')}
      </div>

      <div className="mt-5">
        <DangerButton onClick={confirmUserDeletion}>
          {t('pages.profile.deleteUser.delete')}
        </DangerButton>
      </div>

      {/* <!-- Delete Account Confirmation Modal --> */}
      <DialogModal isOpen={confirmingUserDeletion} onClose={closeModal}>
        <DialogModal.Content title="Delete Account">
          {t('pages.profile.deleteUser.confirmText')}
          <div className="mt-4">
            <TextInput
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
            />

            <InputError message={form.errors.password} className="mt-2" />
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>
            {t('pages.profile.deleteUser.cancel')}
          </SecondaryButton>

          <DangerButton
            onClick={deleteUser}
            className={classNames('ml-2', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('pages.profile.deleteUser.delete')}
          </DangerButton>
        </DialogModal.Footer>
      </DialogModal>
    </ActionSection>
  );
}
