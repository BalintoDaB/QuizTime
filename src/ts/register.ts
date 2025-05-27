import API from "./api";
import NotificationComponent from "./notifications";

document.querySelector('#register-button')?.addEventListener('click', async () => {
    const username = (document.querySelector('#username-input') as HTMLInputElement).value;
    const password = (document.querySelector('#password-input') as HTMLInputElement).value;
    const email = (document.querySelector('#email-input') as HTMLInputElement).value;

    try {
        const response = await API.post('register', { username, password, email });
        if(response.userId === undefined) {
            throw new Error(response.message || 'Registration failed');
        }
        console.log('Registration successful:', response);
        NotificationComponent.success('Registration successful! You can now log in.');
        // Optionally redirect or show a success message
    } catch (error) {
        console.log(error);
        NotificationComponent.error('Registration failed. Please try again. (' + error + ')');
        // Optionally show an error message to the user
    }
});