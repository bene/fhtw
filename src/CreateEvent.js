import React, {useState, useEffect} from "react"
import { firestore } from "firebase"

import { db } from "./firebase"
import {Link, useParams} from "react-router-dom"
import moment from "moment"

const CreateEvent = () => {

    const { eventId } = useParams()

    const [submitted, setSubmitted] = useState(!!eventId)
    const [values, setValues] = useState({
        id: eventId,
        name: "",
        description: "",
        deadline: new Date().toISOString(),
        subject: "Datenanalyse und Statistische Modellierung",
        group: "V1/2"
    })

    useEffect(!!eventId ? () => {
        db.collection("Events").doc(eventId).get().then(doc => {

            const currentData = doc.data();
            currentData.id = doc.id;
            currentData.deadline =  moment(currentData.deadline.toDate()).format("YYYY-MM-DDTkk:mm")

            console.log(currentData)

            setValues({...currentData})
            setSubmitted(false)

        }).catch(() => {

        })
    } : () => {}, [])

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {

        setSubmitted(true)
        values.deadline = firestore.Timestamp.fromDate(new Date(values.deadline))

        const coll = db.collection("Events")

        if (!!values.id) {
            coll.doc(values.id).set(values).then((ref) => {
                alert("Die Deadline sollte hinzugefügt sein.")
            }).catch(err => {
                alert("Fehler: " + err.toString())
            })
        } else {
            coll.add(values).then((ref) => {
                alert("Die Deadline sollte hinzugefügt sein.")
            }).catch(err => {
                alert("Fehler: " + err.toString())
            })
        }

        event.preventDefault();
    }

    return (
        <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
                <div className="alert alert-danger" role="alert">
                    Bitte nur mit <span className="font-weight-bold">Google Chrome</span> verwenden. Firefox etc. unterstützen das Datums Feld nicht!
                </div>
                <form onSubmit={ handleSubmit }>
                    <div className="form-group d-none">
                        <label htmlFor="id">ID</label>
                        <input id="id" name="id" type="text" value={ values.id } onChange={ handleChange } disabled={ true } className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" minLength="3" value={ values.name } onChange={ handleChange } disabled={ submitted } required={ true } className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Beschreibung</label>
                        <input id="description" name="description" type="text" minLength="3" value={ values.description } onChange={ handleChange } disabled={ submitted } required={ true } className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline">Fälligkeitsdatum</label>
                        <div className="d-block w-100">
                            <input id="deadline" name="deadline" type="datetime-local" value={ values.deadline } onChange={ handleChange } disabled={ submitted } required={ true } className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Fach</label>
                        <select className="form-control" id="subject" name="subject" value={ values.subject } onChange={ handleChange } disabled={ submitted } required={ true }>
                            <option>Datenanalyse und Statistische Modellierung</option>
                            <option>Kostenrechnung</option>
                            <option>Objectoriented Programming and Modelling</option>
                            <option>Projektmanagement</option>
                            <option>Technical and Creative Communication</option>
                            <option>Teamarbeit und Konfliktmanagement</option>
                            <option>Web Engineering</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Gruppe</label>
                        <select className="form-control" id="group" name="group" value={ values.group } onChange={ handleChange } disabled={ submitted } required={ true }>
                            <option>V1</option>
                            <option>V2</option>
                            <option>V1/2</option>
                        </select>
                    </div>

                    <div className="d-flex flex-row justify-content-between mb-3">
                        <button type="submit" className="btn btn-primary" disabled={ submitted }>Hinzufügen</button>
                        <Link to="/" className="btn btn-danger">Zurück</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEvent