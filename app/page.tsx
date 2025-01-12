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
          text: 'Test Flex Message',
          weight: 'bold',
          size: 'lg',
        },
      ],
    },
  };
  const timestamp = new Date().toISOString();
  flexMessageContent.body.contents.push({
    type: 'text',
    text: `Timestamp: ${timestamp}`,
    size: 'sm',
    color: '#aaaaaa',
    wrap: true,
  });
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  flexMessageContent.body.contents.push({
    type: 'text',
    text: `IP Address: ${ipData.ip}`,
    size: 'sm',
    color: '#aaaaaa',
    wrap: true,
  });
  
  const userId = 'Ua094750e08a56f547b1319d5ec6a0e78'; // Change this to the desired user ID
  const response = await fetch('/api/send-flex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId, 
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
      <input
        type="text"
        placeholder="Enter User ID"
        className="m-4 p-2 border rounded"
        onChange={(e) => {
          const userId = e.target.value;
          console.log('User ID:', userId);
        }}
      />
      <p className="mx-4">ถ้าเว้นว่างไว้จะส่งเข้าเครื่อง poom</p>
      <button className="m-4 bg-gray-800 px-8 text-white rounded-lg py-1.5 hover:bg-gray-900 cursor-pointer" onClick={sendFlexMessage}>ทดสอบการส่ง</button>
      <button className="m-4 bg-gray-800 px-8 text-white rounded-lg py-1.5 hover:bg-gray-900 cursor-pointer " onClick={async () => {
        const pm25Response = await fetch('https://api.waqi.info/feed/bangkok/?token=6f7ec77ee1e9ce204d9b661ff4ac1a3b986c57f5');
        const pm25Data = await pm25Response.json();
        if (pm25Data.status === 'ok') {
          const pm25Value = pm25Data.data.iaqi.pm25.v;
          const response = await fetch('/api/send-flex', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: 'Ua094750e08a56f547b1319d5ec6a0e78',
              messageContent: {
                type: 'bubble',
                body: {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: `PM2.5 Level: ${pm25Value}`,
                      size: 'lg',
                      weight: 'bold',
                    },
                  ],
                },
              },
            }),
          });

          const data = await response.json();
          if (data.success) {
            console.log('PM2.5 message sent successfully:', data.data);
          } else {
            console.error('Error sending PM2.5 message:', data.error);
          }
        } else {
          console.error('Error fetching PM2.5 data:', pm25Data.data);
        }
      }}>ส่งค่าฝุ่น</button>
      
    </div>
  );
};

export default MyComponent;
