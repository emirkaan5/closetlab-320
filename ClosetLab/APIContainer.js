import React, { useState, useEffect, Component } from 'react';
// export const base_url = "http://localhost:8000/api/" // local host, for dev, make sure to comment out before pushing
export const base_url = "https://closetlab.tech/api/"

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
    const path = 'v1/clothing-items/' + item_id;
    return fetchAPI(path);
}
export function getAllItemsForUser(user_id) {
    const path = 'v1/clothing-items-get-all/' + user_id;
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
// Don't use this for now, it has issues.
export function addItemTag(item_id, tag_data) {
    options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            tag_data
        )
    }
    return fetchAPI('v1/clothing-items/' + item_id + '/add-tag', options)
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
    const path = 'v1/outfits/' + outfit_id;
    return fetchAPI(path);
}






