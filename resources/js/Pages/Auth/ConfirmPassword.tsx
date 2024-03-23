import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ConfirmPassword() {
  const route = useRoute();
  const form = useForm({
    password: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  };

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {t('pages.auth.confirmPassword.text')}
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="password">
            {t('pages.auth.confirmPassword.password')}
          </InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="flex justify-end mt-4">
          <PrimaryButton
            type="submit"
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('pages.auth.confirmPassword.confirm')}
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
