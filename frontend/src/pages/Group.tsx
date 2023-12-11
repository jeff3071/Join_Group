import React, {SyntheticEvent, useState} from 'react';
import {Navigate} from "react-router-dom";
import { TagInput, Input } from '@douyinfe/semi-ui';

const Group = (props: { name: string }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [group_type, setGroupType] = useState<Array<string>>([]);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [address, setAddress] = useState('');
    const [group_name, setGrupName] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/group/create_group', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                latitude,
                longitude,
                group_type,
                name: props.name,
                start_time,
                end_time,
                address,
                group_name
            })
        });

        const content = await response.json();

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

        </form>
    );
};

export default Group;