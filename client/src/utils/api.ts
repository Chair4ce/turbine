export async function callApi(method: string, path: string, data?: any) {
    console.log("posting: " + data);
    const res = await fetch(`/${path}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return res.json();
    }
}
