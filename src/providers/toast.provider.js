import React, { createContext, Component } from 'react';

export const ToastContext = createContext({
  showToast(seconds, text) {},
  hideToast() {},
  clearToast() {},
  visible: false,
  text: '',
});

class ToastProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      text: '',
    }

    window.showToast = this.showToast;
  }

  showToast = (seconds, text) => {
    this.setState({
      visible: true,
      text,
    }, () => {
      this.hideToast(seconds);
    })
  }

  hideToast = (seconds) => {
    this.timer = setTimeout(() => {
      this.setState({
        visible: false
      })
    }, seconds * 1000);
  }

  clearToast = () => {
    if (this.timer) clearTimeout(this.timer);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { children } = this.props;
    const value = {
      hideToast: this.hideToast,
      showToast: this.showToast,
      clearToast: this.clearToast,
      ...this.state
    };

    return(
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    )
  }
}

export default ToastProvider;