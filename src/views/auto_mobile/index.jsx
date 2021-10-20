import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useAutoMobileProducts, useDocumentTitle, useFeaturedProducts, useScrollTop } from 'hooks';
import useHomeApplianceProducts from 'hooks/useHomeApplianceProducts';
import bannerImg from 'images/banner-guy.png';
import React from 'react';

const AutoMobile = () => {
  useDocumentTitle('Featured Products | Salinaka');
  useScrollTop();

  const {
    autoMobileProducts,
    fetchAutoMobileProducts,
    isLoading,
    error
  } = useAutoMobileProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>autoMobileProducts</h1>
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
                action={fetchAutoMobileProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={autoMobileProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AutoMobile;
