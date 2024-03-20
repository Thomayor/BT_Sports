import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/FormSection';
import ActionMessage from '@/Components/ActionMessage';
import PrimaryButton from '@/Components/PrimaryButton';
import classNames from 'classnames';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import FilterOptions from './FilterOptions';


export default function CreateGameForm() {


  const route = useRoute();
  const page = useTypedPage();
  const form = useForm({
    name: '',
    surface_type: '',
    is_covered: '',
    is_booked: 0,
    user_id: '',
    city: '',
    adress: '',
    postcode: '',
    coordgpsx: '',
    coordgpsy:','
  });

  function createPlayground() {
    form.post(route('playgrounds.store'), {
      errorBag: 'createPlayground',
      preserveScroll: true,
    });
  
  }


  return (
        <FormSection
          onSubmit={createPlayground}
          title={'Playground Details'}
          description={'Create a new Playground and challenge opponents'}
          renderActions={() => (
            <>
              <ActionMessage on={form.recentlySuccessful} className="mr-3">
                Playground created.
              </ActionMessage>

              <PrimaryButton
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Create
              </PrimaryButton>
            </>
          )}
        >
      <div className="col-span-6 sm:col-span-4">
            <InputLabel htmlFor="name" value="Playground Name" />
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full"
              value={form.data.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              autoFocus
            />
            <InputError message={form.errors.name} className="mt-2" />

            <InputLabel htmlFor="surface_type" value="Surface Type" />
            <TextInput
              id="surface_type"
              type="text"
              className="mt-1 block w-full"
              value={form.data.surface_type}
              onChange={e => form.setData('surface_type', e.currentTarget.value)}
              autoFocus
            />

            <InputLabel htmlFor="is_covered" value="is covered" />
            <TextInput
              id="is_covered"
              type="checkbox"
              className="mt-1 block w-full"
              value={form.data.is_covered}
              onChange={e => form.setData('is_covered', e.currentTarget.value)}
              autoFocus
            />

            <InputLabel htmlFor="city" value="city" />
            <TextInput
              id="city"
              type="text"
              className="mt-1 block w-full"
              value={form.data.city}
              onChange={e => form.setData('city', e.currentTarget.value)}
              autoFocus
        />
        
  <InputLabel htmlFor="adress" value="adress" />
            <TextInput
              id="adress"
              type="text"
              className="mt-1 block w-full"
              value={form.data.adress}
              onChange={e => form.setData('adress', e.currentTarget.value)}
              autoFocus
        />
          <InputLabel htmlFor="postcode" value="post code" />
            <TextInput
              id="postcode"
              type="text"
              className="mt-1 block w-full"
              value={form.data.postcode}
              onChange={e => form.setData('postcode', e.currentTarget.value)}
              autoFocus
            />
               <InputLabel htmlFor="postcode" value="post code" />
            <TextInput
              id="postcode"
              type="text"
              className="mt-1 block w-full"
              value={form.data.postcode}
              onChange={e => form.setData('postcode', e.currentTarget.value)}
              autoFocus
            />
                 <InputLabel htmlFor="coordgpsx" value="Longitude" />
            <TextInput
              id="coordgpsx"
              type="number"
              className="mt-1 block w-full"
              value={form.data.coordgpsx}
              onChange={e => form.setData('coordgpsx', e.currentTarget.value)}
              autoFocus
        />
        
        <InputLabel htmlFor="coordgpsy" value="Latitude" />
            <TextInput
              id="coordgpsy"
              type="number"
              className="mt-1 block w-full"
              value={form.data.coordgpsx}
              onChange={e => form.setData('coordgpsy', e.currentTarget.value)}
              autoFocus
            />
          </div>
        </FormSection>
  );
}
