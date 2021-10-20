import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useDocumentTitle, useOfficeEquipmentProducts, useScrollTop } from 'hooks';
import bannerImg from 'images/banner-guy.png';
import React from 'react';

const OfficeEquipment = () => {
  useDocumentTitle('Featured Products | Amazona');
  useScrollTop();

  const {
    officeEquipmentProducts,
    fetchOfficeEquipmentProducts,
    isLoading,
    error
  } = useOfficeEquipmentProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Office Equipment</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchOfficeEquipmentProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={officeEquipmentProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OfficeEquipment;
