import { useEffect, useState } from "react";
import axios from 'axios'
const useFetch = (url)=>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            try {
                const res = await axios.get(url);
                setData(res.data)
            } catch (error) {
                setError(error)
            }
            setLoading(loading)
        };
        fetchData();
    },[url] );

    const reFetch = async ()=>{
        setLoading(true)
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(loading)
    };
    return {data,error,loading,reFetch}
}
export default useFetch