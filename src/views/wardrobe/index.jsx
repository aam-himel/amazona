import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useDocumentTitle, useOfficeEquipmentProducts, useScrollTop, useWardrobeProducts } from 'hooks';
import bannerImg from 'images/banner-guy.png';
import React from 'react';

const Wardrobe = () => {
  useDocumentTitle('Featured Products | Amazona');
  useScrollTop();

  const {
    wardrobeProducts,
    fetchWardrobeProducts,
    isLoading,
    error
  } = useWardrobeProducts();

  return (
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Wardrobe Products</h1>
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
                action={fetchWardrobeProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={wardrobeProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Wardrobe;
