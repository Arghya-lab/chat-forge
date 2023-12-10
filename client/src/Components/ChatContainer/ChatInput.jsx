import { useFormik } from "formik";
import * as Yup from "yup";
import { Laugh, PlusCircle, SendHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios, { authHeader } from "../../utils/axios";

function ChatInput() {
  const dispatch = useDispatch();
  const { selectedChannel } = useSelector((state) => state.selected);

  const formik = useFormik({
    initialValues: {
      textContent: "",
    },
    validationSchema: Yup.object({
      textContent: Yup.string()
        .trim()
        .required()
        .min(1)
        .max(280, "Can't send more than 280 characters"),
    }),
    onSubmit: async (values) => {
      // dispatch(sendSocketMessage(values.textContent))
      const res = await axios.post(
        `/message/${selectedChannel?.id}`,
        {
          content: values.textContent,
        },
        authHeader
      );
      console.log(res.data);

      formik.resetForm();
    },
  });

  return (
    <form
      className="mx-4 mb-6 bg-pearl-300 dark:bg-gray-800 rounded-lg flex items-center gap-1"
      onSubmit={formik.handleSubmit}>
      <div className="p-2 ml-2 cursor-pointer text-gray-700 dark:text-neutral-400 hover:text-shadow-800 dark:hover:text-pearl-900">
        <PlusCircle />
      </div>
      <input
        className="flex-1 bg-pearl-300 dark:bg-gray-800 rounded-lg border-none py-2 h-11 text-shadow-200 dark:text-pearl-50 focus:outline-none"
        id="textContent"
        name="textContent"
        maxLength={280}
        minLength={1}
        autoComplete="off"
        placeholder="Message #  | Gamers zone"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.textContent}
        {...formik.getFieldProps("textContent")}
      />
      <div className="p-2 cursor-pointer text-gray-700 dark:text-neutral-400 hover:text-yellow-900 dark:hover:text-orange-600">
        <Laugh />
      </div>
      <button
        type="submit"
        className="p-2 mr-2 text-gray-700 dark:text-neutral-400 hover:text-teal-700 dark:hover:text-green-600">
        <SendHorizontal />
      </button>
    </form>
  );
}

export default ChatInput;
