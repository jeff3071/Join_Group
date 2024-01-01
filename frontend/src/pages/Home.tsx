import React, { useState, useEffect } from 'react';
import {list_group, GroupData} from '../api/group';

const Home = (props: { name: string }) => {
    const [groups, setGroups] = useState<GroupData[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (props.name !== '' && props.name.length !== 0 && groups.length === 0) {
            list_group(setGroups, page);
        }
    }, []);

    return (
        <div>
            {props.name === '' || props.name === undefined ? (
                <div>
                    <p>You are not logged in</p>
                </div>
            ) : (
                <div>
                    <h2>Group List:</h2>
                    <ul>
                        {groups.map((group) => (
                            <li key={group.id}>
                                <p>User: {group.user?.email}</p>
                                <p>group_type: {group.group_tag}</p>
                                {group.start_time !== null && (
                                    <p>Starting Time: {new Date(group.start_time).toLocaleString()}</p>
                                )}
                                {group.end_time !== null && (
                                    <p>Ending Time: {new Date(group.end_time).toLocaleString()}</p>
                                )}
                                <p>Address: {group.address}</p>
                                <p>Latitude: {group.latitude}</p>
                                <p>Longitude: {group.longitude}</p>
                                <p>Group description: {group.group_description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
