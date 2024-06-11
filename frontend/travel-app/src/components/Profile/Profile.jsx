import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../../allcss/profile.css"
import { MdOutlineInsertComment } from "react-icons/md";
import Button from 'react-bootstrap/Button';

let Profile = ({ authUser, allCommentsCount }) => {

  let navigate = useNavigate();

  let logOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    localStorage.removeItem('useremail')
    navigate('/login')
  }

  return (
    <div className='profile-content'>
      <div className='profile-head'> <h2>Профиль</h2></div>
      <div className='profile-avatar'>
        <img src="../img/ava.png" alt="" />
      </div>
      <div className='profile-foot'>
        <div className='container'>
          <div className='profile-foot-details'>
            <div className='profile-titles'>
              <h4>{authUser.username}</h4>
              <p>{authUser.email}</p>
            </div>
            <div className='profile-detail'>
              <Link className='profile-detail-info' to="/reviews" ><MdOutlineInsertComment className="profile-icons"/> Комментарий {
                allCommentsCount == ""
                  ? "0"
                  : allCommentsCount
              }
              </Link>
            </div>
            <div className='profile-actions'>
              <NavLink to="/login" onClick={logOut}> <Button variant="secondary">Выйти</Button>{' '}</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile