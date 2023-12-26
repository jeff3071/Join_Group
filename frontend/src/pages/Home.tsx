import React, { useState, useEffect } from 'react';
import {list_group, Group} from '../api/group';

const Home = (props: { name: string }) => {
    const [groups, setGroups] = useState<Group[]>([]);
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
                                <p>ID: {group.id}</p>
                                <p>User: {group.user}</p>
                                {group.starting_time !== null && (
                                    <p>Starting Time: {new Date(group.starting_time).toLocaleString()}</p>
                                )}
                                {group.ending_time !== null && (
                                    <p>Ending Time: {new Date(group.ending_time).toLocaleString()}</p>
                                )}
                                <p>Address: {group.address}</p>
                                <p>Latitude: {group.latitude}</p>
                                <p>Longitude: {group.longitude}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
