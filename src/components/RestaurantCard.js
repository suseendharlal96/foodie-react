import React from "react";

import data from "../data/data.json";
class RestaurantCard extends React.Component {
  constructor() {
    super();
    this.state = {
      list: data,
    };
  }

  navigateOrder = () => {
    if (this.props.history.location.pathname.search("edit") !== -1) {
      this.props.history.push(
        `/order/${this.props.name}/${
          this.props.history.location.pathname.split("/")[2]
        }/edit`
      );
    } else {
      this.props.history.push(`/order/${this.props.name}`);
    }
  };

  render() {
    return (
      <div
        className="cart"
        onClick={this.navigateOrder}
        title={this.props.name}
      >
        <center>
          <img src={this.props.thumbnail_image} alt={this.props.name} />
        </center>
        {/* <Link to={{
                    pathname:`/order/${this.props.name}`}}>
                </Link> */}
        <h3 id="hotel-title" style={{ color: "var(--primaryText)" }}>
          {this.props.name}
        </h3>
        <p>{this.props.cuisines}</p>
        <p>Rating: {"★".repeat(this.props.rating)}</p>
        <p>Reviews: {this.props.reviews}</p>
      </div>
    );
  }
}

export default RestaurantCard;
