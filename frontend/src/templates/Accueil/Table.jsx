import React ,{ useState,useEffect }  from 'react'
import '../../asset/css/Accueil.css'
import axios from 'axios';
import useFetch from "../../hooks/useFetch";

function Table() {
  const {data, loading, error, reFetch} = useFetch('http://localhost:5000/api/cryptodata')
  console.log(data)
  return (
      <>
        {loading ? (
            'Loading...'
        ) : (
            <div>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Symbole</th>
                        <th scope="col">Prix</th>
                        <th scope="col">1h %</th>
                        <th scope="col">24h %</th>
                        <th scope="col">7j %</th>
                    </tr>
                    </thead>
                    <tbody>
              {data ? (
                  data.map((item, index) => (
                      <tr key={index}>
                          <td><i className="fa-regular fa-star me-5"></i><img src={item.image} width={30}/></td>
                          <td>{item.name}</td>
                          <td>{item.symbol}</td>
                          <td>{item.current_price} $</td>
                          <td>{(item.price_change_percentage_24h/24).toFixed(2)}</td>
                          <td>{item.price_change_percentage_24h.toFixed(2)}</td>
                          <td>{(item.price_change_percentage_24h *7).toFixed(2)}</td>

                      </tr>

                  ))
              ) : (
                  <td>No data available</td>
              )}
                    </tbody>
                </table>
            </div>
        )}
      </>
  );
}

export default Table
