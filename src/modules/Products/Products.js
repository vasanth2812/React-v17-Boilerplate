import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchProducts from '../../actions';
import SkeletonProduct from '../../shared/components/Skeleton/SkeletonProduct';
import ProductCard from '../../shared/components/ProductCard';
import Error from '../../shared/components/Errors';
import { errorMessage } from '../../constant.json';
import Filter from './Filter';
import helper from '../../shared/helper';
import { allproductsSelector } from '../../reducers/products';
import './Products.scss';

const Products = () => {
  const [products, setProducts] = useState([]);

  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).catch(() => {
      setErrors(true);
    });
  }, [dispatch]);

  const stateProductList = useSelector((state) => allproductsSelector(state));

  useEffect(() => {
    setProducts(stateProductList);
  }, [stateProductList]);

  const sort = (sortValue) => {
    const sortProducts = helper.sort(products, 'price', sortValue);
    setProducts(() => [...sortProducts]);
  };

  const productList = products.map((product) => {
    return (
      <div
        key={product.id}
        className="col-sm-12 col-md-4 col-lg-3 col-xs-3 mg-bottom-10"
      >
        <ProductCard data={product} />
      </div>
    );
  });

  const skeletonProductList = [...Array(20)].map((i) => (
    <div key={i} className="col-sm-12 col-md-4 col-lg-3 col-xs-3 mg-bottom-10">
      <SkeletonProduct />
    </div>
  ));

  return (
    <>
      <div className="section-container">
        {errors && <Error title={errorMessage} />}
        <>
          {!!products.length && (
            <div className="mg-top-20 mg-bottom-20">
              <Filter sort={sort} />
            </div>
          )}
        </>
        <div className="row">
          <>{products && products.length ? productList : skeletonProductList}</>
        </div>
      </div>
    </>
  );
};

export default Products;