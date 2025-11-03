import { useSelector } from 'react-redux';
import plantumlEncoder from 'plantuml-encoder';
import styles from './Uml.module.scss';

export const Uml = () => {
  const umlCode = useSelector((state: any) => state.repo.umlCode);

  // Add validation to prevent rendering with empty/undefined umlCode
  if (!umlCode || umlCode.trim().length === 0) {
    return (
      <div className={styles.container}>
        <h3>UML</h3>
        <div className={styles.uml} >
            <p>載入中或無 UML 資料..</p>
        </div>
      </div>
    );
  }

  const umlWithCustomStyles = umlCode.includes('skinparam')
    ? umlCode
    : umlCode.replace('@startuml', `@startuml
skinparam backgroundColor transparent
skinparam classBackgroundColor #343a52
skinparam classBorderColor #5c7bff
skinparam ArrowColor #5c7bff
skinparam ArrowThickness 2
skinparam classAttributeFontColor #c9d3ee
skinparam classFontColor #f5f7fb
skinparam stereotypeFontColor #9aa3c7
skinparam ArrowFontColor #ffffff
skinparam ArrowFontSize 12
skinparam nodesep 20
skinparam ranksep 30`);

  // Encode the UML code and generate image URL
  const encoded = plantumlEncoder.encode(umlWithCustomStyles);
  const imageUrl = `https://www.plantuml.com/plantuml/svg/${encoded}`;

  return (
    <div className={styles.container}>
      <h3>UML</h3>
      <div className={styles.uml} >
        <img src={imageUrl} alt="UML Diagram"/>
        </div>
    </div>
  );
};