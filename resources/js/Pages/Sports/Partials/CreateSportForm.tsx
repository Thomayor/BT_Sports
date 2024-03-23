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

export default function CreateSportForm() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const route = useRoute();
    const form = useForm({
        name: ''
    });

    function createSport() {
        if (!form.data.name.trim()) {
            setErrorMessage('Please enter a name for the sport.');
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
                title={'Create Sport'}
                description={'Admin section to add sports.'}
                renderActions={() => (
                    <>
                        <ActionMessage on={form.recentlySuccessful} className="mr-3">
                            Sport created.
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
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name" value="Name" />
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