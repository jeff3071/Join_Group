import React, { useState, useEffect } from 'react';

interface Group {
    id: number;
    user: number;
    starting_time: string;
    ending_time: string;
    group_type: string;
    address: string;
    latitude: number;
    longitude: number;
    location: string | null;
}

const Home = (props: { name: string }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/group/list_group', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        page,
                    }),
                });

                const data = await response.json();
                console.log(data);
                setGroups(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (props.name !== '' && props.name !== undefined) {
            fetchData();
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
                                <p>Starting Time: {group.starting_time}</p>
                                <p>Ending Time: {group.ending_time}</p>
                                <p>Address: {group.address}</p>
                                <p>Latitude: {group.latitude}</p>
                                <p>Longitude: {group.longitude}</p>
                                <p>Location: {group.location}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
