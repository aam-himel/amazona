import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useDocumentTitle, useHomeApplianceProducts, useScrollTop } from 'hooks';
import bannerImg from "images/home_appliance.png"
import React from 'react';

const HomeAppliance = () => {
  useDocumentTitle('Home Appliance | Amazona');
  useScrollTop();

  const {
    homeApplianceProducts,
    fetchHomeApplianceProducts,
    isLoading,
    error
  } = useHomeApplianceProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Home Appliance</h1>
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
                action={fetchHomeApplianceProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={homeApplianceProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeAppliance;
