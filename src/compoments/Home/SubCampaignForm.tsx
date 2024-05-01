import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { SubCampaignData } from './Home';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { generateUniqueId } from '../../helper/common';

interface Inputs {
  id: string;
  name: string;
  status: boolean;
  ads: {
    id: string;
    name: string;
    quantity: number;
  }[];
}

interface SubCampaignFormProps {
  addSubCampaigneData: (_: SubCampaignData) => void;
}
export const SubCampaignForm = ({
  addSubCampaigneData,
}: SubCampaignFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      ads: [{ quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ads',
    rules: {
      required: true,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data: SubCampaignData) => {
    addSubCampaigneData({ ...data, id: generateUniqueId() });
    reset();
  };

  return (
    <Box sx={{ maxWidth: 800, width: '100%', margin: '24px auto 0' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.4}>
          <TextField
            {...register('name', { required: true })}
            label='Tên chiến dịch con*'
            variant='standard'
            error={!!errors.name}
            helperText={
              errors.name?.type === 'required' && 'Hãy điền tên chiến dịch con!'
            }
          />
          <FormControlLabel
            {...register('status')}
            control={<Checkbox defaultChecked />}
            label='Đang hoạt động'
          />
          <Box sx={{ textAlign: 'left' }}>
            <span>Danh sách quảng cáo</span>
            <Button
              onClick={() =>
                append({ id: generateUniqueId(), name: '', quantity: 0 })
              }
              sx={{ ml: 2 }}
            >
              + Thêm
            </Button>
          </Box>

          <Box>
            {fields.map((field, index) => (
              <Stack key={field.id} direction='row' spacing={2} sx={{ mb: 2 }}>
                <TextField
                  {...register(`ads.${index}.name`, { required: true })}
                  label='Tên quảng cáo*'
                  variant='standard'
                  error={!!errors.ads?.[index]?.name}
                  helperText={
                    errors.ads?.[index]?.name?.type === 'required' &&
                    'Hãy điền tên quảng cáo!'
                  }
                  sx={{ flex: 1 }}
                />
                <TextField
                  {...register(`ads.${index}.quantity`, {
                    required: true,
                    min: 1,
                  })}
                  label='Số lượng*'
                  variant='standard'
                  type='number'
                  error={!!errors.ads?.[index]?.quantity}
                  helperText={
                    (errors.ads?.[index]?.quantity?.type === 'required' &&
                      'Hãy điền số lượng!') ||
                    (errors.ads?.[index]?.quantity?.type === 'min' &&
                      'Số lượng phải lớn hơn 0')
                  }
                />
                <IconButton
                  onClick={() => remove(index)}
                  sx={{ alignSelf: 'center' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}
            {errors.ads?.root?.type === 'required' && (
              <Alert severity='error'>
                Danh sách quảng cáo của một chiến dịch con phải lớn hơn 0.
              </Alert>
            )}
          </Box>
          <Button
            type='submit'
            variant='contained'
            sx={{ alignSelf: 'center' }}
          >
            Thêm chiến dịch con
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
