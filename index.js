const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");

const client = new SFNClient({
  endpoint: 'http://localhost:8083',
  region: 'us-east-1',
  disableHostPrefix: true,
  credentials: {
    accessKeyId: 'TU_ACCESS_KEY_ID',
    secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  }
});

module.exports.startSF = async (event, context, callback) => {
  const input = {};
  const command = new StartExecutionCommand({
    input: JSON.stringify(input),
    stateMachineArn: 'arn:aws:states:us-east-1:101010101010:stateMachine:DemoStateMachine'
  });
  return await client.send(command).then(
    (data) => {
      console.log("data", data);
      callback(null, `Your state machine ${command.input.stateMachineArn} executed successfully`)
    },
    (error) => {
      console.log("error", error)
      callback(error.message);
    }
  );
};

module.exports.hello = async event => {
  console.log('hello');
  return { message: 'Hello', event };
};

module.exports.world = async event => {
  console.log('world');
  return { message: 'Final thing!!!', event };
};

module.exports.other = async event => {
  console.log('other');
  return { message: 'other', event };
};

module.exports.fill = async event => {
  console.log('fill');
  return { message: 'fill', event };
};
