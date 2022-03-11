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
