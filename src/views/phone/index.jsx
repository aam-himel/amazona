import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useDocumentTitle, useScrollTop, usePhoneProducts } from 'hooks';
import bannerImg from 'images/banner-guy.png';
import React from 'react';

const Phone = () => {
  useDocumentTitle('Featured Products | Amazona');
  useScrollTop();

  const {
    phoneProducts,
    fetchPhoneeProducts,
    isLoading,
    error
  } = usePhoneProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Here your latest phone!</h1>
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
                action={fetchPhoneProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={phoneProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Phone;
