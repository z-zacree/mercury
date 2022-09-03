import {
  InputGroup,
  InputLeftElement,
  IconButton,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TbChevronLeft } from "react-icons/tb";

interface ComponentProps {
  onClose: () => void;
}

const Search: FC<ComponentProps> = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <InputGroup>
        <InputLeftElement>
          <IconButton
            size={"sm"}
            variant={"ghost"}
            icon={<TbChevronLeft />}
            aria-label={"Close searchbar"}
            onClick={() => onClose()}
          />
        </InputLeftElement>
        <Input
          autoFocus
          type={"text"}
          variant={"filled"}
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
        <InputRightElement>
          <IconButton
            size={"sm"}
            variant={"ghost"}
            icon={<IoMdClose />}
            aria-label={"Clear search bar"}
            onClick={() => setSearchText("")}
          />
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default Search;
