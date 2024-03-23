import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import { t } from 'i18next';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    firstname: '',
    lastname:'',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthenticationCard>
      <Head title="Register" />

      <form onSubmit={onSubmit}>
      <div >
          <InputLabel htmlFor="lastname">
            {t('pages.auth.register.lastname')}
          </InputLabel>
          <TextInput
            id="lastname"
            type="text"
            className="mt-1 block w-full"
            value={form.data.lastname}
            onChange={e => form.setData('lastname', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="lastname"
          />
          <InputError className="mt-2" message={form.errors.lastname} />
        </div>

        <div  className="mt-4">
          <InputLabel htmlFor="firstname">
            {t('pages.auth.register.firstname')}
          </InputLabel>
          <TextInput
            id="firstname"
            type="text"
            className="mt-1 block w-full"
            value={form.data.firstname}
            onChange={e => form.setData('firstname', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="firstname"
          />
          <InputError className="mt-2" message={form.errors.firstname} />
        </div>

       

        <div className="mt-4">
          <InputLabel htmlFor="email">
            {t('pages.auth.register.email')}
          </InputLabel>
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={e => form.setData('email', e.currentTarget.value)}
            required
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password">
            {t('pages.auth.register.password')}
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
            {t('pages.auth.register.confirmPassword')}
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

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <InputLabel htmlFor="terms">
              <div className="flex items-center">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                  required
                />

                <div className="ml-2">
                  I agree to the
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              <InputError className="mt-2" message={form.errors.terms} />
            </InputLabel>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            {t('pages.auth.register.alreadyReg')}
          </Link>

          <PrimaryButton
            type="submit"
            className={classNames('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            {t('pages.auth.register.register')}
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
