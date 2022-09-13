const API_URL = 'http://localhost:3006/api';

async function httpGetSongs(orderSign, orderBy, page, perPage, where) {
    const params =  new URLSearchParams({
        orderSign,
        orderBy,
        page,
        perPage,
    });

    for (const key in where) {
        if (where[key]) 
        params.append(`where[${key}]`, where[key])
    }

    const response = await fetch(`${API_URL}/songs?` + params);

    return await response.json();
}

async function httpGetFilterData() {
    const response = await fetch(`${API_URL}/songs/get-filter-data`);
    return await response.json();
}

export {
    httpGetSongs,
    httpGetFilterData,
}