import React, { useState, useEffect } from 'react';
import { fetchFacilitiesWithFilters } from '@/api';
import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';
import {
  Button,
  Input,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Card,
} from '@/Components/ui';

import {
  PlaygroundColumn,
  getColumns,
  pageSizes,
} from './ListPlaygrounds.config';

interface ListPlaygroundsProps {
  setEquipmentId: (equipmentId: string) => void;
}

export default function ListPlaygrounds({
  setEquipmentId,
}: ListPlaygroundsProps) {
  const route = useRoute();

  const handleChoose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    equip_numero: string,
  ) => {
    console.log('Paramètres reçus :', { equip_numero });
    e.preventDefault();

    try {
      router.post(route('playgrounds.store'), {
        equip_numero,
      });
      alert('Terrain ajouté, cliquez sur Valider');
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
    }

    setEquipmentId(equip_numero);
  };

  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const columns = getColumns({ handleChoose });

  const [filters, setFilters] = useState(
    columns.reduce((acc, column) => {
      acc[column.key] = '';
      return acc;
    }, {} as Record<string, string>),
  );

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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    console.log('Submit:', filters);
    e.preventDefault();
    fetchResults();
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <div className="mt-2">
      {/* FILTER SEARCH */}
      <div className="flex sm:flex-row flex-col gap-2">
        {columns.map((column: PlaygroundColumn) => {
          if (!column.search) return null;
          if (column.search.type === 'text') {
            return (
              <div key={column.key}>
                <Input
                  type="text"
                  id={column.key}
                  value={filters[column.key]}
                  onChange={e => handleFilterChange(column.key, e.target.value)}
                  placeholder={column.search.placeholder}
                />
              </div>
            );
          }
          if (column.search.type === 'select') {
            return (
              <div key={column.key}>
                <Select
                  onValueChange={value => handleFilterChange(column.key, value)}
                  value={filters[column.key]}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={column.search.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {column.search.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }
        })}
        <Select
          onValueChange={value => setPageSize(Number(value))}
          value={pageSize.toString()}
        >
          <SelectTrigger >
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {pageSizes.map(option => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <PaginationContent>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            type="button"
          >
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
          </button>
          <PaginationItem>{page}</PaginationItem>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalResults / pageSize}
            type="button"
          >
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </button>
        </PaginationContent>
        <Button className='bg-sky-600 dark:text-sky-500 hover:bg-sky-500' onClick={handleSubmit}>Rechercher</Button>
      </div>

      {/* RESULTS LIST */}

      <div className="sm:hidden block">
        <div>
          {results.map((result, index) => (
            <Card key={index} className="my-2">
              <div className="p-4">
                {columns.map((column: PlaygroundColumn) => (
                  <div key={column.key} className="mb-2">
                    <span className="font-bold">{column.label}:</span>{' '}
                    {column.render ? column.render(result) : result[column.key]}
                  </div>
                ))}
                <Button
                  onClick={e => handleChoose(e, result.equip_numero)}
                  className="mt-4 font-medium bg-sky-600 dark:text-sky-500 hover:bg-sky-500 "
                >
                  Choose
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div>Total {totalResults} infrastructures sportives</div>
      </div>

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column: PlaygroundColumn) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                {columns.map((column: PlaygroundColumn) => (
                  <TableCell key={column.key} >
                    {column.render ? column.render(result) : result[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                Total {totalResults} infrastructures sportives
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}