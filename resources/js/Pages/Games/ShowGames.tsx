import { ShowGamesProps } from "@/types"
import React from "react"
import formatTime from "@/Services/formatTime"
import formatDate from "@/Services/formatDate"
import { Link } from "@inertiajs/react"
import AppLayout from "@/Layouts/AppLayout"

export default function ShowGames({ games, teams, sports, playgrounds }: ShowGamesProps) {
    return (
        <AppLayout
            title="Matches"
        >

            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="sm:table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Sport
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        From / To
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Playground
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Adress
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Max Player
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {games.map((game) => {
                                    const sport = sports.find(sport => sport.id === game.sport_id);
                                    const playground = playgrounds.find(playground => playground.id === game.playground_id);
                                    return (
                                        <tr key={game.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {sport?.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {formatDate(game.date)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatTime(game.start_time)} / {formatTime(game.end_time)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {playground?.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {playground?.adress}, {playground?.postcode} {playground?.city}
                                            </td>
                                            <td className="px-6 py-4">
                                                {game.max_player} players
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`games/${game.id}`}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Show Details
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}