const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('BFHL API is running successfully!');
});

app.post('/bfhl', (req, res) => {
    const dataArray = req.body.data;
    
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let concatAlpha = "";

    dataArray.forEach((item) => {
        if (/^\d+$/.test(item)) {
            // It's a whole number (only digits)
            let num = parseInt(item);
            if (num % 2 === 0) {
                even_numbers.push(item);
            } else {
                odd_numbers.push(item);
            }
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            // Alphabetic string
            alphabets.push(item.toUpperCase());
            concatAlpha += item;
        } else {
            // Special characters or mixed items
            special_characters.push(item);
        }
    });

    // Create reversed string with alternating caps
    const reversedConcat = concatAlpha.split('').reverse().map((ch, i) => {
        return i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
    }).join('');

    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        odd_numbers,
        even_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string: reversedConcat
    };

    res.json(response);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
