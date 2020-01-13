import React, { useEffect } from 'react'
import AcItem from './AcItem'
import AcListHeader from './AcListHeader'
import './acList.scss'
import { connect } from 'react-redux'
import { fetchAcList } from '../../AcActions'
import AcBreadCrumb from '../AcBreadCrumb'

const AcList = props => {
  let acType = props.match.params.acType
  useEffect(() => {
    props.dispatch(fetchAcList(acType))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.acType])
  let bread = [{ text: '首頁', url: '/' }]
  bread.push({
    text: acType === 'offline' ? '實體活動' : '優惠活動',
    url: '/activities/' + acType,
  })
  return (
    <>
      <AcBreadCrumb bread={bread} />
      <div className="container acList">
        <AcListHeader />
        <div className="my-2 py-2" style={{ borderTop: '1px solid #ccc' }}>
          {props.acData[acType].data
            .filter(v => {
              return (
                +v.status === +props.visibilityFilter.value ||
                +props.visibilityFilter.value === 3
              )
            })
            .sort((a, b) => b.sid - a.sid)
            .map(v => (
              <AcItem key={v.sid} {...v} acType={acType} />
            ))}
        </div>
      </div>
    </>
  )
}
const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter,
  acType: state.acType,
  acData: state.acData,
})
export default connect(mapStateToProps)(AcList)
