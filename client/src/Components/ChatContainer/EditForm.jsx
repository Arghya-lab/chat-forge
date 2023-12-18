import { Laugh } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { removeEditingMessage } from "../../features/selected/selectedSlice";
import { editMessage } from "../../features/message/messageSlice";

function EditForm() {
  const dispatch = useDispatch();
  const { editingMessage } = useSelector((state) => state.selected);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      formik.handleSubmit();
    } else if (event.key === "Escape") {
      event.preventDefault();
      
      dispatch(removeEditingMessage());
    }
  };

  const formik = useFormik({
    initialValues: {
      content: editingMessage?.content,
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .trim()
        .required()
        .min(1)
        .max(280, "Can't send more than 280 characters"),
    }),
    onSubmit: (values) => {
      dispatch(editMessage(values)).then(()=>dispatch(removeEditingMessage()));
    },
  });

  return (
    <div className="flex flex-col">
      <form
        className="w-[calc(100vw-72px-23.5rem)] bg-pearl-300 dark:bg-gray-800 rounded-lg flex items-center gap-1"
        // onSubmit={formik.handleSubmit}
      >
        <input
          className="flex-1 px-4 bg-pearl-300 dark:bg-gray-800 rounded-lg border-none py-2 h-11 text-shadow-200 dark:text-pearl-50 focus:outline-none"
          id="content"
          name="content"
          maxLength={280}
          minLength={1}
          autoComplete="off"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.content}
          onKeyDown={handleKeyDown}
          {...formik.getFieldProps("content")}
        />
        <div className="p-2 cursor-pointer text-gray-700 dark:text-neutral-400 hover:text-yellow-900 dark:hover:text-orange-600">
          <Laugh />
        </div>
      </form>
      <div>
        <p className="text-sm font-light font-serif py-1 text-shadow-200 dark:text-pearl-50">
          escape to <span className="text-blue-500">cancel</span> • enter to{" "}
          <span className="text-blue-500">save</span>
        </p>
      </div>
    </div>
  );
}

export default EditForm;
