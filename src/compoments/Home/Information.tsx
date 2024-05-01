import { GridColDef } from '@mui/x-data-grid';
import { Table } from '../common/Table';
import { InformationData } from './Home';

interface InformationProps {
  data: InformationData;
}

export const Information = (props: InformationProps) => {
  const { data = [] } = props;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Tên chiến dịch', width: 300 },
    { field: 'describe', headerName: 'Mô tả', flex: 1 },
  ];

  return <Table columns={columns} data={data} />;
};
