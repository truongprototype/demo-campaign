import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetData = () =>
  useQuery({
    queryKey: 'getData',
    queryFn: () => {
      return axios.get('mockData.json').then((res) => res.data);
    },
    initialData: {},
    refetchOnWindowFocus: false,
  });
