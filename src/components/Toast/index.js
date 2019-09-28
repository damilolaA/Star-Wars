import React from 'react';

import { ToastContext } from '../../providers/toast.provider';
import './toast.scss';

const Toast = () => (
  <ToastContext.Consumer>
    {({ visible, text, hasAction, action }) => (
      <div className={`toast ${visible ? 'open' : ''}`}>
        <div className="toast-body">
          <span className="toast-body__text">{text}</span>
        </div>
        {hasAction ? (
          <button onClick={action.callback}>{action.text}</button>
        ) : (
          <div className="toast-close">
            <i className="mdi mdi-close close" />
          </div>
        )}
      </div>
    )}
  </ToastContext.Consumer>
);

export default Toast;
