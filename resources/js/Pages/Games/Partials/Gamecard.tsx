import * as React from "react";
import formatTime from '@/Services/formatTime';
import formatDate from '@/Services/formatDate';
import { Game, Playground, ShowGamesProps, Sport } from "@/types";
import { Link } from "@inertiajs/react";

interface GamecardProps{
  game: Game,
  sport: Sport,
  playground: Playground
}

const GameCard = ({ game, sport, playground }: GamecardProps) => (
  <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex justify-between mb-2">
      <div className="font-medium text-lg text-gray-800">{sport?.name}</div>
      <div className="text-gray-600">{formatDate(game.date)}</div>
    </div>
    <div className="text-gray-600 mb-2">
      {formatTime(game.start_time)} - {formatTime(game.end_time)}
    </div>
    <div className="mb-2">{playground?.name}</div>
    <div className="text-gray-600 mb-2">
      {playground?.adress}, {playground?.postcode} {playground?.city}
    </div>
    <div className="text-gray-600">{game.max_player} players</div>
    <div>
      <Link
        href={`games/${game.id}`}
        className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
      >
        Show Details
      </Link>
    </div>
  </div>
);

const GameCardList = ({ games, sports, playgrounds }: ShowGamesProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {games.length === 0 ? (
      <div className="bg-white rounded-lg flex justify-center p-10">PAS DE MATCHS CRÉÉS</div>
    ) : (
      games.map((game) => {
        const sport = sports.find((sport) => sport.id === game.sport_id);
        const playground = playgrounds.find(
          (playground) => playground.equipment_id === game.equipment_id
        );

        return <GameCard key={game.id} game={game} sport={sport} playground={playground} />;
      })
    )}
  </div>
);

export default GameCardList;
