export async function callApi(method: string, path: string, data?: any) {
    const res = await fetch(`/${path}`, {
        method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        return res.json();
    }
}
