import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const usePhoneProducts = (itemsCount) => {
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchPhoneProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getPhoneProducts(itemsCount);

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
          setPhoneProducts(items);
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
    if (phoneProducts.length === 0 && didMount) {
      fetchPhoneProducts();
    }
  }, []);

  return {
    fetchPhoneProducts, phoneProducts, isLoading, error
  };
};

export default usePhoneProducts;
