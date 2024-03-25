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
    adress: playground.adress,
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
    <AppLayout title="Terrains">
      <div className='max-w-7xl mx-auto py-10 sm:px-6 lg:px-8'>
        <Link href={route('playgrounds.index')} className='rounded-full border-2 px-4 border-slate-500 '> Retour liste </Link>
        <FormSection
          onSubmit={updatePlayground}
          title={'Edit Playground'}
          description={'Edit a playground'}
          renderActions={() => (
            <>
              <ActionMessage on={form.recentlySuccessful} className="mr-3">
                Game created.
              </ActionMessage>

              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Save
              </PrimaryButton>
            </>
          )}
        >
          <div className="col-span-6 sm:col-span-6">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full mb-2"
              value={form.data.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              autoFocus
              placeholder={playground.name}
            />
            <InputError message={form.errors.name} className="mt-2" />

            <InputLabel htmlFor="surfaceType" value="surfaceType" />
            <TextInput
              id="surfaceType"
              type="text"
              className="mt-1 block w-full mb-2"
              value={form.data.surface_type}
              onChange={e =>
                form.setData('surface_type', e.currentTarget.value)
              }
              autoFocus
              placeholder={playground.surface_type}
            />
            <InputError message={form.errors.surface_type} className="mt-2" />

            <InputLabel htmlFor="playground_type" value="Activite" />
            <TextInput
              id="playground_type"
              type="text"
              className="mt-1 block w-full mb-2"
              value={form.data.playground_type}
              onChange={e =>
                form.setData('playground_type', e.currentTarget.value)
              }
              autoFocus
              placeholder={playground.playground_type}
            />
            <InputError
              message={form.errors.playground_type}
              className="mt-2"
            />

            <InputLabel htmlFor="is_covered" value="Is Covered" />
            <TextInput
              id="is_covered"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('is_covered', e.currentTarget.value)}
              autoFocus
              placeholder={playground.is_covered}
            />
            <InputError message={form.errors.is_covered} className="mt-2" />
            <InputLabel htmlFor="city" value="city" />
            <TextInput
              id="city"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('city', e.currentTarget.value)}
              autoFocus
              placeholder={playground.city}
            />

            <InputError message={form.errors.city} className="mt-2" />
            <InputLabel htmlFor="adress" value="adress" />
            <TextInput
              id="adress"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('adress', e.currentTarget.value)}
              autoFocus
              placeholder={playground.adress}
            />
            <InputError message={form.errors.adress} className="mt-2" />
            <InputLabel htmlFor="postcode" value="postcode" />
            <TextInput
              id="postcode"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e => form.setData('postcode', e.currentTarget.value)}
              autoFocus
              placeholder={playground.postcode}
            />
            <InputError message={form.errors.postcode} className="mt-2" />
            <InputLabel htmlFor="coordgpsx" value="coordgpsx" />
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
            <InputLabel htmlFor="coordgpsy" value="coordgpsy" />
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
            <InputLabel htmlFor="equipment_id" value="equipment_id" />
            <TextInput
              id="equipment_id"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('equipment_id', e.currentTarget.value)
              }
              autoFocus
              placeholder={playground.equipment_id}
            />
            <InputError message={form.errors.equipment_id} className="mt-2" />
            <InputLabel htmlFor="installation_id" value="installation_id" />
            <TextInput
              id="installation_id"
              type="text"
              className="mt-1 block w-full mb-2"
              onChange={e =>
                form.setData('installation_id', e.currentTarget.value)
              }
              autoFocus
              placeholder={playground.installation_id}
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
