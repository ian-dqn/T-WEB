import useFetch from "../../hooks/useFetch";
import '../../asset/css/ArticleStyle.css';

function DisplayArticle() {
    const { data, loading, error, reFetch } = useFetch('http://localhost:5000/api/articles');

    return (
        <>
            {loading ? (
                'Loading...'
            ) : (
                <div>
                    {data && data.items ? (
                        data.items.map((item, index) => (
                            <div className='article-box' key={index}>
                                <h4>{item.title}</h4>
                                <p>Description: {item.description}</p>
                                <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
                                <p>Published Date: {item.pubDate}</p>
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
