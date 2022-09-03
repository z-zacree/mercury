import { useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

interface ComponentProps {
  isOpen: boolean;
}

const AnimatedMenuIcon: FC<ComponentProps> = ({ isOpen }) => {
  return (
    <>
      <span className={`top ${isOpen ? "topOpen" : "topClose"}`} />
      <span className={`bottom ${isOpen ? "bottomOpen" : "bottomClose"}`} />

      <style jsx>{`
        .top {
          height: 2px;
          border-radius: 2px;
          position: absolute;
          transition: 0.2s linear 0s;
          background-color: ${useColorModeValue("black", "white")};
        }

        .topOpen {
          width: 24px;
          transform: rotate(-45deg);
        }

        .topClose {
          width: 20px;
          transform: translateY(250%);
        }

        .bottom {
          height: 2px;
          border-radius: 2px;
          position: absolute;
          transition: 0.2s linear 0s;
          background-color: ${useColorModeValue("black", "white")};
        }

        .bottomOpen {
          width: 24px;
          transform: rotate(45deg);
        }

        .bottomClose {
          width: 20px;
          transform: translateY(-250%);
        }

        .overlay {
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          width: 100vw;
          position: fixed;
        }

        .overlayContent {
          top: 0;
          left: 0;
          right: 0;
          position: fixed;
          margin-top: 4.5rem;
          background-color: gray;
        }
      `}</style>
    </>
  );
};

export default AnimatedMenuIcon;
