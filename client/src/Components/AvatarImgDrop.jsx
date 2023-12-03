import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { Camera } from "lucide-react";

function AvatarImgDrop({ onDropzoneValue }) {
  const [files, setFiles] = useState([]);

// dropzone style //
const baseStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderWidth: 3,
  borderRadius: 50,
  borderColor: files.length===0?"rgb(113 113 122)":"transparent",
  borderStyle: "dashed",
  color: "#090909",
  cursor: "pointer",
  height: "80px",
  width: "80px",
};

const focusedStyle = {
  borderColor: files.length===0?"#2196f3":"transparent",
};

const acceptStyle = {
  borderColor: files.length===0?"#00e676":"transparent",
};

const rejectStyle = {
  borderColor: files.length===0?"#ff1744":"transparent",
};

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
      onDrop: (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles(newFiles);
        onDropzoneValue(newFiles[0]);
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-20 h-20 relative">
      {files.map((file) => (
        <div className="absolute z-0" key={file.name}>
          <img
            className="w-20 h-20 p-[2px] object-cover rounded-full"
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </div>
      ))}
      <div {...getRootProps({ className: "dropzone", style })} className="relative z-50">
        <input {...getInputProps()}  />
        <div className={`h-full w-full flex flex-col items-center justify-center ${files.length===0?"visible":"text-transparent"}`}>
          <Camera />
          <p className="font-bold text-sm">Upload</p>
        </div>
      </div>
    </div>
  );
}

AvatarImgDrop.propTypes = {
  onDropzoneValue: PropTypes.func.isRequired,
};

export default AvatarImgDrop;
