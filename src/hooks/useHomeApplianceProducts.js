import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const useHomeApplianceProducts = (itemsCount) => {
  const [homeApplianceProducts, setHomeApplianceProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchHomeApplianceProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getHomeApplianceProducts(itemsCount)
      console.log(docs);
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
          setHomeApplianceProducts(items);
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
    if (homeApplianceProducts.length === 0 && didMount) {
      fetchHomeApplianceProducts();
    }
  }, []);

  return {
    homeApplianceProducts, fetchHomeApplianceProducts, isLoading, error
  };
};

export default useHomeApplianceProducts;
