import React from 'react'
import Carousel from '../../components/indexComponents/carousel/Carousel'
import './scss/TopicPage.scss'
import CardS1 from '../../components/forum/CardS1/CardS1'
import ButtonUI from '../../components/Material-UI/Button'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
//action
import { letMeLogin } from './fmAction'

class TopicPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: false,
      featured: false,
      activeKey: 2,
    }
  }
  componentDidMount() {
    this.handleCateChange()
  }

  handleCateChange() {
    fetch(`http://localhost:5555/forum/cate/${this.props.cate}`)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then(result => {
        this.setState({
          featured: result.featured,
          articles: result.article,
          subcategory: result.subcategory,
          cate: this.props.cate,
          data: result.article,
          activeKey: 0,
        })
      })
  }
  handelSelectSubcate = selectedKey => {
    if (selectedKey !== '0') {
      let result = this.state.data.filter(value => {
        return `${value.fm_subCategories}` === selectedKey
      })
      this.setState({
        articles: result,
        activeKey: selectedKey,
      })
    } else {
      this.handleCateChange()
    }
  }
  handlePostClick = e => {
    if (localStorage.user !== undefined) {
      let user = JSON.parse(localStorage.user)
      this.props.history.push(
        `/forum/post/${this.props.cate}/${user.MR_number}`
      )
    } else {
      this.props.dispatch(letMeLogin())
    }
    // console.log(this.props.location.pathname)
  }

  render() {
    if (!this.state.featured) {
      return (
        <h2 className="dis-flex dis-justify-center">
          <CircularProgress color="secondary" />
        </h2>
      )
    } else {
      console.log('render')
      if (this.props.cate !== this.state.cate) {
        this.handleCateChange()
      }
      return (
        // defaultActiveKey="0"

        <>
          <div className="HotArticlePage container">
            <div className="subCate-navbar">
              <div className="dis-flex">
                <div className="subBar-item">
                  <Nav
                    variant="pills"
                    activeKey={this.state.activeKey}
                    onSelect={this.handelSelectSubcate}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="0">熱門</Nav.Link>
                    </Nav.Item>
                    {this.state.subcategory.map(value => {
                      return (
                        <Nav.Item key={value.sid}>
                          <Nav.Link eventKey={value.sid}>
                            {value.subname}
                          </Nav.Link>
                        </Nav.Item>
                      )
                    })}
                  </Nav>
                </div>
              </div>
              {/* <Link to={`/forum/post/${this.props.cate}`}> */}
              <div className="subBar-item " onClick={this.handlePostClick}>
                <ButtonUI name="我想發文" color="secondary"></ButtonUI>
              </div>
              {/* </Link> */}
            </div>
            <Carousel />
            <div className="cards-wrapper ">
              {this.state.articles.map(value => (
                <CardS1 key={value.fm_articleId} data={value}></CardS1>
              ))}
            </div>
          </div>
        </>
      )
    }
  }
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  addElement: store.letMeLogin.loginOrNot,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default withRouter(connect(mapStateToProps)(TopicPage))
