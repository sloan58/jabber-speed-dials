import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import client from './feathers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

let SpeedDials = (props) => {
  const speedDialService = client.service('speeddial')
  const user = queryString.parse(props.location.search).user

  const [speedDial, setSpeedDial] = useState({
    label: '',
    destination: '',
  })

  const [speedDialList, setSpeedDialList] = useState([
    {
      label: 'Kids Playroom',
      destination: '1000',
    },
    {
      label: "Marty's Cell Phone",
      destination: '912028055054',
    },
    {
      label: "KC's Work Number",
      destination: '917032951642',
    },
  ])

  useEffect(() => {
    speedDialService
      .find()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSpeedDialList([...speedDialList, speedDial])

    setSpeedDial({
      label: '',
      destination: '',
    })
  }

  const handleDelete = (index) => {
    setSpeedDialList(speedDialList.filter((sd, idx) => idx !== index))
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent pt-2">
        <p className="navbar-brand" style={{ textTransform: 'capitalize' }}>
          {user}'s Speed Dials
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
            {speedDialList.map((sd, index) => {
              return (
                <div className="card mb-2" key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{sd.label}</h5>
                    <h6
                      className="card-subtitle mb-2 text-muted"
                      style={{ display: 'inline-block' }}
                    >
                      {sd.destination}
                    </h6>
                    <a href={`sip://${sd.destination}`} className="card-link">
                      <FontAwesomeIcon
                        icon={faPhone}
                        color="green"
                        size="2x"
                        pull="left"
                      />
                    </a>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-outline-danger my-2 my-sm-0 float-right"
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
            {/* <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>Destination</th>
                  <th scope='col'>Label</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {speedDialList.map((sd, index) => {
                  return (
                    <tr key={index}>
                      <td>{sd.destination}</td>
                      <td>{sd.label}</td>
                      <td>
                        <a href={`sip://${sd.destination}`}>
                          <FontAwesomeIcon icon={faPhone} color='green' />
                        </a>{' '}
                        <Button
                          onClick={() => deleteSpeedDial(index)}
                          className='btn btn-danger btn-sm'
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpeedDials
