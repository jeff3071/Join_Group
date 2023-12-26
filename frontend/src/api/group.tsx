import { Dispatch, SetStateAction } from 'react';

export interface Group {
    id: number;
    user: number;
    starting_time: Date;
    ending_time: Date;
    group_type: string;
    address: string;
    latitude: number;
    longitude: number;
    location: string | null;
}

export const list_group = async (setGroups: Dispatch<SetStateAction<Group[]>>, page: number) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await fetch('http://127.0.0.1:8000/api/group/list_group', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
             },
            credentials: 'include',
            body: JSON.stringify({
                page,
            }),
        });

        const data = await response.json();
        setGroups(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export interface GroupData {
    latitude: number;
    longitude: number;
    group_type: Array<string>; 
    name: string;
    start_time: Date;
    end_time: Date;
    address: string;
    group_name: string;
}

export const create_group = async (group_data: GroupData) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://127.0.0.1:8000/api/group/create_group', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
            group_data
        })
    });

    const content = await response.json();
}