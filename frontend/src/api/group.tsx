import { Dispatch, SetStateAction } from 'react';


export interface UserData {
    email: string;
}

export interface GroupData {
    latitude: number;
    longitude: number;
    group_tag: Array<string>; 
    name: string;
    start_time: Date;
    end_time: Date;
    address: string;
    group_name: string;
    group_description: string;
    user: UserData|null;
    id: number|null;
}


export const list_group = async (setGroups: Dispatch<SetStateAction<GroupData[]>>, page: number) => {
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
        console.log(data);
        
        setGroups(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export const create_group = async (group_data: GroupData) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('http://127.0.0.1:8000/api/group/create_group', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(
            group_data
        )
    });

    const content = await response.json();
    console.log(content);
}