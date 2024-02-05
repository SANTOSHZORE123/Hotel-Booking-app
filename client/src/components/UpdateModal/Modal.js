import ReactDOM from 'react-dom'
import classes from "./Modal.module.css"

export const Backdrop=(props)=>{
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

export const ModalOverlay = (props) => {
    return <div className={`${classes.modal} ${classes.yourComponentClass}`}>
      {props.children}
    </div>;
  };
  
    const Modal = (props) => {
        const overlayRoot = document.getElementById('overlay');
        
        if (!overlayRoot) {
          console.error("Element with id 'overlay' not found in the document.");
          return null;  // Return null or some default behavior if 'overlay' is not found.
        }
      
        return (
          <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, overlayRoot)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayRoot)}
          </>
        );
      };
      
      export default Modal;
