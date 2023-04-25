// NAME: Header
// PURPOSE: The header of the site. Containing the about button and home button.
//
// ----------------------------------------------------------------------------
import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(); // State of the modal.

  // ------------ MODAL HANDLERS ---------------
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // Modal styles.
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="bg-gradient-to-r from-[rgb(14_165_233)] to-[rgb(3_105_161)] p-2 flex shrink-1 grow-0 basis-auto justify-between drop-shadow-lg">
      <Link to={"/"} className="px-2">
        <i className="fa-solid fa-house text-2xl text-white"></i>
      </Link>
      <button
        className="bg-emerald-300 py-1 px-4 rounded-lg drop-shadow-lg font-semibold"
        onClick={openModal}
      >
        About
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="About the Site Modal"
        style={customStyles}
      >
        <div className="flex justify-between p-2">
          <h1 className="font-bold text-xl w-full text-center">
            About the site
          </h1>
          <button onClick={closeModal}>❌</button>
        </div>
        <div className="text-2xl">Site by Kaleb Chisholm</div>
        <div className="">COMP 4513: Web 3</div>
        <div>Mount Royal University</div>
        <div>Winter 2023 - Feb 28, 2023</div>
        <div>
          Github Link:{" "}
          <a href="https://github.com/kalebchisholm/comp4513-a1.git">
            comp4513-a1
          </a>
        </div>
        <div>
          Technology used: VS Code, Github, React, React-Router-Dom,
          React-Modal, Firefox, Chrome
        </div>
        <div>
          Sources used: (1) https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5, (2) JavaScript Documentation
        </div>
      </Modal>
    </div>
  );
}
