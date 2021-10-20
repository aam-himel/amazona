import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const useWardrobeProducts = (itemsCount) => {
  const [wardrobeProducts, setWardrobeProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchWardrobeProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getWardrobeProducts(itemsCount);

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
          setWardrobeProducts(items);
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
    if (wardrobeProducts.length === 0 && didMount) {
      fetchWardrobeProducts();
    }
  }, []);

  return {
    fetchWardrobeProducts, wardrobeProducts, isLoading, error
  };
};

export default useWardrobeProducts;
