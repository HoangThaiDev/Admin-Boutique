// Import Modules
import React from "react";
import { createPortal } from "react-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionModalFormProduct } from "../redux/actionRedux";

// Import Components
import Overlay from "./Overlay";
import Form from "./Form";

export default function ModalFormProduct() {
  // Create + use Hooks
  const [searchParams] = useSearchParams();
  const modeModal = searchParams.get("mode");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create + use States
  const stateProduct = useSelector((state) => state.modalFormProduct);

  // Create + use event handles
  const closeModalHandle = () => {
    dispatch(actionModalFormProduct.hide());
    navigate("/dashboard/products");
  };

  return (
    <>
      {createPortal(
        <Form
          mode={modeModal}
          productDetail={stateProduct.info}
          isShow={stateProduct.isShow}
        />,
        document.getElementById("modal-form-product")
      )}
      <Overlay isShow={stateProduct.isShow} onClose={closeModalHandle} />
    </>
  );
}
