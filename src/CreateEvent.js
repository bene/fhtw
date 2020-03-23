import React, {useState} from "react"
import { firestore } from "firebase"

import { db } from "./firebase"
import {Link} from "react-router-dom"

const CreateEvent = () => {

    const [submitted, setSubmitted] = useState(false)
    const [values, setValues] = useState({
        name: "",
        description: "",
        deadline: new Date().toISOString(),
        subject: "Datenanalyse und Statistische Modellierung",
        group: "V1/2"
    })

    const handleChange = (event) => {
        console.log(event.target.value)
        setValues({...values, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {

        setSubmitted(true)
        values.deadline = firestore.Timestamp.fromDate(new Date(values.deadline))
        console.log(values.deadline)

        db.collection("Events").add({
            ...values
        }).then((ref) => {
            alert("Die Deadline sollte hinzugefügt sein.")
        }).catch(err => {
            alert("Fehler: " + err.toString())
        })

        event.preventDefault();
    }

    return (
        <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" type="text" minLength="3" value={ values.title } onChange={ handleChange } disabled={ submitted } required={ true } className="form-control"/>
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