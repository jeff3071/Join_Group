import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from "react-router-dom";
import { TagInput, Input, DatePicker } from '@douyinfe/semi-ui';
import { create_group, GroupData } from '../api/group';

const Group = (props: { name: string }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [group_type, setGroupType] = useState<Array<string>>([]);
    const [start_time, setStartTime] = useState<Date>(new Date());
    const [end_time, setEndTime] = useState<Date>(new Date());
    const [address, setAddress] = useState('');
    const [group_name, setGrupName] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const group_data: GroupData = {
            latitude,
            longitude,
            group_type,
            name: props.name,
            start_time,
            end_time,
            address,
            group_name
        };
        create_group(group_data);

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/"/>;
    }

    return (
        <form onSubmit={submit}>
            <h1>Create Group</h1>

            <Input className="form-control" placeholder="Group name" required
                   onChange={e => setGrupName(e)}
            />
            <TagInput
                defaultValue={['test', 'test1', 'test2']}
                placeholder='tags'
                onChange={v => setGroupType(v)}
            />

            <Input className="form-control" placeholder="Address" required
                    onChange={e => setAddress(e)}
            />
            
            <DatePicker
                type="dateTimeRange"
                placeholder="Select date"
                onChange={(time: Date | Date[] | string | string[] | undefined) => {
                    if (Array.isArray(time)) {
                        if(time[0] instanceof Date && time[1] instanceof Date){
                            setStartTime(time[0]);
                            setEndTime(time[1]);
                        }
                    }
                }}
            />
        </form>
    );
};

export default Group;