import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { fetchFacilitiesWithFilters } from '@/api';

export default function ListPlaygrounds() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState({
    carac19: '',
    codepostal: '',
    carac159: '',
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchResults = async () => {
    try {
      const data = await fetchFacilitiesWithFilters(filters, {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      });
      console.log('API Response:', data);
      setResults(data.results);
      setTotalResults(data.total_count);
    } catch (error) {
      console.error('Error fetching results: ', error);
    }
  };

  useEffect(() => {
    console.log('Filters changed:', filters);

    fetchResults();
  }, []);

  const handleSubmit = async () => {
    console.log('Submit:', filters);
    fetchResults();
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <AppLayout title="Create Playground">
      <div>
        <select
          value={filters.carac19}
          onChange={e => handleFilterChange('carac19', e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Complexe sportif">Complexe sportif</option>
          <option value="Etablissement scolaire">Etablissement scolaire</option>
        </select>

        <input
          value={filters.codepostal}
          onChange={e => handleFilterChange('codepostal', e.target.value)}
          type="string"
          placeholder="Code postal"
        />

        <select
          value={filters.carac159}
          onChange={e => handleFilterChange('carac159', e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Clubs sportifs, comités, ligues, fédérations">
            Clubs sportifs, comités, ligues, fédérations
          </option>
        </select>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>

        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalResults / pageSize + 1}
        >
          Next
        </button>
        <button onClick={handleSubmit}>Rechercher</button>

        <h2>Résultats :</h2>
        <table>
          <thead>
            <tr>
              <th>Nom du terrain</th>
              <th>Adresse</th>
              <th>Ville</th>
              <th>Code Postal</th>
              <th>Type équipement</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.nominstallation}</td>
                <td>{result.adresse}</td>
                <td>{result.new_name}</td>
                <td>{result.codepostal}</td>
                <td>{result.typequipement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
