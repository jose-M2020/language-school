import { useEffect, useRef, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000/api';

const useAxios = ({url, method, ...params}, executeOnMount = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  
  const execute = async (payload) => {
    try {
      setLoading(true);
      
      const response = await axios.request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url
      });

      setData(response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(executeOnMount) execute(params.payload);
  }, []);

  return { cancel, data, error, loading, execute };
};

export default useAxios;
