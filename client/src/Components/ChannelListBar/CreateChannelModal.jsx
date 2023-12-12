import { useRef } from "react";
import PropTypes from "prop-types";
import { ChevronDown, X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { createChannel } from "../../features/selected/selectedSlice";

function CreateChannelModal({
  openCreateChannelModal,
  setOpenCreateChannelModal,
}) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "text",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Channel name is required.")
        .min(4, "Name must be at least 4 characters.")
        .max(16, "Name should not exceed 16 characters."),
      type: Yup.string().required("Channel type is required."),
    }),
    onSubmit: async (values) => {
      dispatch(createChannel(values));
    },
  });

  return (
    <div
      className={`absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-80 flex items-center justify-center ${
        openCreateChannelModal ? "block" : "hidden"
      }`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setOpenCreateChannelModal(false);
        }
      }}>
      <div
        ref={modalRef}
        className="w-[448px] bg-pearl-200 dark:bg-neutral-800 rounded-md">
        <div className="relative">
          <h5 className="text-2xl font-semibold p-4 text-neutral-900 dark:text-pearl-100">
            Create Channel
          </h5>
          <div
            className="absolute right-4 top-4 text-neutral-400 cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-100"
            onClick={() => setOpenCreateChannelModal(false)}>
            <X strokeWidth={2} size={26} />
          </div>
          <div className="px-4 pb-6">
            <form
              className="mt-5 flex flex-col gap-4"
              onSubmit={formik.handleSubmit}>
              <div className="flex flex-col ">
                <label
                  htmlFor="name"
                  className="mb-2 text-shadow-600 dark:text-gray-400 font-semibold text-xs uppercase">
                  Channel Name
                </label>
                <input
                  className="w-full rounded border-none p-2 h-10 bg-pearl-600 dark:bg-shadow-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none"
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="mt-1 ml-1 text-red-400 text-xs">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col relative">
                <label
                  htmlFor="type"
                  className="mb-2 text-shadow-600 dark:text-gray-400 font-semibold text-xs uppercase">
                  Channel Type
                </label>
                <select
                  className="w-full rounded border-none p-2 h-10 bg-pearl-600 dark:bg-shadow-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none appearance-none cursor-pointer"
                  id="type"
                  name="type"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  {...formik.getFieldProps("type")}>
                  <option className="py-2" value="text">
                    Text
                  </option>
                  <option className="py-2" value="audio">
                    Voice
                  </option>
                  <option className="py-2" value="video">
                    Video
                  </option>
                </select>
                <div className="h-full absolute right-0 flex items-end p-2 text-neutral-900 dark:text-pearl-300">
                  <ChevronDown />
                </div>
                {formik.touched.type && formik.errors.type ? (
                  <div className="mt-1 ml-1 text-red-400 text-xs">
                    {formik.errors.type}
                  </div>
                ) : null}
              </div>

              <Button
                className="mt-5 w-full capitalize text-sm font-medium"
                color="indigo"
                type="submit">
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateChannelModal.propTypes = {
  openCreateChannelModal: PropTypes.bool.isRequired,
  setOpenCreateChannelModal: PropTypes.func.isRequired,
};

export default CreateChannelModal;
