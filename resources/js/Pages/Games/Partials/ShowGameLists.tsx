import React from "react";
import { ShowGameProps } from "@/types";
import formatDate from "@/Services/formatDate";
import formatTime from "@/Services/formatTime";
import PrimaryButton from "@/Components/PrimaryButton";
import useTypedPage from "@/Hooks/useTypedPage";
import useRoute from "@/Hooks/useRoute";
import { Link, useForm as inertiaForm } from '@inertiajs/react';

export default function ShowGameLists({ game, sport, playground, teams, users }: ShowGameProps) {
    const page = useTypedPage();
    const route = useRoute();

    const userID = page.props.auth.user?.id;
    const numTeams = teams.length;

    const { delete: destroy, reset } = inertiaForm({
        game
    });

    const deleteGame = (gameID: number, e: React.MouseEvent) => {
        e.preventDefault();
        destroy(route('games.destroy', { id: gameID }), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
                <li key={teams[0].id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{teams[0].name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{teams[0].created_at}</p>
                        </div>
                    </div>
                </li>
            </ul>

            <div className="max-w-xl rounded-lg mt-2 mx-auto py-8 sm:px-6 lg:px-8 border-solid border-2 border-sky-600">
                <div className="px-0 sm:px-0" >
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Game Informations</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">All game informations are displayed here</p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Sport</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">{sport[0].name} game</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">{formatDate(game.date)}</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">From / To</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">{formatTime(game.start_time)} / {formatTime(game.end_time)}</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Playground</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">{playground[0].name}</dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Adress</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">
                                {playground[0].adress}, {playground[0].postcode} {playground[0].city}
                            </dd>
                        </div>
                        <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Teams</dt>
                            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">
                                {teams[0].name}{teams[1] && ` VS ${teams[1].name}`}
                            </dd>
                        </div>

                        <div className="flex justify-start">
                            {numTeams < 2 && (
                                <PrimaryButton className='opacity-80 mt-6 bg-sky-500 mr-2' >
                                    <Link href={`${game.id}/join-team`}>
                                        Join the game
                                    </Link>
                                </PrimaryButton>
                            )}

                            {userID === game.user_id && (
                                <>
                                    <PrimaryButton className='opacity-80 mt-6 bg-lime-500 mr-2' >
                                        <Link href={`${game.id}/edit`}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </Link>
                                    </PrimaryButton>

                                    <PrimaryButton className='opacity-80 mt-6 bg-rose-700' >
                                        <Link href="" onClick={e => deleteGame(game.id, e)} >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </Link>
                                    </PrimaryButton>
                                </>
                            )}
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}