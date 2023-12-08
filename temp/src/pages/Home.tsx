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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/group/list_group', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
                                <p>Group Type: {group.group_type}</p>
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
