import React from 'react'
import right from '../Assets/right.svg'
import pending from '../Assets/pending.svg'
import round from '../Assets/round.svg'
import one from '../Assets/onesignal.svg'
import two from '../Assets/twosignal.svg'
import three from '../Assets/threesignal.svg'
import urgent from '../Assets/urgent.svg'
import no from '../Assets/no.svg'
import '../Styles/Card.css'
import Profile from './profile'
export default function Title({props}) {
    const func=(key)=>{
        switch (key) {
            case '0':
              return no;
            case '1':
              return one;
            case '2':
              return two;
            case '3':
              return three;
            case '4':
              return urgent;
            case 'In progress':
              return pending;
            case 'Todo':
              return right;
            case 'Backlog':
              return round;
            default:
              return Profile;
          }
    }
    const fun=(key)=>{
        switch (key) {
            case '0':
              return "No Priority";
            case '1':
              return "Low";
            case '2':
              return "Medium";
            case '3':
              return "High";
            case '4':
              return "Urgent";
            default:
              return key;
          }
      }
  return (
    <div className='divv'>
    &nbsp;&nbsp;&nbsp;&nbsp;
    {func(props)===Profile?<Profile props={props}/>:<img className='titleimg' src={func(props)}/>}
    &nbsp;&nbsp;&nbsp;
    {fun(props)}
    </div>
  )
}
