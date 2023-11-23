/*eslint-disable react/prop-types */

const MoreModal = ({ setOpen }) => {
  return (
    <>
      <div
        className="fixed inset-0 flex items-end justify-start bg-slate-600 bg-opacity-10 w-full h-full top-[-50%]"
        onClick={setOpen}
      >
        <div className="w-[200px] h-[200px] bg-slate-300 mb-9 ml-9 rounded-md flex flex-col justify-center items-center ">
          <div className="flex flex-row justify-center items-center cursor-pointer">
            <h4 className="text-sm">Logout</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreModal;
