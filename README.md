# Hit Scam Endpoint

A Node.js script designed to send random registration data to scammer endpoints. This tool helps to flood scammer databases with fake data.

## Features

- Generates random user registration data
- Uses Faker.js for realistic data generation
- Automatic error handling and retry mechanism
- Configurable request delay
- Indonesian phone number format support

## Requirements

- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [https://github.com/ilhamfadheel/hit-scam-endpoint
cd hit-scam-endpoint
```

2. Install dependencies:
```bash
npm install
```

## Dependencies

- `axios`: For making HTTP requests
- `@faker-js/faker`: For generating realistic fake data
- `https-proxy-agent`: For proxy support (optional)

## Usage

Run the script:
```bash
node script.js
```

The script will:
1. Generate random user registration data
2. Send POST requests to the target endpoint
3. Log success/failure responses
4. Automatically retry on failure
5. Continue running until manually stopped

### Generated Data Format

The script generates payloads with the following structure:
```javascript
{
    username: [random username],
    mobile: [Indonesian format mobile number],
    password: [random password],
    password_confirmation: [same as password],
    transaction_password: [random password],
    sex: [1 or 2],
    invite_code: [fixed code]
}
```

### Configuration

- Default delay between requests: 2000ms (2 seconds)
- Phone numbers follow Indonesian format (starting with '081')
- Phone number length: 9-12 digits

## Warning

This tool is for educational purposes only. Use responsibly and legally.

## License

This project is for personal use only.
