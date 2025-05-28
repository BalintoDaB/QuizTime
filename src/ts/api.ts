export default class API {
    static baseUrl: string = 'http://localhost:3001/api/';
    static async get<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl+url);
        if (!response.ok) {
            //return response.json();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    
    static async post<T>(url: string, data: any): Promise<T> {
        const response = await fetch(this.baseUrl+url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        // if (!response.ok) {
        //     //return response.json();
        //     throw new Error(await response.json().message);
        // }
        return response.json();
    }

    static async delete<T>(url: string): Promise<T> {
        const response = await fetch(this.baseUrl+url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            //return response.json();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    
}