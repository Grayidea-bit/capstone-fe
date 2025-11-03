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

  const umlWithTransparentBg = umlCode.includes('skinparam')
    ? umlCode
    : umlCode.replace('@startuml', '@startuml\nskinparam backgroundColor transparent');

  // Encode the UML code and generate image URL
  const encoded = plantumlEncoder.encode(umlWithTransparentBg);
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