import React, { useEffect } from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '@fullcalendar/list/main.css'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import FullCalendar from '@fullcalendar/react'
import './acCalendar.scss'
import $ from 'jquery'
import 'bootstrap'
import moment from 'moment'

function AcCalendar(props) {
  useEffect(() => {
    $('[data-toggle="popover"]').popover()
  })
  let events = []
  if (props.eventData) {
    events = props.eventData.map(v => {
      return {
        id: v.sid,
        title: v.title,
        start: moment(v.date).format(),
        url: "javascript: window.open('../activities/offline/" + v.acId + "')",
        description: `時間：${v.date.substr(0, 10)}<br/>地點：${
          v.location
        }<br/>簡介：<br/>${v.brief_intro}`,
      }
    })
  }

  return (
    <>
      <section className="acCalendarContainer py-5 mt-5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
          themeSystem="bootstrap"
          header={{
            left: 'prev',
            center: 'title',
            right: 'today ,next',
          }}
          height={500}
          titleFormat={{ year: 'numeric', month: 'short' }}
          events={events}
          eventRender={function(eventObj) {
            let el = eventObj.el
            el.classList.add('id_' + eventObj.event.id)
            el.dataset.toggle = 'popover'
            el.dataset.trigger = 'hover'
            el.dataset.placement = 'top'
            el.dataset.container = '.acCalendarContainer'
            el.dataset.html = 'true'
            el.dataset.content = eventObj.event.extendedProps.description
            el.setAttribute('title', eventObj.event.title)
          }}
          datesRender={function(view, element) {
            $('[data-toggle="popover"]').popover()
          }}
        />
      </section>
    </>
  )
}
export default AcCalendar
