import React from "react";

class MyCart extends React.Component {
  render() {
    console.log("asdsa", this.props);
    return (
      <div>
        <p
          style={{ color: "var(--primaryTheme)" }}
          key={this.props.name}
          id="pitem"
        >
          {this.props.name}
          <br />
          <strong style={{ color: "var(--primaryTheme)" }}>
            Price: {"\u20B9"} {this.props.price}(1)
          </strong>
          <strong style={{ color: "var(--primaryTheme)" }}>
            Total: {"\u20B9"} {this.props.price * this.props.quantity}
          </strong>
          <br />
          <br />
          <input
            className="ip"
            type="button"
            value="-"
            onClick={() => this.props.decrement(this.props.ind)}
          />
          <input
            className="ip"
            id={"tx-w" + this.props.ind}
            type="text"
            readOnly
            value={this.props.quantity}
          />
          <input
            className="ip"
            type="button"
            value="+"
            onClick={() => this.props.increment(this.props.ind)}
          />
        </p>
      </div>
    );
  }
}

export default MyCart;
