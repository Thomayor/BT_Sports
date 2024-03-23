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
      key: 'carac19',
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
      key: 'nominstallation',
      search: {
        type: 'text',
        placeholder: 'Nom du terrain',
      },
    },
    {
      label: 'Adresse',
      key: 'adresse',
      search: null,
    },
    {
      label: 'Ville',
      key: 'new_name',
      search: {
        type: 'text',
        placeholder: 'Ville',
      },
    },
    {
      label: 'Code Postal',
      key: 'codepostal',
      search: {
        type: 'text',
        placeholder: 'Code Postal',
      },
    },
    {
      label: 'Activite',
      key: 'typequipement',
      search: {
        type: 'text',
        placeholder: 'Activite',
      },
    },
    {
      label: 'Surface',
      key: 'carac167',
      search: null,
    },
    {
      label: 'Couvert/Decouvert',
      key: 'carac168',
      search: null,
    },
    {
      label: 'Selectionner',
      key: 'select',
      search: null,
      render: row => (
        <button onClick={(e) => handleChoose(e,row.numequipement)}>Choisir</button>
      ),
    },
  ] satisfies PlaygroundColumn[];
