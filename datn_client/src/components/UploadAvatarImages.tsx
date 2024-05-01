function UploadAvatarImage() {
     return (
          <div
               className={` flex
          h-14
          w-14
          cursor-pointer
          items-center
          justify-center
          rounded-full border-2 border-dashed border-indigo-600`}
          >
               <strong className="text-sm text-indigo-600">Avatar</strong>
          </div>
     );
}

export default UploadAvatarImage;
