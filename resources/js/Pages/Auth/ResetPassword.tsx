import { useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthenticationCard>
      <Head title="Reset Password" />

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="email">
            {t('pages.auth.resetPassword.email')}
          </InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">
            {t('pages.auth.resetPassword.password')}
          </InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation">
            {t('pages.auth.resetPassword.confirm')}
          </InputLabel>
          <TextInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={e =>
              form.setData('password_confirmation', e.currentTarget.value)
            }
            required
            autoComplete="new-password"
          />
          <InputError
            className="mt-2"
            message={form.errors.password_confirmation}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton
            type="submit"
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('pages.auth.resetPassword.reset')}
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
