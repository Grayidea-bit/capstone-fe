import ReactMarkdown from 'react-markdown';
import styles from './Overview.module.scss';
import type { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';

interface OverviewProps {
    alignment: string;
}

export const Overview = ({ alignment }: OverviewProps) => {

    if(alignment === 'repo') {
        const overview = useSelector((state: RootState) => state.repo.overview || "載入中...");

        return (
            <div className={styles.summary}>
                <h3>專案概述</h3>
                <div className={styles.textarea}>
                    <ReactMarkdown >{overview}</ReactMarkdown>
                </div>
            </div>
        );
    }

    const commitOverview = useSelector((state: RootState) => state.repo.commitOverview || "載入中...");

    return (
        <div className={styles.summary}>
            <h3>commit概述</h3>
            <div className={styles.textarea}>
                <ReactMarkdown >{commitOverview}</ReactMarkdown>
            </div>
        </div>
    );
}
