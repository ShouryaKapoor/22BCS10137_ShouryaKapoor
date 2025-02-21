const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Replace with your details
const USER_ID = 'shourya_kapoor_23072004'; // e.g., 'john_doe_17091999'
const EMAIL = 'shouryakapoor13@gmail.com';
const ROLL_NUMBER = '22BCS10137';

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) throw new Error('Invalid data format');

    const numbers = [];
    const alphabets = [];
    let highestAlphabet = [];

    data.forEach(item => {
      if (typeof item !== 'string') return;
      if (!isNaN(item)) numbers.push(item);
      else if (/^[a-zA-Z]$/.test(item)) alphabets.push(item);
    });

    if (alphabets.length > 0) {
      const highest = alphabets.reduce((max, curr) => 
        curr.toUpperCase() > max.toUpperCase() ? curr : max, alphabets[0]
      );
      highestAlphabet = [highest];
    }

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers: [],
      alphabets: [],
      highest_alphabet: []
    });
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));