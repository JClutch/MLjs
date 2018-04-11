var n = 6
var pop = 500
var allGen = []
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//constructs all boards
for(var j=0;j<pop;j++){
  var board = {mutate: false}
  for(var i=0;i<n;i++){
    board[i] = new Array(n).fill(0);
  }
  var count = 0
  while(count<n){
    var temp = getRandomInt(0, Math.pow(n, 2)-1)
    var row = Math.floor(temp/n)
    var column = temp%n
    if(board[row][column] === 0){
    board[row][column] = 1
    count++  
    }

  }
  allGen.push(board)
}


//Need helper functions
//So far taken care of row conflicts
//Next I need to do diagnols as well as columns
var fitnessTest = function(board){
    var fit = 0
    var rowTester = new Array(n).fill(0);
  for(var i=0;i<n;i++){
  	for(var j =0;j<n;j++){
  		rowTester[j] += board[i][j]
  	}
    
    var foo = board[i].reduce((accum, val)=>{
        return accum + val
    })

    if(foo>1){
      fit+=foo-1  
    }
  }
  for(var k=0;k<n;k++){
  	if(rowTester[k] > 1){
  		fit += rowTester[k]-1
  	}
  }

//Major Diagnol Testing
for(var i= -3;i<n;i++){
	var temp = []
	for(var j = 0;j<n;j++){
		if(i+j<0 || i+j >= n){
		} else{
			temp.push(board[i+j][j])
		}
	}
	temp = temp.reduce((accum, val)=>{
		return accum + val
	})
	if(temp > 1){
		fit += temp-1
	}
}

//minor diagnol testing
for(var i = (2*n)-2;i>=0;i--){
	var temp = []
	for(var j =0;j<n;j++){
		if(i-j>n-1 || i-j<0){
		} else{
			temp.push(board[i-j][j])
		}
	}
    temp = temp.reduce((accum, val)=>{
		return accum + val
	})
	if(temp > 1){
		fit += temp-1
	}
}
//Lethal Mutation check
  if(board[0][0] === 0){
    board.fitnessScore = fit
  } else{
    board.fitnessScore = n*n
  }
}

var finishCheck = function(allGen){
	allGen.sort((a,b) =>{
	  return a.fitnessScore - b.fitnessScore
    })
    if(allGen[0].fitnessScore === 0){
    	return true
    }
}

var naturalSelection = function(allGen){

allGen.sort((a,b) =>{
	return a.fitnessScore - b.fitnessScore
})

//breeding chance and mutation rate
var max = allGen[allGen.length-1].fitnessScore  //worst
var min = allGen[0].fitnessScore
max = max - min

allGen.forEach((val)=> {
	var mutationRate = getRandomInt(0, 100)
	var beedingChance = getRandomInt(0, 100)
	val.breedingOdds = (val.fitnessScore - min) / max
	if(mutationRate <= 50){
		val.mutate = true
	}
});

allGen.sort((a,b) =>{
	return a.breedingOdds - b.breedingOdds
})
return allGen.slice(0, pop/10)

}

var mutate = function(allGen){
  allGen.forEach((val)=>{
    if(val.mutate === true){
      var temp = getRandomInt(0, n-1)
      if(val[temp].reduce((accum, val)=>{
        return accum + val}) > 0){
        for(var i=0;i<n;i++){
          if(val[temp][i] === 1){
            val[temp][i] === 0
            if(i<n-2){
              if(val[temp][i+2] === 0){
                val[temp][i+2] === 1
              } else if(val[temp][i+1] === 0){
                val[temp][i+1] === 1
              } else{val[temp][temp] === 1}
            } else if(i>1){
              if(val[temp][i-2] === 0){
                val[temp][i-2] === 1
              } else if(val[temp][i-1] === 0){
                val[temp][i-1] === 1
              } else{
                val[temp][temp] === 1
              }
            }
          }
        }
      }

    val.mutate = false
    }
  })
}

//breeding mechanism
var breeding = function(allGen){
previous = allGen.length
while(allGen.length < pop){
  var dad = getRandomInt(0, previous-1)
  var mom = getRandomInt(0, previous-1)
  if(dad !== mom){
  	var child = {mutate:false}
    for(var i=0;i<n;i++){
    	if(i%2===0){
    		child[i] = allGen[mom][i].slice()
    	} else{
    		child[i] = allGen[dad][i].slice()
    	}
    }
      var total = 0
      for(var j=0;j<n;j++){
      	total += child[j].reduce((accum, val)=>{
      		return accum + val
      	})
      }
      if(total === n){
      	allGen.push(child)
      }
  } 
}
return allGen
}

// allGen.forEach((val)=> fitnessTest(val))
// console.log('Hiiii', naturalSelection(allGen))

//Lethal mutation check??



var finished = false;
var rounds = 0
while(finished === false && rounds < 20000){
  console.log('rounds', rounds)

  allGen.forEach((val)=> fitnessTest(val))
  if(finishCheck(allGen)){
	  finished = true
    console.log(allGen[0])
  } else{
      allGen = naturalSelection(allGen)
      mutate(allGen)
      allGen = breeding(allGen)
  }
  rounds += 1
  if(rounds === 100 || rounds === 9999 || rounds === 30 || rounds === 20 || rounds === 10 || rounds === 1){
    console.log(rounds, allGen[0], allGen[n/2], allGen[n-1])
  }
}



// allGen.forEach((val)=> fitnessTest(val))
// allGen = naturalSelection(allGen)
// console.log('before  breeding,', allGen)
// allGen = breeding(allGen)
// console.log('after breeding, ', allGen)



//need to build mutate check and stuff right here



/*Diary so far----
Have created a random board generator with a number of board constructor
Created a complete fitness tester

Need to create a killing mechanism -- 



Need to create a mutation mechanism-- switch random spots on the board
mutation rate
mutation amount


Need to create a breeding mechanism
Need to create a check for ultimate fitness mechanism

*/



//so far tests rows
//need to test columns
//need to test diagnols both ways (major and minor)

//Need board fitness assessers

//Need Board Mutaters

//Major Diagnol
    // - x x x 0 0 0 0
    // - - x x 0 0 0 0
    // - - - x 0 0 0 0
    // - - - - 0 0 0 0

//Minor Diagnol

    // 0 0 0 0 x x x -
    // 0 0 0 0 x x - -
    // 0 0 0 0 x - - -
    // 0 0 0 0 - - - -



//check major diagnols


