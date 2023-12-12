import { useEffect, useState } from "react";
import { useGetRemainingUsersQuery } from "../../features/friends/friendsApi";
import useDebounce from "../../Hooks/useDebounce";
import {
  CloseOutlined,
  ModeCommentOutlined,
  Search,
  Send,
} from "@mui/icons-material";
import { CircularProgress, Stack } from "@mui/material";

/*eslint-disable react/prop-types*/
const GetUsers = ({
  handleRequestModalOpen,
  requestModalOpen,
  setRequestModalOpen,
}) => {
  const userInfo = JSON.parse(localStorage.getItem("auth"));
  const this_user = userInfo.user;

  // const name = user.firstName + user.lastName;
  const [recommandedUsers, setRecommandedUsers] = useState([]);
  const [allRequest, setAllRequest] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchValue = useDebounce(inputValue, 1000);

  const { isLoading, data, isError, error } =
    useGetRemainingUsersQuery(debouncedSearchValue);

  const handleSearch = (e) => {
    e.preventDefault();
    setRecommandedUsers(data?.payload?.remainingUser);
    setAllRequest(data?.payload?.allRequests);
  };

  const handleClick = () => {
    setButtonDisabled(true);
  };

  useEffect(() => {
    setRecommandedUsers(data?.payload?.remainingUser);
    setAllRequest(data?.payload?.allRequests);
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
  if (!isLoading && !isError && recommandedUsers?.length === 0) {
    content = (
      <div className=" flex justify-center items-center h-[50px] ">
        No users found
      </div>
    );
  }
  if (!isLoading && !isError && recommandedUsers?.length > 0) {
    content = recommandedUsers?.map((user, index) => {
      let btnText = "Add Friend";
      const sentRequest = allRequest.find(
        (req) => req.recipient.toString() === user._id.toString()
      );
      const incomingRequest = allRequest.find(
        (req) => req.sender.toString() === user._id.toString()
      );
      if (sentRequest) {
        btnText = "Request sent";
        // setButtonDisabled(true);
      } else if (incomingRequest) {
        btnText = "Accept";
      }
      return (
        <div
          key={index}
          className="h-[50px] w-full max-sm:w-[400px]  flex flex-col justify-center items-center p-2 bg-white cursor-default"
        >
          <div className="container flex w-full justify-between px-3">
            <div className="flex gap-4 justify-start items-center ">
              <img
                src={user.image}
                className="w-[30px] h-[30px] flex justify-center items-center rounded-full text-center"
                alt=""
              />
              <h2>
                {" "}
                {user.firstName} {user.lastName}
              </h2>
            </div>
            <div className="flex gap-4">
              {!this_user?.friends.includes(user._id) && (
                <button
                  className={`${
                    btnText === "Request sent"
                      ? "bg-white text-blue-900 border-2 border-blue-500"
                      : "bg-blue-500 text-white"
                  } text-sm px-2 rounded-md  ${
                    buttonDisabled &&
                    "bg-white text-gray-800 border-[1px] border-black"
                  }`}
                  onClick={() => handleClick(user)}
                  disabled={btnText === "Request sent"}
                >
                  {btnText}
                </button>
              )}

              {btnText !== "Add Friend" && (
                <button className="border-2 border-blue-500 px-2 text-sm rounded-md">
                  cancel
                </button>
              )}
              <div
                className="w-7 h-7 cursor-pointer"
                onClick={() => handleRequestModalOpen(name)}
              >
                <ModeCommentOutlined />
              </div>
            </div>
          </div>
          {requestModalOpen && (
            <div className="fixed inset-0 w-full h-full flex justify-center items-center">
              <div className="max-sm:w-[400px] w-2/6 bg-white rounded-md">
                <div className="flex justify-end">
                  <div
                    className="w-[30px] h-[30px] p-1 cursor-pointer"
                    onClick={() => setRequestModalOpen(false)}
                  >
                    <CloseOutlined />
                  </div>
                </div>
                <p className="text-sm p-2">
                  <span className="font-semibold text-blue-500 text-md">
                    {user.firstName} {user.lastName}
                  </span>{" "}
                  is not connected with you. Sending message to unconnected
                  people is considered as request message. We recommand to
                  connect first with him.
                </p>
                <form className="flex justify-between px-2 my-3">
                  <input
                    type="text"
                    className="p-1 rounded max-sm:w-[350px] w-[400px] outline-none px-3 border-[1px] border-blue-400"
                  />
                  <button
                    type="submit"
                    className="w-[30px] h-[30px] text-blue-500"
                  >
                    <Send />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    });
  }

  return (
    <>
      <form onSubmit={handleSearch} className="px-5 w-full flex gap-5">
        <input
          type="text"
          name="input"
          className="w-10/12 h-[30px]  focus:outline-blue-500 border-none p-2 bg-slate-300 text text-sm rounded-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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

export { GetUsers };
