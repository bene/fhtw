import React, {useState} from "react"
import firebase from "firebase"

import { db } from "./firebase"
import {Link} from "react-router-dom"

const CreateMessage = () => {

    const [submitted, setSubmitted] = useState(false)
    const [content, setContent] = useState("")

    const handleSubmit = (event) => {

        setSubmitted(true)

        db.collection("Messages").add({
            content,
            date: firebase.firestore.Timestamp.now()
        }).then((ref) => {
            alert("Die Nachricht sollte hinzugefügt sein.")
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
                        <label htmlFor="content">Nachricht</label>
                        <input id="content" type="text" minLength="20" maxLength="250" value={ content } onChange={(e) => setContent(e.target.value)} disabled={ submitted } className="form-control" />
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

export default CreateMessage