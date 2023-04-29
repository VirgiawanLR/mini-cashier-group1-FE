import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import ProductDropdown from "./ProductDropdown";
import { createNewProduct } from "../../features/products/productSlice";

function PopUpNewProduct(props) {
  const dispatch = useDispatch();
  const { togglePopup } = props;
  const categoryList = useSelector((state) => state.product.categoryList);

  const createProductSchema = Yup.object().shape({
    productName: Yup.string().required("must not be blank"),
    productCategory: Yup.string().required("must not be blank"),
    productPrice: Yup.number()
      .typeError("must be numbers")
      .required("must not be blank")
      .test(
        "test",
        "must be at least 3 digits",
        (val) => val === undefined || val.toString().length >= 3
      ),
    productQuantity: Yup.number()
      .typeError("must be a number")
      .required("must not be blank"),
    productDesc: Yup.string().required("must not be blank"),
  });

  const onSubmit = async (values, action) => {
    // console.log(values);
    let createHandler = document.querySelector("#createProduct");
    createHandler.disabled = true;
    const {
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productDesc,
    } = values;
    let newProductData = {
      product_name: productName,
      category_ID: parseInt(productCategory),
      product_price: parseInt(productPrice),
      product_quantity: parseInt(productQuantity),
      product_description: productDesc,
    };
    await dispatch(createNewProduct(newProductData));
    createHandler.disabled = false;
  };

  return (
    <div>
      {/* master div */}
      <div className="relative">
        {/* title & close button */}
        <div className="flex gap-2">
          <p
            className="
          font-semibold text-xl text-dark
          "
          >
            Create new product
          </p>

          <button
            className="
          bg-red
          text-white font-bold
          rounded-full
          w-10 h-10
          shadow-lg
          hover:scale-105
          transition ease-in-out delay-50
          "
            onClick={togglePopup}
          >
            x
          </button>
        </div>
        {/* form & upload     */}
        <div>
          <Formik
            initialValues={{
              productName: "",
              productCategory: "",
              productPrice: "",
              productQuantity: "",
              productDesc: "",
            }}
            validationSchema={createProductSchema}
            onSubmit={onSubmit}
          >
            {(props) => {
              return (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Product Name
                    </p>
                    <ProductForm
                      name="productName"
                      type="text"
                      id="productName"
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <p>Product Category</p>
                    <ProductDropdown
                      name="productCategory"
                      type="text"
                      id="productCategory"
                      placeholder="category"
                      options={categoryList}
                    />
                  </div>
                  <div>
                    <p>Product Price</p>
                    <ProductForm
                      name="productPrice"
                      type="text"
                      id="productPrice"
                      placeholder="price"
                    />
                  </div>
                  <div>
                    <p>Product Quantity</p>
                    <ProductForm
                      name="productQuantity"
                      type="text"
                      id="productQuantity"
                      placeholder="quantity"
                    />
                  </div>
                  <div>
                    <p>Description</p>
                    <ProductForm
                      name="productDesc"
                      type="text"
                      id="productDesc"
                      placeholder="description"
                    />
                  </div>

                  <button
                    type="submit"
                    id="createProduct"
                    className="w-full mx-auto shadow-dark 
                          shadow-lg text-white 
                          bg-secondary hover:bg-tertiary
                          focus:ring-4 focus:outline-none focus:ring-secondary 
                          font-bold rounded-full text-base px-5 h-10 
                          text-center tracking-[0.18rem]
                          transition ease-in-out duration-200
                           disabled:hover:bg-secondary disabled:hover:cursor-wait"
                    //    onClick={() => {
                    //     togglePopup();

                    //   }}
                  >
                    CREATE PRODUCT
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
        {/* create button */}
        {/* <div>
          <button
            className="bg-tertiary"
            onClick={() => {
              togglePopup();
              alert("New product has been created");
            }}
          >
            CREATE PRODUCT
          </button>
        </div> */}

        {/* master div end*/}
      </div>
    </div>
  );
}

export default PopUpNewProduct;
