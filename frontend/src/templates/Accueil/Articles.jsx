import React ,{ useState, useEffect }  from 'react'
// import '../../asset/css/Accueil.css'
import axios from 'axios'
import '../../style/ArticleStyle.css'

function DisplayArticle() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles');

        // console.log('after api call from back')
        // console.log(response)
       
        setArticles(response.data)
       
        setError(false)
      } catch (error) {
        console.log(error);
        setError(true)
      }

    }
    myData();
  }, [])

  if (!articles || !articles.items) {
    return <div>No data available</div>;
  }

    return (
      <div>
        {articles.items.map((item, index) => (
          <div className='article-box'>
            <h4>{item.title}</h4>
            <p>Description: {item.description}</p>
            <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
            <p>Published Date: {item.pubDate}</p>
            {/* <p>Categories: {item.categories.join(', ')}</p> */}
          </div>
        ))}
      </div>
    );
  };  

export default DisplayArticle

