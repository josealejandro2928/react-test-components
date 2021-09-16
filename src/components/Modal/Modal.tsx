/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from 'react';
import { ModalDataContext, ModalState } from './Modal.context';
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

  if (modalState.resizable) {
    styleContainer.width = 'auto';
    styleContainer.resize = 'auto';
  } else {
    styleContainer.resize = 'unset';
  }

  if (modalState.fullScreen) {
    styleContainer.width = '100vw';
    styleContainer.height = '100vh';
    styleContainer.maxHeight = '100vh';
    styleContainer.maxWidth = '100vw';
    styles.body = { ...styles.body };
    styles.body.maxHeight = '100vh';
  } else {
    styleContainer.maxHeight = '94vh';
    styleContainer.maxWidth = '94vw';
    styles.body = { ...styles.body };
    styles.body.maxHeight = '64vh';
  }

  if (!modalState.animation) {
    styleContainer.animation = 'unset';
  }

  function onClickBackground() {
    if (modalState.closeOnBackgroundOrEsc) {
      closeModal();
    }
  }
  function detectKey(e: any) {
    if (e.key === 'Escape') {
      onClickBackground();
    }
  }

  useEffect(() => {
    if (modalState.show) {
      document.addEventListener('keydown', detectKey);
    } else {
      document.removeEventListener('keydown', detectKey);
    }
    return () => {
      document.removeEventListener('keydown', detectKey);
    };
  }, [modalState.show]);

  return (
    <div id="modal-full-component" ref={modalRef} className="Modal">
      {modalState.show && (
        <>
          <div onClick={onClickBackground} className="backdrop"></div>
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
  closeOnBackgroundOrEsc?: boolean | undefined;
  resizable?: boolean;
  fullScreen?: boolean;
  animation?: boolean;
}
const initialModalState: ModalState = {
  show: false,
  component: null,
  title: '',
  dataProps: null,
  height: null,
  width: null,
  closeOnBackgroundOrEsc: false,
  footer: null,
  resizable: false,
  fullScreen: false,
  animation: false,
};

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
      ...options,
    });
  }

  const closeModal = (data?: any) => {
    setModalState({
      ...modalState,
      ...initialModalState,
      dataProps: data,
    });
  };

  const setOptions = (options?: ModalOptions) => {
    setModalState({
      ...modalState,
      ...options,
    });
  };

  return { dataToProps: modalState.dataProps, modalState, setComponentToRender, closeModal, setOptions };
};
