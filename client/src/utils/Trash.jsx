const handleClick = (friends) => {
  const conversation = data.payload.conversation.filter(
    (conversation) =>
      conversation.participients.some((usr) => usr._id === friends._id) &&
      conversation.participients.some((usr) => usr._id === user._id)
  );
  // console.log(conversation);
  dispatch(selecteConversation(conversation[0]._id));
  dispatch(selecteFriend(friends));
  console.log(friends);
};


{searchInput.length === 0 ? (
            <>
              <OnlinePeople onlineUser={onlineUser} />
              <div className="all-contact w-full flex flex-col gap-1 flex-grow  overflow-y-scroll">
                {content}
              </div>
            </>
          ) : (
  <></>
    
    
    const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    const res =
      data?.payload?.conversation?.length > 0 &&
      data.payload.conversation.forEach((conversation) => {
        const filteredResults = conversation.participients.filter(
          (participant) =>
            (participant._id !== user._id &&
              participant.firstName
                ?.toLowerCase()
                .includes(inputValue?.toLowerCase())) ||
            participant.lastName
              ?.toLowerCase()
              .includes(inputValue?.toLowerCase())
        );
        setSearchResults(filteredResults);
      });
    console.log(res);
  };