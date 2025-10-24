import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/stores/store';
import styles from './FileTree.module.css';

export const FileTree: React.FC = () => {
  const fileStructure = useSelector((state: RootState) => state.repo.fileStructure);

  const buildTreeFromPaths = (paths: string[]): any => {
    const tree: any = {};
    
    paths.forEach(path => {
      const parts = path.split('/');
      let current = tree;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        if (i === parts.length - 1) {
          // 這是檔案
          current[part] = part;
        } else {
          // 這是資料夾
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }
      }
    });
    
    return tree;
  };

  const generateTreeText = (structure: any, prefix = '', isLast = true): string => {
    let result = '';
    
    if (typeof structure === 'string') {
      return prefix + (isLast ? '└── ' : '├── ') + structure + '\n';
    }

    const entries = Object.entries(structure);
    entries.forEach(([key, value], index) => {
      const isLastEntry = index === entries.length - 1;
      
      if (typeof value === 'string') {
        // 這是檔案
        result += prefix + (isLastEntry ? '└── ' : '├── ') + key + '\n';
      } else {
        // 這是資料夾
        result += prefix + (isLastEntry ? '└── ' : '├── ') + key + '/\n';
        const newPrefix = prefix + (isLastEntry ? '    ' : '│   ');
        result += generateTreeText(value, newPrefix, isLastEntry);
      }
    });

    return result;
  };

  if (!fileStructure) {
    return (
      <div className={styles.title}>
        <h3>檔案樹</h3>
        <div className={styles.container}>
          載入中...
        </div>
      </div>
    );
  }

  // 解析字串格式的檔案結構
  const paths = fileStructure.split('\n').filter(path => path.trim() !== '');
  const treeStructure = buildTreeFromPaths(paths);
  const treeText = generateTreeText(treeStructure);

  return (
    <div className={styles.title}>
      {/* <h3>檔案樹</h3> */}
      <div className={styles.container}>
        <pre className={styles.treeText}>{treeText}</pre>
      </div>
    </div>
  );
};
