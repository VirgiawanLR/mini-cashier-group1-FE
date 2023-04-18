import React from "react";
import { useField } from "formik";

function CustomForm({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      <div className="relative" data-te-input-wrapper-init>
        <input
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? " placeholder:text-sm text-sm placeholder-red-400 bg-red-50 border-2" +
                " border-red-500 text-red-900 h-10 my-auto" +
                " sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full" +
                " p-2.5 dark:bg-gray-700 dark:border-2 dark:border-red-600 dark:placeholder-gray-400" +
                " dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" +
                " lg:placeholder:text-base lg:text-base"
              : " placeholder:text-sm text-sm bg-gray-50 border border-gray-300 text-gray-900" +
                " sm:text-sm rounded-lg h-10 my-auto" +
                " focus:ring-light focus:border-light block w-full p-2.5 dark:bg-gray-700" +
                " dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" +
                " dark:focus:ring-primary dark:focus:border-primary" +
                " lg:placeholder:text-base lg:text-base"
          }
        />
      </div>
      {meta.touched && meta.error && (
        <div className="absolute text-red-600 text-xs pt-1 font-normal">
          {meta.error}
        </div>
      )}
    </div>
  );
}

export default CustomForm;
