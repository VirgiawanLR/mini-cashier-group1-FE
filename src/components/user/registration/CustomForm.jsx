import React from "react";
import { useField } from "formik";

function CustomForm({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      <div className="relative">
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? " placeholder:text-sm text-sm placeholder-red-400 bg-red-50 border-2" +
                " border-red-500 text-red-900 h-10 my-8 tracking-[0.13rem]" +
                " sm:text-sm rounded-full shadow-xl focus:ring-red-600 focus:border-red-600 block w-full" +
                " px-5 placeholder:tracking-[0.13rem] tracking-[0.13rem]"
              : " placeholder:text-sm text-sm bg-gray-50 border border-gray-300 text-dark" +
                " sm:text-sm rounded-full shadow-xl h-10 my-8 tracking-[0.13rem]" +
                " focus:ring-light focus:border-light block w-full px-5" +
                " placeholder:tracking-[0.13rem] tracking-[0.13rem]"
          }
        />
      </div>
      {meta.touched && meta.error && (
        <div className="absolute tracking-wider text-red-600 text-xs left-5 top-10 pt-1 font-normal">
          {meta.error}
        </div>
      )}
    </div>
  );
}

export default CustomForm;
