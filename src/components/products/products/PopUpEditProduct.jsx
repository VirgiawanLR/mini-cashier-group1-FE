import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ProductEditForm from "./ProductEditForm";
import ProductDropdown from "./ProductDropdown";
import { editProduct } from "../../../features/products/productSlice";

function PopUpEditProduct(props) {
  const dispatch = useDispatch();
  const { togglePopupEdit, product } = props;
  const categoryList = useSelector((state) => state.product.categoryList);

  const editProductSchema = Yup.object().shape({
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
    let createHandler = document.querySelector("#editProduct");
    createHandler.disabled = true;
    const {
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productDesc,
      productID,
    } = values;
    let editedProductData = {
      product_name: productName,
      category_ID: parseInt(productCategory),
      product_price: parseInt(productPrice),
      product_quantity: parseInt(productQuantity),
      product_description: productDesc,
      product_ID: productID,
    };
    await dispatch(editProduct(editedProductData));
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
            Edit product
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
            onClick={togglePopupEdit}
          >
            x
          </button>
        </div>
        {/* form & upload     */}
        <div>
          <Formik
            initialValues={{
              productName: product.product_name,
              productCategory: product.product_category,
              productPrice: product.product_price,
              productQuantity: product.product_quantity,
              productDesc: product.product_description,
              productID: product.product_ID,
            }}
            validationSchema={editProductSchema}
            onSubmit={onSubmit}
          >
            {(props) => {
              return (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Product Name
                    </p>
                    <ProductEditForm
                      name="productName"
                      type="text"
                      id="productName"
                      placeholder="name"
                    />
                  </div>
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Product Category
                    </p>
                    <ProductDropdown
                      name="productCategory"
                      type="text"
                      id="productCategory"
                      placeholder="category"
                      options={categoryList}
                    />
                  </div>
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Product Price
                    </p>
                    <ProductEditForm
                      name="productPrice"
                      type="text"
                      id="productPrice"
                      placeholder="price"
                    />
                  </div>
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Product Quantity
                    </p>
                    <ProductEditForm
                      name="productQuantity"
                      type="text"
                      id="productQuantity"
                      placeholder="quantity"
                    />
                  </div>
                  <div>
                    <p className="pl-2 text-sm text-dark tracking-widest">
                      Description
                    </p>
                    <ProductEditForm
                      name="productDesc"
                      type="text"
                      id="productDesc"
                      placeholder="description"
                    />
                  </div>

                  <button
                    type="submit"
                    id="editProduct"
                    className="w-full mx-auto shadow-dark 
                          shadow-lg text-white 
                          bg-secondary hover:bg-tertiary
                          focus:ring-4 focus:outline-none focus:ring-secondary 
                          font-bold rounded-full text-base px-5 h-10 
                          text-center tracking-[0.18rem]
                          transition ease-in-out duration-200
                           disabled:hover:bg-secondary disabled:hover:cursor-wait"
                  >
                    EDIT PRODUCT
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
              togglePopupCreate();
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

export default PopUpEditProduct;
