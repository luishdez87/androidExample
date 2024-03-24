import {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {url} from '../utils/constants';
import {Person} from '../models/person';

export const usePeople = (page: number) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPeople = (currentPage: number, cancelToken: any) => {
    setPeople([]);
    axios({
      method: 'GET',
      url: `${url}/people`,
      params: {page: currentPage},
      cancelToken: new axios.CancelToken(c => (cancelToken = c)),
    })
      .then(data => {
        setPeople([...new Set([...data.data])]);
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    let cancel: any;
    axios({
      method: 'GET',
      url: `${url}/people`,
      params: {page: page},
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
      .then(data => {
        setPeople(prev => {
          return [...new Set([...prev, ...data.data])];
        });
      })
      .catch(e => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filteredPeople = useMemo(() => {
    if (query.length === 0) {
      return people;
    }
    return people.filter(person => person.name.includes(query));
  }, [query, people]);

  return {
    people: filteredPeople,
    query,
    setQuery,
    getPeople,
  };
};
