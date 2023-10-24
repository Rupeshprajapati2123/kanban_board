import React, { useEffect, useState } from 'react'
import '../Styles/Card.css'
import right from '../Assets/right.svg'
import radio from '../Assets/radio.svg'
import pending from '../Assets/pending.svg'
import round from '../Assets/round.svg'
import Profile from './profile'
import one from '../Assets/onesignal.svg'
import two from '../Assets/twosignal.svg'
import three from '../Assets/threesignal.svg'
import urgent from '../Assets/urgent.svg'
import no from '../Assets/no.svg'
export default function Card({props,users}) {
    const [icons,setIcons]=useState(right);
    const func=()=>{
            switch (props.status) {
              case "In progress":
                setIcons(pending);
                break;
              case "Backlog":
                setIcons(round);
                break;
              default:
                setIcons(right);
            }
    }
    const fun=(key)=>{
        switch (key) {
            case 0:
              return no;
            case 1:
              return one;
            case 2:
              return two;
            case 3:
              return three;
            case 4:
              return urgent;
            case 'In progress':
              return pending;
            case 'Todo':
              return right;
            case 'Backlog':
              return round;
            default:
              return one;
          }
    }
    const getName=(id)=>
    {
    const user = users.find(user => user.id === id);
    return user ? user.name : 'User not found';
    }
    useEffect(()=>{
        func();
    },[])
    
  return (
    
    <div className='car'>
    <div className='fex'>
        <p>{props.id}</p>
        <div><Profile props={getName(props.userId)}/></div>
    </div>
    <div className='desc'><img className="icon"src={icons} />&nbsp;&nbsp;<p className='para'>{props.title}</p> </div>
    <div style={{"display":"flex","alignItems":"center"}}>
    <img style={{"height":"1rem","border":"solid 1px #bec2c8", "padding":"2px","borderRadius":"4px"}}src={fun(props.priority)} alt='s'/>
    &nbsp;&nbsp;
    {props.tag.map((tags)=>{    
        return <div className='feat'><img src={radio} /><p className='feature'>{tags}</p></div>
    })}
    </div>
    </div>
  )
}
