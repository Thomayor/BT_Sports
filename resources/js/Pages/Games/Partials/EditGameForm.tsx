import ActionMessage from "@/Components/ActionMessage";
import FormSection from "@/Components/FormSection";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import useRoute from "@/Hooks/useRoute";
import useTypedPage from "@/Hooks/useTypedPage";
import { useForm } from "@inertiajs/react";

export default function EditGameForm() {
    const route = useRoute();
    const page = useTypedPage();
    const form = useForm({
        name: '',
    });

    function createGame() {
        form.put(route('games.update'), {
            errorBag: 'updateGame',
            preserveScroll: true,
        });
    }

    return (
        <FormSection
            onSubmit={createGame}
            title={'Game Details'}
            description={'Create a new game and challenge opponents'}
            renderActions={() => (
                <>
                    <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        Game created.
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
                <InputLabel htmlFor="name" value="Team Name" />
                <TextInput
                    id="name"
                    type="date"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />
                <InputError message={form.errors.name} className="mt-2" />

                <InputLabel htmlFor="startTime" value="Start Time" />
                <TextInput
                    id="startTtime"
                    type="time"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />

                <InputLabel htmlFor="endTime" value="End Time" />
                <TextInput
                    id="endTime"
                    type="time"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />

                <InputLabel htmlFor="maxPlayers" value="Max Players" />
                <TextInput
                    id="maxPlayers"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />

                <InputLabel htmlFor="endTime" value="End Time" />
                <TextInput
                    id="endTime"
                    type="time"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />

                <InputLabel htmlFor="endTime" value="End Time" />
                <TextInput
                    id="endTime"
                    type="time"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    autoFocus
                />
            </div>
        </FormSection>
    )
}