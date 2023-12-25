import data from "@emoji-mart/data";
import EmojiPicker from "@emoji-mart/react";
const Emoji = ({ openEmoji, handleAddEmoji }) => {
  return (
    <>
      {openEmoji && (
        <div className="absolute bottom-10 right-1">
          <EmojiPicker data={data} onEmojiSelect={handleAddEmoji} />
        </div>
      )}
    </>
  );
};

export default Emoji;
