import { Box, Button, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import { InformationData } from './Home';
import { generateUniqueId } from '../../helper/common';

interface Inputs {
  id: string;
  name: string;
  describe?: string;
}

interface InformationFormProps {
  addInfoData: (_: InformationData) => void;
}

export const InformationForm = ({ addInfoData }: InformationFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: InformationData) => {
    addInfoData({ ...data, id: generateUniqueId() });
    reset();
  };

  return (
    <Box sx={{ maxWidth: 800, width: '100%', margin: '24px auto 0' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.4}>
          <TextField
            {...register('name', { required: true })}
            label='Tên chiến dịch*'
            variant='standard'
            error={!!errors.name}
            helperText={
              errors.name?.type === 'required' && 'Hãy điền tên chiến dịch!'
            }
          />
          <TextField
            {...register('describe')}
            name='describe'
            label='Mô tả'
            variant='standard'
            multiline
            error={!!errors.describe}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{ alignSelf: 'center' }}
          >
            Thêm chiến dịch
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
