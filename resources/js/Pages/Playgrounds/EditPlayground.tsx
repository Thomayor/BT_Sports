import React from 'react';

import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Playground } from '@/types';
import useRoute from '@/Hooks/useRoute';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import FormSection from '@/Components/FormSection';
import ActionMessage from '@/Components/ActionMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import classNames from 'classnames';
import { Button } from '@/Components/ui';
import { t } from 'i18next';

interface EditPlaygroundProps {
  playground: Playground;
}

const EditPlayground = ({ playground }: EditPlaygroundProps) => {
  const route = useRoute();

  const form = useForm({
    name: playground.name,
    surface_type: playground.surface_type,
    playground_type: playground.playground_type,
    is_covered: playground.is_covered,
    city: playground.city,
    address: playground.address,
    postcode: playground.postcode,
    coordgpsx: playground.coordgpsx,
    coordgpsy: playground.coordgpsy,
    equipment_id: playground.equipment_id,
    installation_id: playground.installation_id,
  });

  function updatePlayground() {
    form.put(route('playgrounds.update', playground.id), {
      errorBag: 'updatePlayground',
      preserveScroll: true,
    });
  }
  return (
    <AppLayout title={t('pages.playgrounds.title')}>
      <div className='max-w-7xl mx-auto py-10 sm:px-6 lg:px-8'>
        <Button className='my-2 bg-sky-500 hover:bg-sky-200 text-white py-2 px-8 rounded'>
        <Link href={route('playgrounds.index')} > {t('pages.playgrounds.return')} </Link>
        </Button>
        <FormSection
          onSubmit={updatePlayground}
          title={'Edit Playground'}
          description={'Edit a playground'}
          renderActions={() => (
            <>
              <ActionMessage on={form.recentlySuccessful} className="mr-3">
              {t('pages.playgrounds.created')}
              </ActionMessage>

              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                {t('pages.playgrounds.save')}
              </PrimaryButton>
            </>
          )}
        >
          <div className="col-span-6 sm:col-span-6">
            <InputLabel htmlFor="name" value={t('pages.playgrounds.name')} />
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full mb-2"
              value={playground.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.name} className="mt-2" />

            <InputLabel htmlFor="surfaceType" value={t('pages.playgrounds.surface')} />
            <TextInput
              id="surfaceType"
              type="text"
              className="mt-1 block w-full mb-2"
              value={playground.surface_type}
              onChange={e =>
                form.setData('surface_type', e.currentTarget.value)
              }
              autoFocus
            />
            <InputError message={form.errors.surface_type} className="mt-2" />

            <InputLabel htmlFor="playground_type" value={t('pages.playgrounds.activity')} />
            <TextInput
              id="playground_type"
              type="text"
              className="mt-1 block w-full mb-2"
              value={playground.playground_type}
              onChange={e =>
                form.setData('playground_type', e.currentTarget.value)
              }
              autoFocus
            />
            <InputError
              message={form.errors.playground_type}
              className="mt-2"
            />

            <InputLabel htmlFor="is_covered" value={t('pages.playgrounds.iscover')} />
            <TextInput
              id="is_covered"
              type="text"
              value={playground.is_covered}
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('is_covered', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.is_covered} className="mt-2" />
            <InputLabel htmlFor="city" value={t('pages.playgrounds.city')} />
            <TextInput
              id="city"
              type="text"
              value={playground.city}
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('city', e.currentTarget.value)}
              autoFocus
            />

            <InputError message={form.errors.city} className="mt-2" />
            <InputLabel htmlFor="address" value={t('pages.playgrounds.address')} />
            <TextInput
              id="address"
              type="text"
              value={playground.address}
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('address', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.address} className="mt-2" />
            <InputLabel htmlFor="postcode" value={t('pages.playgrounds.postcode')} />
            <TextInput
              id="postcode"
              type="text"
              value={playground.postcode}
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('postcode', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.postcode} className="mt-2" />
            <InputLabel htmlFor="coordgpsx" value={t('pages.playgrounds.coordgpsx')} />
            <TextInput
              id="coordgpsx"
              type="number"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('coordgpsx', parseFloat(e.currentTarget.value))
              }
              autoFocus
              value={playground.coordgpsx.toString()}
            />
            <InputError message={form.errors.coordgpsx} className="mt-2" />
            <InputLabel htmlFor="coordgpsy" value={t('pages.playgrounds.coordgpsy')} />
            <TextInput
              id="coordgpsy"
              type="number"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('coordgpsy', parseFloat(e.currentTarget.value))
              }
              autoFocus
              value={playground.coordgpsy.toString()}
            />
            <InputError message={form.errors.coordgpsy} className="mt-2" />
            <InputLabel htmlFor="equipment_id" value={t('pages.playgrounds.equipmentid')} />
            <TextInput
              id="equipment_id"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('equipment_id', e.currentTarget.value)
              }
              autoFocus
              value={playground.equipment_id}
            />
            <InputError message={form.errors.equipment_id} className="mt-2" />
            <InputLabel htmlFor="installation_id" value={t('pages.playgrounds.installid')} />
            <TextInput
              id="installation_id"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('installation_id', e.currentTarget.value)
              }
              autoFocus
             value={playground.installation_id}
            />
            <InputError
              message={form.errors.installation_id}
              className="mt-2"
            />
          </div>
        </FormSection>
      </div>
    </AppLayout>
  );
};

export default EditPlayground;
