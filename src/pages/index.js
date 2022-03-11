import React, { Component } from "react"
import Layout from "../components/Layout/layout"
import { Link } from "gatsby"

class IndexPage extends Component {
  state = {
    smallScreen: false,
    modal: { name: "" },
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }

  resize() {
    this.setState({ smallScreen: window.innerWidth <= 840 })
  }

  openModal(e) {
    this.setState({ modal: e })
    document.getElementById("modal").style.display = "block"
  }

  closeModal() {
    document.getElementById("modal").style.display = "none"
  }
  render() {
    let indexData = this.props.data.allIndexJson.nodes[0];
    let homeItems = [];

    indexData.home_alliance.forEach((item, index) => {
      homeItems.push(
        <div
          key={index}
          className={
            this.state.smallScreen ? "grid-item-small" : "home-grid-item"
          }
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "100%",
          }}
        ></div>
      )
    })
    return (
      <Layout page={"home"}>
        <div className="home-bg">
          <h1>{indexData.title}</h1>
          <h2>{indexData.description}</h2>
          <Link to="/about">
            <button>{indexData.button}</button>
          </Link>
        </div>
        <div className="home-main">
          <div className="text">{indexData.text}</div>
        </div>
        <div className="divider"></div>
        <h3 className="subtitle">{indexData.subtitle}</h3>
        <div
            className={
              this.state.smallScreen
                ? "grid-container-small"
                : "home-grid-container"
            }
          >
            {homeItems}
        </div>
        {/* <h1 className="title">{indexData.title}</h1>
        <h2 className="subtitle">{indexData.description}</h2>
        <div className="home-main">
          <div className="text">{indexData.text}</div>
          <div className="divider"></div>
          <h3 className="subtitle">{indexData.subtitle}</h3> */}
        {/* <div
            className={
              this.state.smallScreen
                ? "grid-container-small"
                : "home-grid-container"
            }
          >
            {homeItems}
          </div> */}
        {/* </div> */}
        {/* <div id="modal" className="modal" onClick={this.closeModal}>
          <div
            className={
              this.state.smallScreen ? "modal-content-small" : "modal-content"
            }
          >
            <span className="modal-close">&times;</span>
            <div className="modal-grid-container">
              <div className="modal-grid-item-left">
                <span className="modal-title">{this.state.modal.name}</span>
                <p className="modal-text">{this.state.modal.description}</p>
              </div>
              <div className="modal-grid-item-right">
                <img
                  src={this.state.modal.image}
                  alt={this.state.modal.name}
                  className="modal-image"
                ></img>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    )
  }
}
export default IndexPage

export const query = graphql`
  query {
    allIndexJson {
      nodes {
        title
        description
        text
        subtitle
        button,
        home_alliance {
          name
          image
        }
      }
    }
  }
`
