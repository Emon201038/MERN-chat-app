import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { useGetFriendsRequestQuery } from "../../features/friends/friendsApi";
import useDebounce from "../../Hooks/useDebounce";
import { CircularProgress, Stack } from "@mui/material";

/*eslint-disable react/prop-types*/
const FriendRequests = () => {
  const [inputValue, setInputValue] = useState("");
  const [requests, setRequests] = useState([]);
  const debouncedValue = useDebounce(inputValue, 1000);

  const { data, isLoading, isError, error } =
    useGetFriendsRequestQuery(debouncedValue);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleAccept = () => {
    // socket?.emit("accept_request", {
    //   sender: senderId,
    //   recipient: userId,
    //   request_id: reqId,
    // });
  };

  useEffect(() => {
    setRequests(data?.payload?.requests);
  }, [data]);

  let content = null;

  if (isLoading) {
    content = (
      <Stack width="100%" justifyContent="center" alignItems="center">
        <CircularProgress sx={{ width: "20px", height: "20px" }} />
      </Stack>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">{error}</div>
    );
  }
  if (!isLoading && !isError && requests?.length === 0) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">
        No request found
      </div>
    );
  }
  if (!isLoading && !isError && requests?.length > 0) {
    content = requests.map((req, index) => (
      <div
        key={index}
        className="h-[50px] w-full max-sm:w-[400px]  flex flex-col justify-center items-center p-2 bg-white"
      >
        <div className="container flex w-full justify-between px-3">
          <div className="flex gap-4 justify-start items-center ">
            <img
              src={req?.sender?.image}
              className="w-[30px] h-[30px] flex justify-center items-center rounded-full text-center"
              alt=""
            />
            <h2>
              {req?.sender?.firstName} {req?.sender?.lastName}
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleAccept(req?.sender._id, req?._id)}
              className="bg-blue-500 px-2 rounded-md text-white"
            >
              Accept
            </button>
            <button className="bg-slate-300 px-2 rounded-md text-black">
              delete
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <form onSubmit={handleSearch} className="px-5 w-full flex gap-5">
        <input
          type="text"
          className="w-10/12 h-[30px]  focus:outline-blue-500 border-none p-2 bg-slate-300 text text-sm rounded-md"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button
          type="submit"
          className="w-1/12 h-[30px] rounded-md flex justify-center items-center border-[1px] border-blue-300 bg-blue-200"
        >
          <div className="w-[20px] h-[20px]">
            <Search />
          </div>
        </button>
      </form>
      {content}
    </>
  );
};

export default FriendRequests;
