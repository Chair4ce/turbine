export async function callApi(method: string, path: string, data?: any) {
    const res = await fetch(`/${path}`, {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        return res;
    } else {
        return res.status;
    }
}
