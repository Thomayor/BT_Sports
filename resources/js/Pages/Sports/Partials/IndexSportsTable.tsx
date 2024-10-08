import React from 'react';
import { ShowSportsProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm as inertiaForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/Components/ui';
import { t } from 'i18next';

const IndexSportsTable: React.FC<ShowSportsProps> = ({ sports }) => {
  const route = useRoute();

  // DELETE SPORT
  const { delete: destroy, reset } = inertiaForm({
    sports: sports,
  });

  const deleteSport = (sport_id: number, e: React.MouseEvent) => {
    e.preventDefault();

    destroy(route('sports.destroy', { id: sport_id }), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto py-10 sm:px-6 lg:px-8">
        <PrimaryButton className="opacity-80 ml-2 mb-2 bg-sky-500">
          <Link href="/sports/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="top-0 right-0 w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </PrimaryButton>

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>{t('pages.sports.name')}</TableCell>

              <TableCell>{t('pages.sports.actions')}</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2}>{t('pages.sports.nosports')}</TableCell>
              </TableRow>
            ) : (
              sports.map(sport => (
                <TableRow
                  key={sport.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    {sport.name}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={e => deleteSport(sport.id, e)}
                      className="opacity-80  bg-rose-700"
                    >
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
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IndexSportsTable;
