import React, { useState } from "react";
import useRoute from "@/Hooks/useRoute";
import { useForm } from "@inertiajs/react";
import ActionMessage from "@/Components/ActionMessage";
import PrimaryButton from "@/Components/PrimaryButton";
import classNames from "classnames";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import FormSection from "@/Components/FormSection";
import { t } from "i18next";

export default function CreateSportForm() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const route = useRoute();
    const form = useForm({
        name: ''
    });

    function createSport() {
        if (!form.data.name.trim()) {
            setErrorMessage(t('pages.sports.error'));
            return;
        }

        form.post(route('sports.store'), {
            errorBag: 'createSport',
            preserveScroll: true,
        });

        setErrorMessage('');
    }; 

    return (
        <div>
            <FormSection
                onSubmit={createSport}
                title={t('pages.sports.create')}
                description={t('pages.sports.createdesc')}
                renderActions={() => (
                    <>
                        <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        {t('pages.sports.created')}
                        </ActionMessage>

                        <PrimaryButton
                            className={classNames({ 'opacity-25': form.processing })}
                            disabled={form.processing}
                        >
                            {t('pages.sports.save')}
                        </PrimaryButton>
                    </>
                )}
            >
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name" value={t('pages.sports.name')} />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full mb-2"
                        value={form.data.name}
                        onChange={e => form.setData('name', e.currentTarget.value)}
                        autoFocus
                    />
                    <InputError message={errorMessage} className="mt-2" />
                </div>
            </FormSection>
        </div>
    )
}