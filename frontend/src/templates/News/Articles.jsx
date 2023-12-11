import useFetch from "../../hooks/useFetch";
import moment from 'moment';
import '../../asset/css/ArticleStyle.css';

function DisplayArticle() {
    const { data, loading, error, reFetch } = useFetch('http://localhost:5000/api/articles');

    return (
        <>
            {loading ? (
                'Loading...'
            ) : (
                <div className="article-container">
                    <h1>Actualités</h1>
                    {data && data.items ? (
                        data.items.map((item, index) => (
                            <div className='article-box' key={index}>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <p>Lien: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
                                <p>Date de publication : {moment(item.pubDate).format('DD/MM/YYYY HH:m')}</p>
                                {/* <p>Categories: {item.categories.join(', ')}</p> */}
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            )}
        </>
    );
}

export default DisplayArticle;
