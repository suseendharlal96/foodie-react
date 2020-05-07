import React from "react";

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      price: "",
      quantity: 0,
    };
  }

  render() {
    console.log(this.props.ind);
    return (
      <div>
        <div className="row">
          <span className="col-md-8">
            <h3 className="fname">{this.props.name}</h3>
          </span>
          <span className="col-md-4">
            <button
              className="btn btn-success"
              value={this.props.price}
              onClick={() =>
                this.props.action(
                  this.props.price,
                  this.state.quantity,
                  this.props.ind
                )
              }
            >
              Add
            </button>
          </span>
        </div>
        <div className="desc">
          <p>{this.props.desc}</p>
        </div>
        <br />
        <p className="amount">
          {"\u20B9"} {this.props.price}{" "}
        </p>
      </div>
    );
  }
}

export default Menu;
