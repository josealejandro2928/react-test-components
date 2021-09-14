/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from 'react';
import { ModalDataContext } from './Modal.context';
import './Modal.scss';

function Modal({
  styles = {
    container: {
      width: '40rem',
    },
    header: {},
    body: {},
    footer: {},
  },
}: {
  styles?: {
    container: any;
    header?: any;
    body?: any;
    footer?: any;
  };
}): JSX.Element {
  const modalRef = useRef<any>();
  const { modalState, closeModal } = useModal();

  const styleContainer = { ...styles?.container };

  if (modalState.width) {
    styleContainer.width = modalState.width;
  }
  if (modalState.height) {
    styleContainer.minHeight = modalState.height;
  }

  return (
    <div id="modal-full-component" ref={modalRef} className="Modal">
      {modalState.show && (
        <>
          <div className="backdrop"></div>
          <div className="modal-container" style={styleContainer}>
            <div className="header" style={styles?.header}>
              {modalState.title}
              <div className="close-btn">
                <button onClick={() => closeModal()}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="body" style={styles?.body}>
              {modalState.component}
            </div>
            {modalState.footer && (
              <div className="footer" style={styles?.footer}>
                {modalState.footer}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;

interface ModalOptions {
  title?: string;
  dataProps?: any;
  width?: string | number;
  height?: string | number;
}

export const useModal = (closeCb?: Function) => {
  const { modalState, setModalState } = useContext(ModalDataContext);
  const initRef = useRef(true);

  useEffect(() => {
    if (initRef.current) {
      initRef.current = false;
      return;
    }
    if (modalState.show === false && closeCb) {
      closeCb(modalState.dataProps);
    }
  }, [modalState.show]);

  function setComponentToRender(element: JSX.Element, options?: ModalOptions) {
    setModalState({
      ...modalState,
      show: true,
      component: element,
      title: options?.title,
      dataProps: options?.dataProps,
      width: options?.width,
      height: options?.height,
    });
  }

  const closeModal = (data?: any) => {
    setModalState({
      ...modalState,
      show: false,
      component: null,
      title: '',
      dataProps: data,
      height: null,
      width: null,
    });
  };

  return { dataToProps: modalState.dataProps, setComponentToRender, closeModal, modalState };
};
