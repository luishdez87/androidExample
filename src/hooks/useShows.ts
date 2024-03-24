import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../utils/constants';
import {Show} from '../models/show';

export const useShows = (page: number) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getShows = (currentPage: number, cancelToken: any) => {
    // clean all searches
    setShows([]);
    axios({
      method: 'GET',
      url: `${url}/shows`,
      params: {page: currentPage},
      cancelToken: new axios.CancelToken(c => (cancelToken = c)),
    })
      .then(data => {
        setShows(prevShows => {
          return [...new Set([...prevShows, ...data.data])];
        });
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    let cancel: any;
    axios({
      method: 'GET',
      url: `${url}/shows`,
      params: {page: page},
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(data => {
        setShows(prevShows => {
          return [...new Set([...prevShows, ...data.data])];
        });
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    let cancel: any;
    if (query.length > 0) {
      setLoading(true);
      axios({
        method: 'GET',
        url: `${url}/search/shows`,
        params: {q: query},
        cancelToken: new axios.CancelToken(c => (cancel = c)),
      })
        .then(data => {
          const items = data.data.map((element: any) => element.show);
          setShows([...items]);
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          if (axios.isCancel(e)) return;
        });
      return () => cancel();
    }
  }, [query]);

  return {
    shows,
    query,
    setQuery,
    loading,
    getShows,
  };
};
