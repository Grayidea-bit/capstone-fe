import type { RootState } from '@/stores/store';
import { contribute } from '@/utils/debtAPI';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { item } from '@/utils/type';
import { Chart } from '../../components';



export const Contribute = () => {
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const [chartList, setChartList] = useState<item[]>([]);

   useEffect(() => {
       const fetchData = async () => {
            setChartList([]);
           const data = await contribute();
            const cleanedData = Object.entries(data).map(([name, value]) => ({
                name,
                value: String(value ?? '')
            }));
            setChartList(cleanedData);
       };
       fetchData();
   }, [selectedRepo]);

   return (
    <div>
        <Chart itemList={chartList} />
    </div>
   );
}