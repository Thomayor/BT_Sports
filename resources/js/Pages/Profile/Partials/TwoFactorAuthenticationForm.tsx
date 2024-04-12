import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { t } from 'i18next';
import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  requiresConfirmation: boolean;
}

export default function TwoFactorAuthenticationForm({
  requiresConfirmation,
}: Props) {
  const page = useTypedPage();
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [setupKey, setSetupKey] = useState<string | null>(null);
  const confirmationForm = useForm({
    code: '',
  });
  const twoFactorEnabled =
    !enabling && page.props?.auth?.user?.two_factor_enabled;

  const showSetupKey = () => {
    return axios.get('/user/two-factor-secret-key').then(response => {
      setSetupKey(response.data.secretKey);
    });
  };

  const showQrCode = () => {
    return axios.get('/user/two-factor-qr-code').then(response => {
      setQrCode(response.data.svg);
    });
  };

  const showRecoveryCodes = () => {
    return axios.get('/user/two-factor-recovery-codes').then(response => {
      setRecoveryCodes(response.data);
    });
  };
  const enableTwoFactorAuthentication = () => {
    setEnabling(true);

    router.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess() {
          return Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
          ]);
        },
        onFinish() {
          setEnabling(false);
          setConfirming(requiresConfirmation);
        },
      },
    );
  };

  const confirmTwoFactorAuthentication = () => {
    confirmationForm.post('/user/confirmed-two-factor-authentication', {
      preserveScroll: true,
      preserveState: true,
      errorBag: 'confirmTwoFactorAuthentication',
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  };

  const regenerateRecoveryCodes = () => {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes();
    });
  };

  const disableTwoFactorAuthentication = () => {
    setDisabling(true);

    router.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess() {
        setDisabling(false);
        setConfirming(false);
      },
    });
  };

  return (
    <ActionSection
      title={t('pages.profile.twoFactorAuth.title')}
      description={t('pages.profile.twoFactorAuth.description')}
    >
      {(() => {
        if (twoFactorEnabled && !confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t('pages.profile.twoFactorAuth.enabled')}
            </h3>
          );
        }
        if (confirming) {
          return (
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t('pages.profile.twoFactorAuth.enabling')}
            </h3>
          );
        }
        return (
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t('pages.profile.twoFactorAuth.notEnabled')}
          </h3>
        );
      })()}

      <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
        <p>{t('pages.profile.twoFactorAuth.textEnabled')}</p>
      </div>

      {twoFactorEnabled || confirming ? (
        <div>
          {qrCode ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                {confirming ? (
                  <p className="font-semibold">
                    To finish enabling two factor authentication, scan the
                    following QR code using your phone&apos;s authenticator
                    application or enter the setup key and provide the generated
                    OTP code.
                  </p>
                ) : (
                  <p>
                    Two factor authentication is now enabled. Scan the following
                    QR code using your phone&apos;s authenticator application or
                    enter the setup key.
                  </p>
                )}
              </div>

              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: qrCode || '' }}
              />

              {setupKey && (
                <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                  <p className="font-semibold">
                    {t('pages.profile.twoFactorAuth.setupKey')}
                    <span
                      dangerouslySetInnerHTML={{ __html: setupKey || '' }}
                    />
                  </p>
                </div>
              )}

              {confirming && (
                <div className="mt-4">
                  <InputLabel htmlFor="code" value="Code" />

                  <TextInput
                    id="code"
                    type="text"
                    name="code"
                    className="block mt-1 w-1/2"
                    inputMode="numeric"
                    autoFocus
                    autoComplete="one-time-code"
                    value={confirmationForm.data.code}
                    onChange={e =>
                      confirmationForm.setData('code', e.currentTarget.value)
                    }
                  />

                  <InputError
                    message={confirmationForm.errors.code}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          ) : null}

          {recoveryCodes.length > 0 && !confirming ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold">
                  {t('pages.profile.twoFactorAuth.recoveryCodes')}
                </p>
              </div>

              <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 rounded-lg">
                {recoveryCodes.map(code => (
                  <div key={code}>{code}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5">
        {twoFactorEnabled || confirming ? (
          <div>
            {confirming ? (
              <ConfirmsPassword onConfirm={confirmTwoFactorAuthentication}>
                <PrimaryButton
                  className={classNames('mr-3', { 'opacity-25': enabling })}
                  disabled={enabling}
                >
                  {t('pages.profile.twoFactorAuth.confirm')}
                </PrimaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length > 0 && !confirming ? (
              <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  {t('pages.profile.twoFactorAuth.regRecoveryCodes')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length === 0 && !confirming ? (
              <ConfirmsPassword onConfirm={showRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  {t('pages.profile.twoFactorAuth.showRecoveryCodes')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}

            {confirming ? (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <SecondaryButton
                  className={classNames('mr-3', { 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  {t('pages.profile.twoFactorAuth.cancel')}
                </SecondaryButton>
              </ConfirmsPassword>
            ) : (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <DangerButton
                  className={classNames({ 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  {t('pages.profile.twoFactorAuth.disable')}
                </DangerButton>
              </ConfirmsPassword>
            )}
          </div>
        ) : (
          <div>
            <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
              <PrimaryButton
                type="button"
                className={classNames({ 'opacity-25': enabling })}
                disabled={enabling}
              >
                {t('pages.profile.twoFactorAuth.enable')}
              </PrimaryButton>
            </ConfirmsPassword>
          </div>
        )}
      </div>
    </ActionSection>
  );
}
