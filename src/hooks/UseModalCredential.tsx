import { useState } from "react";

export const UseModalCredential = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  function toggle(state = !isOpenModal) {
    setIsOpenModal(state);
  }

  return {
    isOpenModal,
    toggle,
  };
};
