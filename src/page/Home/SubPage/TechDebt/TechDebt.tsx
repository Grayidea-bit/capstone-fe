import ReactMarkdown from 'react-markdown';

import { useEffect, useState } from "react";
import { checkDebt } from "@/utils/debtAPI";
import type { Debt } from "@/stores/slice/repoSlice";

import styles from './TechDebt.module.scss';

export const TechDebt = () => {
    const [debtData, setDebtData] = useState<Debt | null>(null);

    useEffect(() => {
        const fetchDebt = async () => {
            const res = await checkDebt();
            setDebtData(res);
            console.log("Fetched debt data:", res);
        };
        fetchDebt();
    }, []);

    return (
        <div className={styles.container}>
            <h3>技術債分析總結</h3>
            <ReactMarkdown>{debtData?.analysis}</ReactMarkdown>
        </div>
    );
}   