import PropTypes from "prop-types";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { Laugh } from "lucide-react";

function EmojiPicker({ addEmoji }) {
  return (
    <Popover placement="top-end" className="sticky top-0">
      <PopoverHandler>
        <div className="py-3 mr-2">
          {" "}
          <Laugh className="cursor-pointer text-gray-700 dark:text-neutral-400 hover:text-yellow-900 dark:hover:text-orange-600" />
        </div>
      </PopoverHandler>
      <PopoverContent className="p-0 border-0 rounded-xl">
        <Picker
          data={data}
          onEmojiSelect={(emoji) => addEmoji((prev) => prev + emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}

EmojiPicker.propTypes = {
  addEmoji: PropTypes.func.isRequired,
};

export default EmojiPicker;
