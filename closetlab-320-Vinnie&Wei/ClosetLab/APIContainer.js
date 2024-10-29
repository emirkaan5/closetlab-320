import React, { useState, useEffect, Component } from 'react';
// const base_url = "http://localhost:8000/api/" // local host, for dev
const base_url = "http://3.16.25.91/api/"

function fetchAPI(path, options = undefined) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        //console.log("Trying to fetch API");
        const response = await fetch(base_url + path, options);
        //console.log(response);
        const data = await response.json();
        setData(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return data;
}

export const logFetch = () => {
    return fetchAPI('test');
}

export const getItem = (item_id) => {
    path = 'v1/clothing-items/' + item_id;
    return fetchAPI(path);
}
export function getAllItemsForUser(user_id) {
    path = 'v1/clothing-items-get-all/' + user_id;
    return fetchAPI(path);
}

export const postItem = (item_data) => {
    options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item_data)
    }
    return fetchAPI('v1/clothing-items', options);
}

export const deleteItem = (item_id) => {
    options = {
        method: 'DELETE'
    }
    path = 'v1/clothing-items/' + item_id;
    return fetchAPI(path, options);
}

export const getOutfit = (outfit_id) => {
    path = 'v1/outfits/' + outfit_id;
    return fetchAPI(path);
}

export const postOutfit = (outfit_data) => {
    options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(outfit_data)
    }
    return fetchAPI('v1/outfits/', options)
}

export const deleteOutfit = (outfit_id) => {
    options = {
        method: 'DELETE'
    }
    path = 'v1/outfits/' + outfit_id;
    return fetchAPI(path);
}





