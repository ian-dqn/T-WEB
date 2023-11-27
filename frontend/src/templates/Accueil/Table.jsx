import React ,{ useState,useEffect }  from 'react'
import '../../asset/css/Accueil.css'
import axios from 'axios';

function Table() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const myData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles');
       
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
      articles.map(article=>(
        <tr>
        <th scope="row" key={article}>1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      )
   
      )
    }
 

  </tbody>
</table>
    </div>
  )
}

export default Table
