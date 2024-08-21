
import { input, password } from '@inquirer/prompts';
import axios from 'axios';

(async() => {
    console.log("Hi, this is your personal TwilioCLI to send messages.")
    const accountSid = await input({ message: 'Please enter your account SID' });
    console.log("Thank you.")
    const authToken = await password({message: "Now, please enter your AuthToken", mask: true})

    sendMessageWithAxios({accountSid, authToken})
  }
)()

const sendMessageWithAxios = async (params) => {
  
  const {accountSid, authToken} = params


  const twilioPhoneNumber = await input({message:'Enter your Twilio Phone Number (From):'}); // Reemplaza con tu número de teléfono de Twilio
  const toPhoneNumber = await input({message:'Enter the destination phone number (To): '});  // Reemplaza con el número de teléfono del destinatario
  const messageBody = await input({message:'Enter the message to send'});

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const data = new URLSearchParams({
    From: twilioPhoneNumber,
    To: toPhoneNumber,
    Body: messageBody
  });

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }

}


