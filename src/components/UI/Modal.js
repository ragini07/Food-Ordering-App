import styles from './Modal.module.css'
import reactDom from 'react-dom'
import { Fragment } from 'react/cjs/react.production.min'

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClickAnywhere}></div>
}

const Overlays = (props) => {
    return (
        <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
        </div>)
}

const portalElement = document.getElementById('overlays')
const Modal = (props) => {
    return(<Fragment>
        {reactDom.createPortal(<Backdrop onClickAnywhere={props.onClickAnywhere}/>,portalElement)}
        {reactDom.createPortal(<Overlays>{props.children}</Overlays>,portalElement)}
    </Fragment>)
}

export default Modal;