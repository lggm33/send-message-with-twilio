
import { input, password } from '@inquirer/prompts';
import axios from 'axios';
import twilio from "twilio"


(async() => {
    console.log("Hi, this is your personal TwilioCLI to send messages.")
    const accountSid = await input({ message: 'Please enter your account SID' });
    console.log("Thank you.")
    const authToken = await password({message: "Now, please enter your AuthToken", mask: true})

    getMessages({accountSid, authToken})
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

const sendMessageWithTwilio = async () => {
  
}

const getMessages = async (params) => {

  const {accountSid, authToken} = params  

  const client = new twilio(accountSid, authToken);

  const startDate = await input({message: 'Enter the start date (YYYY-MM-DD)'});
  const endDate = await input({message: 'Enter the end date (YYYY-MM-DD)'});

  // Lógica para obtener mensajes entre las fechas proporcionadas

  const isoStartDate = new Date(startDate).toISOString();
  const isoEndDate = new Date(endDate).toISOString();

  try {
    const messages = await client.messages.list({ 
      dateSentAfter: isoStartDate,
       dateSentBefore: isoEndDate
    });
    console.log('Messages between the specified dates:');
    console.log(messages);
  } catch (error) {
    console.log(error)
  }

  




}


