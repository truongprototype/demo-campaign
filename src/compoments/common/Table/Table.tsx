import { DataGrid, GridColDef, DataGridProps } from '@mui/x-data-grid';

interface TableProps extends DataGridProps {
  columns: GridColDef[];
  data: any;
}

export function Table(props: TableProps) {
  const { columns, data, ...restProps } = props;
  return (
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      getRowId={(row) => row.name}
      {...restProps}
    />
  );
}
