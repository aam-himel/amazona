import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const useAutoMobileProducts = (itemsCount) => {
  const [autoMobileProducts, setAutoMobileProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchAutoMobileProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getAutoMobileProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No featured products found.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setAutoMobileProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch featured products');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (autoMobileProducts.length === 0 && didMount) {
      fetchAutoMobileProducts();
    }
  }, []);

  return {
    fetchAutoMobileProducts, autoMobileProducts, isLoading, error
  };
};

export default useAutoMobileProducts;
