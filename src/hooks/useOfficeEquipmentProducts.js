import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const useOfficeEquipmentProducts = (itemsCount) => {
  const [officeEquipmentProducts, setOfficeEquipmentProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchOfficeEquipmentProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getOfficeEquipmentProducts(itemsCount);

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
          setOfficeEquipmentProducts(items);
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
    if (officeEquipmentProducts.length === 0 && didMount) {
      fetchOfficeEquipmentProducts();
    }
  }, []);

  return {
    officeEquipmentProducts, fetchOfficeEquipmentProducts, isLoading, error
  };
};

export default useOfficeEquipmentProducts;
