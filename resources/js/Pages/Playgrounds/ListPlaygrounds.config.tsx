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
  handleChoose: (e,num: string) => void;
}) =>
  [
    {
      label: 'Infrastructure',
      key: 'inst_part_type_filter',
      search: {
        type: 'select',
        placeholder: 'Infrastructure',
        options: [
          { label: 'Complexe sportif', value: 'Complexe sportif' },
          { label: 'Etablissement scolaire', value: 'Scolaire' },
          { label: 'Base de plein air et/ou de loisirs', value: 'Base air loisir' },
          { label: 'Piscine', value: 'Piscine' },
          { label: 'Domaine de ski', value: 'ski' },
          { label: 'Aérodrome/aéroport', value: 'Aérodrome/aéroport' },
        ],
      },
    },
    {
      label: 'Nom du terrain',
      key: 'inst_nom',
      search: {
        type: 'text',
        placeholder: 'Nom du terrain',
      },
    },
    {
      label: 'Adresse',
      key: 'inst_adresse',
      search: null,
    },
    {
      label: 'Ville',
      key: 'inst_com_nom',
      search: {
        type: 'text',
        placeholder: 'Ville',
      },
    },
    {
      label: 'Code Postal',
      key: 'inst_cp',
      search: {
        type: 'text',
        placeholder: 'Code Postal',
      },
    },
    {
      label: 'Activite',
      key: 'equip_type_name',
      search: {
        type: 'text',
        placeholder: 'Activite',
      },
    },
    {
      label: 'Surface',
      key: 'equip_sol',
      search: null,
    },
    {
      label: 'Couvert/Decouvert',
      key: 'equip_nature',
      search: null,
    },
    {
      label: 'Selectionner',
      key: 'select',
      search: null,
      render: row => (
        <button className='hidden sm:block' onClick={(e) => handleChoose(e,row.equip_numero)}>Choisir</button>
      ),
    },
  ] satisfies PlaygroundColumn[];
