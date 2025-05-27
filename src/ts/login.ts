import API from "./api";
import NotificationComponent from "./notifications";

document.querySelector('#login-button')?.addEventListener('click', async () => {
    const username = (document.querySelector('#username-input') as HTMLInputElement).value;
    const password = (document.querySelector('#password-input') as HTMLInputElement).value;

    try {
        const response = await API.post('login', { username, password });
        if(response.userId === undefined) {
            throw new Error(response.message || 'Registration failed');
        }
        
        // add a userId cookie
        document.cookie = `userId=${response.userId}; path=/; max-age=3600`; // 1 hour expiration
        window.location.href = '/pages/manager.html'; // Redirect to home page after successful login
    } catch (error) {
        console.log(error);
        NotificationComponent.error('Registration failed. Please try again. (' + error + ')');
        // Optionally show an error message to the user
    }
});