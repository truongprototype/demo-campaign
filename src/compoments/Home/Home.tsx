import { Box, Tab, Tabs } from '@mui/material';
import { useGetData } from '../../queries/home';
import { useEffect, useState } from 'react';
import './Home.css';
import { TabPanel, a11yProps } from '../common/TabPanel';
import { Information } from './Information';
import { SubCampaign } from './SubCampaign';
import { InformationForm } from './InformationForm';
import { SubCampaignForm } from './SubCampaignForm';

export interface InformationData {
  id: string;
  name: string;
  describe?: string;
}

export interface SubCampaignData {
  id: string;
  name: string;
  status: boolean;
  ads: {
    id: string;
    name: string;
    quantity: number;
  }[];
}

export interface Data {
  campaign: {
    information: InformationData[];
    subCampaigne: SubCampaignData[];
  };
}

export const Home = () => {
  const { data: mockData, isFetching, isError } = useGetData();
  const [tabIndex, setTabIndex] = useState(0);
  let [information, setInformation] = useState<any>([]);
  let [subCampaigne, setSubCampaigne] = useState<any>([]);

  useEffect(() => {
    if (mockData.campaign) {
      setInformation([...mockData.campaign?.information, ...information]);
      setSubCampaigne([...mockData.campaign?.subCampaigne, ...subCampaigne]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockData]);

  const addInfoData = (data: InformationData) => {
    setInformation([...information, data]);
  };

  const addSubCampaigneData = (data: InformationData) => {
    setSubCampaigne([...subCampaigne, data]);
  };

  if (isFetching) return <Box className='container'>Loadding...</Box>;

  if (isError) return <Box className='container'>Something went wrong!</Box>;

  return (
    <Box className='container'>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          centered
        >
          <Tab label='Thông tin' {...a11yProps(0)} />
          <Tab label='Chiến dịch con' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box className='content'>
        <TabPanel value={tabIndex} index={0}>
          <Information data={information} />
          <InformationForm addInfoData={addInfoData} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <SubCampaign data={subCampaigne} />
          <SubCampaignForm addSubCampaigneData={addSubCampaigneData} />
        </TabPanel>
      </Box>
    </Box>
  );
};
