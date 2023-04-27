import React from "react";
import { useField } from "formik";

function ProductForm({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative flex flex-col">
      <>
        <label
          className="text-center text-dark tracking-[0.12rem]
          text-lg font-medium my-0"
        >
          {label}
        </label>
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? " placeholder:text-sm text-sm placeholder-red-400 bg-red-50 border-2" +
                " border-red-500 text-red-900 h-10 my-1 tracking-[0.13rem] shadow-dark" +
                " sm:text-sm rounded-full shadow-md focus:ring-red-600 focus:border-red-600 block w-full" +
                " px-5 placeholder:tracking-[0.13rem] tracking-[0.13rem]"
              : " placeholder:text-sm text-sm bg-gray-50 border border-gray-300 text-dark" +
                " sm:text-sm rounded-full shadow-md h-10 my-1 tracking-[0.13rem] shadow-dark" +
                " focus:ring-light focus:border-light block w-full px-5" +
                " placeholder:tracking-[0.13rem] tracking-[0.13rem]"
          }
        />
      </>
      {meta.touched && meta.error && (
        <div className="absolute tracking-wider text-red-600 text-xs left-5 top-11 pt-1 font-normal">
          {meta.error}
        </div>
      )}
    </div>
  );
}

export default ProductForm;
