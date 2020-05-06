import React from "react";

class MyCart extends React.Component {
  render() {
    return (
      <div>
        <p key={this.props.name} id="pitem">
          {this.props.name}
          <br />
          <br />
          <input
            className="ip"
            type="button"
            value="-"
            onClick={()=>this.props.decrement(this.props.ind)}
          />
          <input
            className="ip"
            id="tx-w"
            type="text"
            readOnly
            value={this.props.quantity}
          />
          <input
            className="ip"
            type="button"
            value="+"
            onClick={()=>this.props.increment(this.props.ind)}
          />
        </p>
      </div>
    );
  }
}

export default MyCart;
