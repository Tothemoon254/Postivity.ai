import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,

});


const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from OPEN AI ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.createCompletion({
      prompt : "Please classify the following text as Positive or Negative: " + text,
      n: 1,
      max_tokens: 150,        
      stop: null,
      temperature: 0.5,
    });
   

    console.log(response);
    res.status(200).json(response.data.choices[0].text);
    

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})


export default router;