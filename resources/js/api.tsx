export const fetchFacilitiesWithFilters = async (
  filters: any,
  pagination: any,
) => {
  try {
    const baseUrl =
      'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records';

    // Construire la liste des paramètres de requête
    const queryParams =
      Object.entries(filters)
        .filter(([_, value]) => !!value)
        .map(([key, value]) => `search(${key},"${value}")`)
        .join(' and ') || null;

    const paginationParams = `limit=${pagination.limit}&offset=${pagination.offset}`;

    const apiUrl = `${baseUrl}?${paginationParams}&where=${encodeURIComponent(
      queryParams || '',
    )}`;

    console.log('API URL:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch filter options');
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching filter options: ', error);
    throw error;
  }
};
