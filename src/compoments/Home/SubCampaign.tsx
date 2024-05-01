import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Table } from '../common/Table';
import { Box, Stack } from '@mui/material';
import { SubCampaignData } from './Home';

interface SubCampaignProps {
  data: SubCampaignData;
}

export const SubCampaign = (props: SubCampaignProps) => {
  const { data = [] } = props;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Tên chiến dịch con', width: 300 },
    {
      field: 'status',
      headerName: 'Trạng thái hoạt động',
      width: 220,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? 'Đang hoạt động' : 'Không hoạt động',
    },
    {
      field: 'ads',
      headerName: 'Các quảng cáo',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.value?.map((i: any) => (
              <Stack key={i.name} direction='row' sx={{ my: 1 }}>
                <Box sx={{ mr: 0.5 }}>-</Box>
                <Box>
                  <Box>Tên: {i.name}</Box>
                  <Box>Số lượng: {i.quantity}</Box>
                </Box>
              </Stack>
            ))}
          </Box>
        );
      },
    },
  ];

  return <Table columns={columns} data={data} getRowHeight={() => 'auto'} />;
};
