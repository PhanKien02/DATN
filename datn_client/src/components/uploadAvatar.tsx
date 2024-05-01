import { useDropzone } from "react-dropzone";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import SVGEditUploadCompanyImage from "../utils/icons/EditUploadCompanyImage";
import UploadAvatarImage from "./UploadAvatarImages";

type UploadContainerProps = {
     dragactive: string;
};

type UserImageUploaderProps = {
     defaultValue?: string;
     readonly?: boolean;
     uploadedImage: string | null;
     setUploadedImage: (imageUpload: string | null) => void;
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     setFileName: any;
};

const UploadImageContainer = tw.div<UploadContainerProps>`
    flex
    justify-center
    items-center
    h-16
    w-16
    rounded-full
    cursor-pointer
    ${(p) =>
         p.dragactive === "true"
              ? "bg-primaryPrimary100 bg-opacity-50"
              : "bg-none"}
`;

const UserAvatarUploader = ({
     defaultValue,
     setUploadedImage,
     uploadedImage,
     setFileName,
}: UserImageUploaderProps) => {
     const onDrop = (acceptedFiles: File[]) => {
          const file = acceptedFiles[0];
          const reader = new FileReader();

          reader.onload = () => {
               setUploadedImage(reader.result as string);
               setFileName(file.name);
          };
          reader.readAsDataURL(file);
     };

     const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: {
               "image/jpeg": [".png", ".jpg", ".jpeg"],
          },
     });
     const draggative = isDragActive ? "true" : "false";

     useEffect(() => {
          if (!defaultValue) {
               setUploadedImage(null);
          }
     }, [defaultValue, setUploadedImage]);

     return (
          <>
               <UploadImageContainer dragactive={draggative}>
                    <div {...getRootProps()}>
                         {uploadedImage ? (
                              <div className="relative">
                                   <img
                                        src={uploadedImage}
                                        alt="Uploaded Image"
                                        className="h-14 w-14 rounded-full object-cover"
                                   />
                              </div>
                         ) : (
                              <div className="relative">
                                   {defaultValue ? (
                                        <img
                                             src={`${defaultValue}`}
                                             alt="Uploaded avatar"
                                             className="h-14 w-14 rounded-full border-2 border-white object-cover"
                                        />
                                   ) : (
                                        <UploadAvatarImage />
                                   )}
                                   {defaultValue && (
                                        <div className="absolute -bottom-1 -right-1">
                                             <SVGEditUploadCompanyImage />
                                        </div>
                                   )}
                              </div>
                         )}
                         <input {...getInputProps()} />
                    </div>
               </UploadImageContainer>
          </>
     );
};
export default UserAvatarUploader;
