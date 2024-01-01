import React, {SyntheticEvent, useState, useEffect } from 'react';
import {Navigate} from "react-router-dom";
import { TagInput, Input, DatePicker, TextArea } from '@douyinfe/semi-ui';
import { create_group, GroupData } from '../api/group';

import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const Group = (props: { name: string }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [group_tag, setGrouptag] = useState<Array<string>>([]);
    const [start_time, setStartTime] = useState<Date>(new Date());
    const [end_time, setEndTime] = useState<Date>(new Date());
    const [address, setAddress] = useState('');
    const [group_name, setGrupName] = useState('');
    const [group_description, setGroupDescription] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const group_data: GroupData = {
            latitude,
            longitude,
            group_tag,
            name: props.name,
            start_time,
            end_time,
            address,
            group_name,
            group_description,
            id: null,
            user: null,
        };
        console.log(group_data);
        create_group(group_data);

        // setRedirect(true);
    }

    useEffect(() => {
        if (!redirect) {
            const mymap = L.map("mapid").setView([25.03418, 121.564517], 17);
            const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            L.tileLayer(OSMUrl).addTo(mymap);

            const greenIcon = new L.Icon({
                iconUrl:
                  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            mymap.on('click', function(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
                mymap.eachLayer((layer) => {
                    if (layer instanceof L.Marker) {
                        mymap.removeLayer(layer);
                    }
                });

                L.marker(e.latlng, { icon: greenIcon }).addTo(mymap);
            } );

            return () => {
                mymap.remove();
            };
        }
    }, [redirect]); 

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
                placeholder='tags'
                onChange={v => setGrouptag(v)}
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
            <TextArea placeholder='description' onChange={e => setGroupDescription(e)}/>
            <div id="mapid" style={{ height: "50vh", width: "50vw" }} />
            <button className="btn btn-primary">Create</button>
        </form>
    );
};

export default Group;