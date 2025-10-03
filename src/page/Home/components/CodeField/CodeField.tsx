import { useSelector } from "react-redux";
import styles from "./CodeField.module.css";
import { useEffect, useRef } from "react";

import { Diff2HtmlUI } from "diff2html/lib/ui/js/diff2html-ui-slim";
import { ColorSchemeType } from "diff2html/lib/types";
import "diff2html/bundles/css/diff2html.min.css";
import "highlight.js/styles/github-dark.css"; // 使用暗色主題

export const CodeField = () => {
  const diff = useSelector((state: any) => state.repo.diff || "載入中...");
  const diffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diffRef.current) {
      // 清空內容
      diffRef.current.innerHTML = "";
      // 初始化 Diff2HtmlUI
      const diff2htmlUi = new Diff2HtmlUI(diffRef.current, diff, {
        drawFileList: true,
        matching: "lines",
        outputFormat: "line-by-line",
        highlight: true,
        colorScheme: ColorSchemeType.DARK, // 使用暗色主題
        diffMaxChanges: 500,
      });
      diff2htmlUi.draw();
      diff2htmlUi.highlightCode();
    }
  }, [diff]);

  return (
    <div className={styles.container}>
      <h3>Code Diff一覽</h3>
      <div className={styles.codeArea}>
        <div
          className={styles.diffContainer}
          ref={diffRef} 
        />
      </div>
    </div>
  );
};
