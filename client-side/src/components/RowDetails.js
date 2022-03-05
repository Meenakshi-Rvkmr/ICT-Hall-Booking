import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function RowDetails({Email,Fullname, Ictakid,Number, Id,Password, OnDelete}) {
 
  return (
    <tr>
    <th>{Email}</th>
    <td>{Fullname}</td>
    <td>{Ictakid}</td>
    <td>{Number}</td>
    <td>{Password}</td>
    <td className="gap__actions">
      <span className="badge bg-info">
        <Link to={`/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>
      </span>

      <span className="badge bg-danger" onClick={()=>OnDelete(Id)}>
        <i className="fas fa-trash-alt"></i>
      </span>
    </td>
  </tr>
  )
}

export default RowDetails