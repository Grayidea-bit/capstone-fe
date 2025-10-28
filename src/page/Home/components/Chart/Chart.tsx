
import type { item } from '@/utils/type';

interface ChartProps {
  itemList: item[];
}

export const Chart = ({ itemList }: ChartProps) => {
    return (
        <div>
            <h2>Chart Component</h2>
            <ul>
                {itemList.map((item, index) => (
                    <li key={index}>
                        {item.name}: {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};