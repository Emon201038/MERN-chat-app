import { useEffect, useRef, useState } from "react";
import { useGetFriendsQuery } from "../../features/friends/friendsApi";
import useDebounce from "../../Hooks/useDebounce";
import { ModeCommentOutlined, Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

/*eslint-disable react/prop-types*/
const Friends = () => {
  const [inputValue, setInputValue] = useState("");
  const [friends, setFriends] = useState([]);
  const search = useRef("");

  const debouncedValue = useDebounce(inputValue, 1000);

  const { isLoading, data, isError, error } =
    useGetFriendsQuery(debouncedValue);

  const handleSearch = (e) => {
    e.preventDefault();
    setInputValue(search.current.value);
    setFriends(data?.payload?.friends);
  };

  useEffect(() => {
    setFriends(data?.payload?.friends);
  }, [data]);

  let content = null;
  if (isLoading) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">
        <CircularProgress />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">{error}</div>
    );
  }
  if (!isLoading && !isError && friends?.length === 0) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">
        No users found
      </div>
    );
  }
  if (!isLoading && !isError && friends?.length > 0) {
    content = friends.map((friend, index) => (
      <div
        key={index}
        className="h-[50px] w-full max-sm:w-[400px]  flex flex-col justify-center items-center p-2 bg-white"
      >
        <div className="container flex w-full justify-between px-3">
          <div className="flex gap-4 justify-start items-center ">
            <img
              src={friend.image}
              className="w-[30px] h-[30px] flex justify-center items-center rounded-full text-center"
              alt=""
            />
            <h2>
              {friend.firstName} {friend.lastName}
            </h2>
          </div>
          <div className="w-7 h-7 cursor-pointer">
            <ModeCommentOutlined />
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
          ref={search}
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

export default Friends;
