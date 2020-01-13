import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { cgFetch, shopFetch } from '../ShopActions'
import './Shop.scss'

const Categories = props => {
  useEffect(() => {
    props.dispatch(cgFetch())
    // props.dispatch(shopFetch(props.nowPage, props.nowCategories))
    // console.log(props.nowCategories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // function ChangeCatagories(sid) {
  //   shopFetch(1, sid)
  // }
  return (
    <>
      <Col md={2} className="book_categories px-0">
        <div className="d-flex justify-content-center align-items-center border-bottom">
          分類瀏覽
        </div>

        {props.categories.payload &&
          props.categories.payload.map(categories => (
            <Link
              to={'/books/1/' + categories.sid}
              className="d-flex justify-content-center align-items-center border-bottom categories-color"
              key={categories.sid}
            >
              {categories.name}
            </Link>
          ))}
      </Col>
    </>
  )
}
// class Categories extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       categories: [],
//     }
//   }
//   render() {
//     return (
//       <>
//         <Col md={2} className="book_categories px-0">
//           <div className="d-flex justify-content-center align-items-center border-bottom">
//             分類瀏覽
//           </div>
//           {this.state.categories.map(categories => (
//             <div
//               className="d-flex justify-content-center align-items-center border-bottom categories-color"
//               key={categories.sid}
//             >
//               {categories.name}
//             </div>
//           ))}
//         </Col>
//       </>
//     )
//   }
// }

const mapStateToProps = state => ({
  categories: state.categories,
})
export default connect(mapStateToProps)(Categories)
