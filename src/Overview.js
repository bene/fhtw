import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import 'moment/locale/de';

import { db } from "./firebase"
import IconAdd from "./img/plus-circle.svg"
import moment from "moment"


moment.locale('de');

const INVALID = "Ungültig"

const Overview = () => {

    const [events, setEvents] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        db.collection("Events").orderBy("deadline", "asc").onSnapshot(snapshot => {

            snapshot.forEach((doc) => {

                const event = doc.data()
                event.id = doc.id
                event.deadline = moment(event.deadline.toDate())

                setEvents(events => events.every(e => e.id !== event.id) ? [...events, event] : events)
            })
        })

        db.collection("Messages").orderBy("date", "desc").onSnapshot(snapshot => {

            snapshot.forEach((doc) => {

                const message = doc.data()
                message.id = doc.id
                message.date = moment(message.date.toDate())

                setMessages(messages => messages.every(m => m.id !== message.id) ? [...messages, message] : messages)
            })
        })

    }, [])

    const eventViews = events.filter(e => e.deadline.isAfter(moment())).map(e => (
        <div key={ e.id || "" } className={`card mb-3 shadow-sm ${ moment.duration(e.deadline.diff(moment())).asHours() < 12 ? "bg-danger text-white" : "" }`}>
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <span className="h5 m-0">{ e.name || INVALID }</span>
                    <span className="h5 m-0">{ e.subject || INVALID }{ !!e.group ? ` (${ e.group })` : "" }</span>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{ e.description }</p>
            </div>
            <div className="card-footer d-flex flex-row justify-content-between">
                <span>{ !!e.deadline ? e.deadline.format("LLL") : INVALID }</span>
                <span>{ !!e.deadline ? e.deadline.fromNow() : INVALID }</span>
            </div>
        </div>
    ))

    const eventHistoryViews = events.filter(e => e.deadline.isBefore(moment())).map(e => (
        <div key={ e.id || "" } className={`card mb-3 shadow-sm ${ moment.duration(e.deadline.diff(moment())).asHours() > 6 ? "bg-danger text-white" : "" }`}>
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <span className="h5 m-0">{ e.name || INVALID }</span>
                    <span className="h5 m-0">{ e.subject || INVALID }{ !!e.group ? ` (${ e.group })` : "" }</span>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">{ e.description }</p>
            </div>
            <div className="card-footer d-flex flex-row justify-content-between">
                <span>{ !!e.deadline ? e.deadline.format("LLL") : INVALID }</span>
                <span>{ !!e.deadline ? e.deadline.fromNow() : INVALID }</span>
            </div>
        </div>
    ))

    const messageViews = messages.map(m => (
        <div key={ m.id } className="alert alert-primary my-3 shadow-sm" role="alert">
            <small className="font-weight-bold d-block">{ !!m.date ? m.date.format("LL") : "" }</small>
            { m.content || INVALID }
        </div>
    ))

    return (
        <div className="row">
            <div className="col-12 col-md-8 mb-3 mb-md-0 order-2 order-md-1">
                <div className="d-flex flex-row justify-content-between mb-3">
                    <h2 className="m-0">Deadlines</h2>
                    <div className="my-auto">
                        <Link to="/add/event" role="button">
                            <img src={ IconAdd } alt="Add" />
                        </Link>
                    </div>
                </div>

                { eventViews }

                <h3 className="mb-3">Vergangen</h3>
                { eventHistoryViews }
            </div>

            <div className="col-12 col-md-4 order-1 order-md-2">
                <div className="d-flex flex-row justify-content-between mb-3">
                    <h2 className="m-0">Nachrichten</h2>
                    <div className="my-auto">
                        <Link to="/add/message" role="button">
                            <img src={ IconAdd } alt="Add" />
                        </Link>
                    </div>
                </div>

                { messageViews }
            </div>
        </div>
    )
}

export default Overview
