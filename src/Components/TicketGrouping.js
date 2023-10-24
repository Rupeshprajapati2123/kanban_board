import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDataFetching } from '../Context/DataFetchingContext';
import { useTicketFunctions } from '../Context/TicketFunctionsContext';
import { orderOptions, groupingOptions } from './options';
import Card from './Card';
import '../Styles/App.css';
import settings from '../Assets/settings.svg'
import down from '../Assets/down.svg'
import Title from './title';
import dot from '../Assets/plus.svg';
import no from '../Assets/no.svg';
export default function TicketGrouping() {
    const { tickets, users } = useDataFetching();
    const { groupByStatus, groupByUser, groupByPriority, sortTickets } = useTicketFunctions();
    const [group, setGroup] = useState('status');
    const [order, setOrder] = useState('asc');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const savedgroup = localStorage.getItem('group');
        const savedorder = localStorage.getItem('order');
        if (savedgroup) {
            setGroup(savedgroup);
        }
        if (savedorder) {
            setOrder(savedorder);
        }
    }, []);
    const groupTickets = () => {
        switch (group) {
            case 'status':
                return groupByStatus(tickets);
            case 'user':
                return groupByUser(tickets, users);
            case 'priority':
                return groupByPriority(tickets);
            default:
                return {};
        }
    };
    const stickets = () => {
        const grouped = groupTickets();
        for (const key in grouped) {
            grouped[key] = sortTickets(grouped[key], order);
        }
        return grouped;
    };
    const handlegroupChange = (selectedOption) => {
        setGroup(selectedOption.value);
        localStorage.setItem('group', selectedOption.value);
    };

    const handleorderChange = (selectedOption) => {
        setOrder(selectedOption.value);
        localStorage.setItem('order', selectedOption.value);
    };
    return (
        <div>
            <div className='nav'>
            <button className='button' onClick={() => setOpen(!open)}><img src={settings} />&nbsp;&nbsp;Display&nbsp;&nbsp;<img src={down} /></button>
            {open && <div className='select-flex'>
                    <div className="select-container">
                        <div className="select-label">Grouping</div>
                        <Select
                            className='selector'
                            options={groupingOptions}
                            value={groupingOptions.find((option) => option.value === group)}
                            onChange={handlegroupChange}
                        />
                    </div>
                    <div className="select-container">
                        <div className="select-label">Ordering &nbsp;</div>
                        <Select
                            className='selector'
                            options={orderOptions}
                            value={orderOptions.find((option) => option.value === order)}
                            onChange={handleorderChange}
                        />
                    </div>
                </div>}
                </div>
            <div className='full'>
                
                {Object.keys(stickets()).map((groupKey) => (
                    <div key={groupKey}>
                        
                        <div className='group'>
                        <div style={{"display":"flex","alignItems":"center"}}>
                        <h3><Title props={groupKey} /></h3>&nbsp;&nbsp;
                        <p style={{"color":"#777d87","fontFamily":"Inter"}}>{stickets()[groupKey].length}</p>
                        </div>
                        <div>
                        <img className="image" src={dot} />
                        &nbsp;&nbsp;
                        <img className="image" src={no} />
                        </div>
                        </div>
                        <div>
                            {stickets()[groupKey].map((ticket) => (
                                <div key={ticket.id}><Card props={ticket} users={users} /> </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
