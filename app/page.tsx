'use client';

const sendFlexMessage = async () => {
  const flexMessageContent = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Hello from Flex Message!',
          weight: 'bold',
          size: 'lg',
        },
      ],
    },
  };

  const response = await fetch('/api/send-flex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: 'Ua094750e08a56f547b1319d5ec6a0e78', 
      messageContent: flexMessageContent,
    }),
  });

  const data = await response.json();
  if (data.success) {
    console.log('Flex message sent successfully:', data.data);
  } else {
    console.error('Error sending message:', data.error);
  }
};

const MyComponent = () => {
  return (
    <div>
      <button className="bg-gray-800 px-2 text-white" onClick={sendFlexMessage}>Send Flex Message</button>
    </div>
  );
};

export default MyComponent;
