import { useEffect, useRef, useReducer } from 'react';

/**
 * 
 * @param url 
 * @returns state
 * 
 * {
    status: 'idle' | 'fetching' | 'fetched' | 'error',
    error: error | null,
    linkHeaders: null | urls,
    data: [] [array contents
  };
 */
export const useFetch = (url: string) => {
  const cache: any = useRef({});

  interface stateType {
    status: string;
    error: null | any;
    linkHeaders: null | string; // linkHeaders for pagination purpose
    data: any[];
  }

  interface actionType {
    type: 'FETCHING' | 'FETCHED' | 'FETCH_ERROR';
    payload?: any;
    linkHeaders?: any;
  }

  const initialState = {
    status: 'idle',
    error: null,
    linkHeaders: null,
    data: []
  };

  const [state, dispatch] = useReducer((state: stateType, action: actionType) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return {
          ...initialState,
          status: 'fetched',
          data: action.payload,
          linkHeaders: action.linkHeaders
        };
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const linkHeaders = cache.current[`${url}-linkHeaders`];
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data, linkHeaders: linkHeaders });
      } else {
        try {
          const response = await fetch(url);
          const linkHeaders = await response.headers.get('Link');
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: 'FETCHED', payload: data, linkHeaders: linkHeaders });
        } catch (error: any) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};
