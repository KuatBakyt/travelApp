import React from 'react'
import { IoTrashBinSharp } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";

function PostReview({authUser, ...props}) {
  return (
    <>
      <div className="review-block" >
        <div className="review-top">
          <div className="review-profile">
            <div className="review-img">
              <img src="../img/ava.png"/>
            </div>

            <div className="review-username">
              <strong>{props.user}</strong>
            </div>

          </div>

          <div className="review-reviews">
            <IoIosStar size={25} className={props.rate>= 1 ? 'star-fill' : 'star-none'}/>
            <IoIosStar size={25} className={props.rate >= 2 ? 'star-fill' : 'star-none'}/>
            <IoIosStar size={25} className={props.rate >= 3 ? 'star-fill' : 'star-none'}/>
            <IoIosStar size={25} className={props.rate >= 4 ? 'star-fill' : 'star-none'}/>
            <IoIosStar size={25} className={props.rate >= 5 ? 'star-fill' : 'star-none'}/>
          </div>
        </div>

        <div className="review-comment">
          <p>{props.message}</p>
        </div>


      </div>
    </>
  )
}

export default PostReview