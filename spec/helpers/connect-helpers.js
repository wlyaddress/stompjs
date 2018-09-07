id = 0;

stompClient = function () {
  const myId= ++id;

  const stompConfig = {
    connectHeaders: {
      login: TEST.login,
      passcode: TEST.password
    },
    brokerURL: TEST.url,
    debug: function (str) {
      console.log('CLIENT ' + myId + ': ' + str);
    },
    reconnectDelay: 0
  };
  const client = new StompJs.Client(stompConfig);
  return client;
};

badStompClient = function () {
  const client = stompClient();
  // brokerURL is also provided, in this case webSocketFactory should get used
  client.webSocketFactory = function () {
    return new WebSocket(TEST.badUrl);
  };
  return client;
};

disconnectStomp = function (client) {
  if (client) {
    client.deactivate();
    client = null;
  }
};
