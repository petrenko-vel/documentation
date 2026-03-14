import { useParams } from 'react-router-dom';
import { docsContent } from '../../data/docsData';  // импорт данных
import NotDefind from '@/pages/NotDefind/NotDefind';


export default function TempaleDocsInstrument() {
    
    const { page } = useParams(); // Получаем значение из URL (например, 'interface-setup')
    const content = docsContent[page];
    if (!content) { return <NotDefind /> }

    return (
        <main>
            <article className="docs-content">

                <header className="docs-content__header">
                    <h1 className="docs-content__title">{content.title}</h1>
                    <p className="docs-content__subtitle">{content.desc}</p>
                </header>

                <div className="docs-content__learning docs-learning">
                    <h2 className="docs-learning__title">Вы научитесь</h2>
                    <ul className="docs-learning__list">
                        {content.list.map((item, index) => {
                            <li key={index} className="docs-learning__item">
                                {item}
                            </li>
                        })}
                        
                    </ul>
                </div>
               
                <div className="docs-content__wrapper">
                    внутрянка
                </div>
            </article>
        </main>
    )
}