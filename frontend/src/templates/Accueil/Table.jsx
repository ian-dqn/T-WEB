import React ,{ useState,useEffect }  from 'react'
import '../../asset/css/Accueil.css'
import axios from 'axios';

function Table() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/articles');
       
        setArticles(response.data)
       
        setError(false)
      } catch (error) {
        console.log(error);
        setError(true)
      }

    }
    myData();
  }, [])
 
  return (
  
    <div>
  
      <table class="table bg-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {
      articles.items.map((item, index) => (
          <div>
            <tr>
        <th scope="row" key={item}>{item.title}</th>
        <td>{item.pubDate}</td>
        <td>{item.description}</td>
        <td>{item.categories.join(', ')}</td>
      </tr>

            {/* <h2>{item.title}</h2>
            <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
            <p>Published Date: {item.pubDate}</p>
            <p>Description: {item.description}</p>
            <p>Categories: {item.categories.join(', ')}</p> */}
          </div>
      )
   
      )
    }
 

  </tbody>
</table>
    </div>
  )
}

export default Table
