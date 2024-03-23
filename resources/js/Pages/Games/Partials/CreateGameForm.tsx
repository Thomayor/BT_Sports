import React, { useState } from "react";
import useRoute from "@/Hooks/useRoute";
import { useForm } from "@inertiajs/react";
import FormSection from "@/Components/FormSection";
import ActionMessage from "@/Components/ActionMessage";
import PrimaryButton from "@/Components/PrimaryButton";
import classNames from "classnames";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { CreateGameProps, Playground, Sport, Team } from "@/types";

export default function CreateGameForm({ playgrounds, sports, teams }: CreateGameProps) {
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const route = useRoute();

    const form = useForm({
        date: '',
        start_time: '',
        end_time: '',
        max_player: '',
        sport_id: '',
        playground_id: '',
        team_id: ''
    });

    function createGame() {
        form.post(route('games.store'), {
            errorBag: 'createGame',
            preserveScroll: true,
        });

        setIsCompleted(false);
        setErrorMessage('');
    };

    function showAddTeam() {
        if (
            form.data.date &&
            form.data.start_time &&
            form.data.end_time &&
            form.data.max_player &&
            form.data.sport_id
        ) {
            setIsCompleted(true);
        }
        setErrorMessage('Please fill out all fields.');
    };

    return (
        <div>
            {!isCompleted ? (
                <FormSection
                    onSubmit={showAddTeam}
                    title={'Game Form'}
                    description={'Create a game and challenge opponents.'}
                    renderActions={() => (
                        <>
                            <ActionMessage on={form.recentlySuccessful} className="mr-3">
                                Next Page.
                            </ActionMessage>

                            <PrimaryButton
                                className={classNames({ 'opacity-25': form.processing })}
                                disabled={form.processing}
                            >
                                Next
                            </PrimaryButton>
                        </>
                    )}
                >
                    <div className="col-span-6 sm:col-span-4">
                        <InputLabel htmlFor="sport" value="Sport" />
                        <select
                            id="sports"
                            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={form.data.sport_id}
                            onChange={e => form.setData('sport_id', e.target.value)}
                        >
                            <option value="">Choisir un sport</option>
                            {sports.map((sport: Sport) => (
                                <option key={sport.id} value={sport.id}>
                                    {sport.name}
                                </option>
                            ))}
                        </select>

                        <InputLabel htmlFor="date" value="Date" />
                        <TextInput
                            id="date"
                            type="date"
                            className="mt-1 block w-full mb-2"
                            value={form.data.date}
                            onChange={e => form.setData('date', e.currentTarget.value)}
                            autoFocus
                        />
                        <InputError message={form.errors.date} className="mt-2" />

                        <InputLabel htmlFor="start_time" value="Start Time" />
                        <TextInput
                            id="start_time"
                            type="time"
                            className="mt-1 block w-full mb-2"
                            value={form.data.start_time}
                            onChange={e => form.setData('start_time', e.currentTarget.value)}
                            autoFocus
                        />

                        <InputLabel htmlFor="end_time" value="End Time" />
                        <TextInput
                            id="end_time"
                            type="time"
                            className="mt-1 block w-full mb-2"
                            value={form.data.end_time}
                            onChange={e => form.setData('end_time', e.currentTarget.value)}
                            autoFocus
                        />

                        <InputLabel htmlFor="max_players" value="Max Players" />
                        <TextInput
                            id="max_players"
                            type="number"
                            min={2}
                            className="mt-1 block w-full mb-2"
                            value={form.data.max_player}
                            onChange={e => form.setData('max_player', e.currentTarget.value)}
                            autoFocus
                        />

                        {errorMessage && (
                            <InputError message={errorMessage} className="mt-2" />
                        )}
                    </div>
                </FormSection>
            ) : (
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
                                Save
                            </PrimaryButton>
                        </>
                    )}
                >
                    <div className="col-span-6 sm:col-span-4">
                        <InputLabel htmlFor="playground" value="Playground" />
                        <select
                            id="playgrounds"
                            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={form.data.playground_id}
                            onChange={e => form.setData('playground_id', e.target.value)}
                        >
                            <option value="">Choisir un terrain</option>
                            {playgrounds.map((playground: Playground) => (
                                <option key={playground.id} value={playground.id}>
                                    {playground.name}
                                </option>
                            ))}
                        </select>

                        <InputLabel htmlFor="team" value="Team" />
                        <select
                            id="teams"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={form.data.team_id}
                            onChange={e => form.setData('team_id', e.target.value)}
                        >
                            <option value="">Choisir une équipe</option>
                            {teams.map((team: Team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </FormSection>
            )}
        </div>
    )
}