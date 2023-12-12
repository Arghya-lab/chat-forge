import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import AvatarImgDrop from "../AvatarImgDrop";
import { createServer } from "../../features/servers/serversSlice";

function CreateServerModal({
  openCreateServerForm,
  setOpenCreateServerForm,
  setSelectedItem,
}) {
  const dispatch = useDispatch();
  const [serverAvatar, setServerAvatar] = useState(null);
  const [imgDropError, setImgDropError] = useState(false);

  const handleModalClose = () => {
    setOpenCreateServerForm(false);
    setSelectedItem("directMessage");
    formik.resetForm();
  };

  const handleDropzoneValue = (img) => {
    setServerAvatar(img);
    if (img.size > 1048576) {
      setImgDropError("File size should not exceed 1024kb");
    } else {
      setImgDropError(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Server name is required")
        .min(4, "Server name must be at least 4 characters")
        .max(20, "Server name should not exceed 20 characters"),
    }),
    onSubmit: async (values) => {
      if (!serverAvatar) return setImgDropError("Images not uploaded");

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("serverAvatar", serverAvatar);

      dispatch(createServer(formData));
      handleModalClose();
    },
  });

  return (
    <Dialog open={openCreateServerForm} size={"xs"}>
      <div className="relative">
        <h5 className="text-center text-2xl font-bold pt-5 pb-0 pl-3 pr-7 text-neutral-900">
          Create your server
        </h5>
        <div
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-800 cursor-pointer"
          onClick={handleModalClose}>
          <X strokeWidth={2.75} size={26} />
        </div>
      </div>
      <Typography className="text-neutral-600 text-sm font-medium px-8 pt-3 pb-5">
        Give your new server a personality with a name and an icon. You can
        always change it later.
      </Typography>
      <form className="mt-2" onSubmit={formik.handleSubmit}>
        <div className="px-4">
          <div className="flex items-center justify-center">
            <AvatarImgDrop onDropzoneValue={handleDropzoneValue} />
          </div>
          {imgDropError && (
            <p className="text-red-400 text-xs mb-4 mt-1 text-center">
              {imgDropError}
            </p>
          )}
          <label
            htmlFor="email"
            className="mb-2 text-neutral-700 font-semibold text-xs uppercase">
            Server Name
          </label>
          <input
            className="w-full rounded border-none p-2 h-10 bg-pearl-300 text-black focus:outline-none"
            id="name"
            name="name"
            type="name"
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
        <p className="text-xs px-4 text-neutral-700 mt-1">
          By creating a server, you agree to Community Guidelines.
        </p>
        <DialogFooter className="flex justify-between">
          <Button
            variant="text"
            color="gray"
            onClick={handleModalClose}
            className="mr-1">
            <span>Back</span>
          </Button>
          <Button variant="gradient" color="blue" type="submit">
            <span>Create</span>
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}

CreateServerModal.propTypes = {
  openCreateServerForm: PropTypes.bool.isRequired,
  setOpenCreateServerForm: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default CreateServerModal;
