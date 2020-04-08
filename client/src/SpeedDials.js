import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import client from './feathers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

let SpeedDials = (props) => {
  const speedDialService = client.service('speeddial')
  const username = queryString.parse(props.location.search).user

  const [speedDial, setSpeedDial] = useState({
    label: '',
    destination: '',
  })

  const [speedDialList, setSpeedDialList] = useState([])

  useEffect(() => {
    speedDialService
      .find()
      .then((res) => setSpeedDialList(res.data))
      .catch((err) => console.log(err))
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    Object.assign(speedDial, { username })
    speedDialService
      .create(speedDial)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    setSpeedDial({
      label: '',
      destination: '',
    })
  }

  const handleDelete = (speedDial) => {
    speedDialService
      .remove(speedDial)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent pt-2">
        <p className="navbar-brand" style={{ textTransform: 'capitalize' }}>
          {username}'s Speed Dials
        </p>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              onChange={(e) =>
                setSpeedDial({
                  ...speedDial,
                  label: e.target.value,
                })
              }
              value={speedDial.label}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Label"
              aria-label="Speed Dial Label"
            />
            <input
              onChange={(e) =>
                setSpeedDial({
                  ...speedDial,
                  destination: e.target.value,
                })
              }
              value={speedDial.destination}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Destination"
              aria-label="Speed Dial Number"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Add New
            </button>
          </form>
        </div>
      </nav>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-12">
            {speedDialList.map((speedDial) => {
              return (
                <div className="card mb-2" key={speedDial._id}>
                  <div className="card-body">
                    <h5 className="card-title">{speedDial.label}</h5>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ display: 'inline-block' }}
                    >
                      {speedDial.destination}
                    </h6>
                    <a
                      href={`sip://${speedDial.destination}`}
                      className="card-link"
                    >
                      <FontAwesomeIcon
                        icon={faPhone}
                        color="green"
                        size="2x"
                        pull="left"
                      />
                    </a>
                    <button
                      onClick={() => handleDelete(speedDial)}
                      className="btn btn-outline-danger my-2 my-sm-0 float-right"
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeedDials
