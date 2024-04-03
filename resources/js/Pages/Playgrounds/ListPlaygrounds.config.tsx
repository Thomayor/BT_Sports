import { t } from 'i18next';
import React from 'react';

export const pageSizes = [5, 10, 20, 50, 100];

export interface PlaygroundColumn {
  label: string;
  key: string;
  search: Search;
  render?: (row: any) => JSX.Element;
}

type BaseSearch = {
  placeholder: string;
};

export type Search =
  | null
  | (BaseSearch &
      (
        | {
            type: 'text';
          }
        | {
            type: 'select';
            options: { label: string; value: string }[];
          }
      ));

export const getColumns = ({
  handleChoose,
}: {
  handleChoose: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>,num: string) => void;
}) =>
  [
    {
      label: t('pages.playgrounds.label.infrastructure'),
      key: 'inst_part_type_filter',
      search: {
        type: 'select',
        placeholder: t('pages.playgrounds.label.infrastructure'),
        options: [
          { label: t('pages.playgrounds.label.sportComplex'), value: 'Complexe sportif' },
          { label: t('pages.playgrounds.label.school'), value: 'Scolaire' },
          { label: t('pages.playgrounds.label.outdoor'), value: 'Base air loisir' },
          { label: t('pages.playgrounds.label.swimmingpool'), value: 'Piscine' },
          { label: t('pages.playgrounds.label.skiresort'), value: 'ski' },
          { label: t('pages.playgrounds.label.airport'), value: 'Aérodrome/aéroport' },
        ],
      },
    },
    {
      label: t('pages.playgrounds.name'),
      key: 'inst_nom',
      search: {
        type: 'text',
        placeholder: t('pages.playgrounds.name'),
      },
    },
    {
      label:  t('pages.playgrounds.adress'),
      key: 'inst_adresse',
      search: null,
    },
    {
      label: t('pages.playgrounds.city'),
      key: 'inst_com_nom',
      search: {
        type: 'text',
        placeholder: t('pages.playgrounds.city'),
      },
    },
    {
      label:  t('pages.playgrounds.postcode'),
      key: 'inst_cp',
      search: {
        type: 'text',
        placeholder:  t('pages.playgrounds.postcode'),
      },
    },
    {
      label:  t('pages.playgrounds.activity'),
      key: 'equip_type_name',
      search: {
        type: 'text',
        placeholder:  t('pages.playgrounds.activity'),
      },
    },
    {
      label:  t('pages.playgrounds.surface'),
      key: 'equip_sol',
      search: null,
    },
    {
      label:  t('pages.playgrounds.iscover'),
      key: 'equip_nature',
      search: null,
    },
    {
      label:  t('pages.playgrounds.label.select'),
      key: 'select',
      search: null,
      render: row => (
        <button className='hidden sm:block' onClick={(e) => handleChoose(e,row.equip_numero)}>Choisir</button>
      ),
    },
  ] satisfies PlaygroundColumn[];
