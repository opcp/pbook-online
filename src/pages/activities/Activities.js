import React from 'react'
// import Test from './test'
import AcList from './components/acList/AcList'
import AcPageOffline from './components/acPage/AcPageOffline'
import AcPageDiscount from './components/acPage/AcPageDiscount'
import AcSign from './components/acSign/AcSign'
import { connect } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import './activities.scss'

const Activities = props => {
  return (
    <>
      <div className="activities">
        <ScrollToTop>
          <Switch>
            <Route exact path={'/activities/:acType'} component={AcList} />

            <Route
              exact
              path={'/activities/discount/:acId'}
              component={AcPageDiscount}
            />
            <Route
              exact
              path={'/activities/offline/:acId'}
              component={AcPageOffline}
            />
            <Route
              exact
              path={'/activities/offline/sign/:acId'}
              component={AcSign}
            />

            <Redirect
              exact
              from={'/activities'}
              to={'/activities/' + props.acType}
            />
          </Switch>
        </ScrollToTop>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  acType: state.acType,
})
export default connect(mapStateToProps)(Activities)
