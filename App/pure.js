import React from 'react';

const pure = Component => class extends React.PureComponent {
  render() {
    return (
      <Component {...this.props} />
    );
  }
};

export default pure;
