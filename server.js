const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const key = require('./config.js')
const bodyParser = require('body-parser')

var AWS = require('aws-sdk');
AWS.config.update(key);

var dynamodb = new AWS.DynamoDB();

app.use(bodyParser.json())

app.post('/api/UpdateRecord', (req, res) => {
  console.log('what are we getting here hmmm??', req.body)
  let record = JSON.stringify(req.body)

var params = {
  TableName: "NQueens",
  Item: {
    "N": {"N" : req.body.N},
    "Record" : {"S": record},
    'Population': {"N" : req.body.population},
    'Rounds' : {"N" : req.body.rounds}
  }
}

 dynamodb.putItem(params, (err, data)=>{
  if(err) console.log(err, err.stack);
  else console.log('dis data', data)
 });
})

app.get('/api/getRecords', (req, res) => {
  var params = {
  RequestItems: {
   "NQueens" : {
     Keys: [
      {
       "N": {
         "N": "1"
        }
      }, 
      {
       "N": {
         "N": "2"
        }
      }, 
      {
       "N": {
         "N": "3"
        }
      }, 
        {
       "N": {
         "N": "4"
        }
      },
      {
       "N": {
         "N": "5"
        }
      },       
        {
        "N": {
         "N": "6"
        }
      },
      {
       "N": {
         "N": "7"
        }
      },
      {
       "N": {
         "N": "8"
        }
      },
      {
       "N": {
         "N": "9"
        }
      },
      {
       "N": {
         "N": "10"
        }
      }, 
      {
       "N": {
         "N": "11"
        }
      },
      {
       "N": {
         "N": "12"
        }
      },
      {
       "N": {
         "N": "13"
        }
      },
      {
       "N": {
         "N": "14"
        }
      } 
     ]
 }
  }
 };

dynamodb.batchGetItem(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else{
   console.log('can we grab batch data???', data.Responses.NQueens);
   res.send(data.Responses.NQueens)
 }
 })
})

 //  dynamodb.describeTable(params, function(err, data) {
 //   if (err) console.log(err, err.stack);
 //   else     console.log('this is the data', data.Table.AttributeDefinitions); 
 // });

//TESTING
// const mnist = require('mnist'); 
// const set = mnist.set(500, 100);
// const trainingSet = set.training;
// const testSet = set.test;
// const synaptic = require('synaptic');

// const Layer = synaptic.Layer;
// const Network = synaptic.Network;
// const Trainer = synaptic.Trainer;

// const inputLayer = new Layer(784);
// const hiddenLayer1 = new Layer(100);
// const outputLayer = new Layer(10);

// inputLayer.project(hiddenLayer1);
// hiddenLayer1.project(outputLayer);

// const myNetwork = new Network({
//     input: inputLayer,
//     hidden: [hiddenLayer1],
//     output: outputLayer
// });

// const trainer = new Trainer(myNetwork);
// trainer.train(trainingSet, {
//     rate: .05,
//     iterations: 10,
//     error: .05,
//     shuffle: true,
//     log: 1,
//     cost: Trainer.cost.CROSS_ENTROPY
// });

// var guess1 = myNetwork.activate(testSet[0].input)
// var answer1 = testSet[0].output
// var guess2 = myNetwork.activate(testSet[1].input)
// var answer2 = testSet[1].output
// var guess3 = myNetwork.activate(testSet[2].input)
// var answer3 = testSet[2].output

// console.log('guess: ', guess1, ' answer: ', answer1 )
// console.log('guess: ', guess2, ' answer: ', answer2 )
// console.log('guess: ', guess3, ' answer: ', answer3 )




// var correct = 0
// var total = 0
// testSet.forEach((val) => {
//   var guess = myNetwork.activate(val.input)
//   var myGuess = 0
//   // console.log("this is the whole ", guess)
//   guess.reduce((accum, val, index) => {
//     accum = accum || 0;
//     // console.log('Val???: ', val)
//     // console.log('Accum??: ', accum)
//     if(val > accum){
//       // console.log('val is greater than?')
//       accum = val
//       // console.log('what are we changing from ', myGuess, ' and what are we changing to?', index)
//       myGuess = index
//     }
//     return accum
//   })

//   var actual = val.output.indexOf(1)
//   console.log('Our guess : ', myGuess)
//   console.log('Actual : ', actual)
//   if(actual === myGuess){
//     correct += 1
//   }
//   total += 1
// })

// console.log('total: ', total, "| Correct: ", correct, "| Percentage: ", correct/total)

// // var exported = myNetwork.toJSON();
// // console.log('this is my exported network', exported)
// // console.log(myNetwork.activate(testSet[0].input));
// // console.log(testSet[0].output);
// //TESTING









 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));



   app.set('port', process.env.PORT || 80)

  const server = app.listen(app.get('port'), () => {
    console.log('running on port:' + app.get('port'))
  })
  // const host = server.address().address;
  // const port = server.address().port;