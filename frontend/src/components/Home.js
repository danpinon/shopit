import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productActions";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory ] = useState('')
  const [rating, setRating] = useState(0)

  const categories =[
    'Electronics',
    'Cameras',
    'Laptops',
    'Accesories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ]

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount
  if(keyword) {
    count = filteredProductsCount
  }

  return (
    <>
    {console.log('count',resPerPage)}
    {console.log('products count', productsCount)}
    {console.log('filtered products count', filteredProductsCount)}
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Products Online"} />

          <h1 id="products_heading">Latest Products</h1>
          {console.log(products)}
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipPropas={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5"/>



                    
                    <div>
                        <h4 className="mb-3">
                          Categories
                        </h4>

                        <ul className="pl-0">
                          {categories.map(category =>(
                            <li style={{cursor: 'pointer',
                                        listStyle: 'none'}}
                                        key={category}
                                        onClick={() => setCategory(category)}
                                        >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    <div>
                        <h4 className="mb-3">
                          Ratings
                        </h4>

                        <ul className="pl-0">
                          {[5,4,3,2,1].map(star =>(
                            <li style={{cursor: 'pointer',
                                        listStyle: 'none'}}
                                        key={star}
                                        onClick={() => setRating(star)}
                                        >
                              <div className="rating-outer">
                                <div className="rating-inner"
                                style={{width: `${star * 20}%`}}>
                                  {star}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      </div>
                  </div>

                  <div className="col-6 col-md-9">
                      <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product key={product._id} product={product} />
                        ))}
                      </div>
                  </div>
                </>
                  ) : (
                    <>
                      {products &&
                        products.map((product) => (
                          <Product key={product._id} product={product} />
                        ))}
                    </>
              )}
            </div>
          </section>

          {resPerPage < count && (
            <div class="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={4}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
