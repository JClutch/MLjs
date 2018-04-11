var sol = function(n, pop, rounds){
this.n = Number(n)
this.pop = Number(pop)
this.rounds = Number(rounds)
this.allGen = []
}

sol.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//constructs all boards
sol.prototype.start = function(){
var n = this.n
var pop = this.pop
var allGen = this.allGen
for(var j=0;j<pop;j++){
  var board = {mutate: false, queens: []}
  for(var i=0;i<n;i++){
    board[i] = new Array(n).fill(0);
  }
  var count = 0
  while(count<n){
    
    var temp = this.getRandomInt(0, Math.pow(n, 2)-1)
    var row = Math.floor(temp/n)
    var column = temp%n
    if(board[row][column] === 0){
    board.queens.push(temp)
    board[row][column] = 1
    count++  
    }

  }
  allGen.push(board)
}
}


//Need helper functions
//So far taken care of row conflicts
//Next I need to do diagnols as well as columns
sol.prototype.fitnessTest = function(board){
  var n = this.n
  var pop = this.pop
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

sol.prototype.finishCheck = function(allGen){
  var n = this.n
  var pop = this.pop
	allGen.sort((a,b) =>{
	  return a.fitnessScore - b.fitnessScore
    })
    if(allGen[0].fitnessScore === 0){
    	return true
    }
}

sol.prototype.naturalSelection = function(allGen){
  var n = this.n
  var pop = this.pop

allGen.sort((a,b) =>{
	return a.fitnessScore - b.fitnessScore
})

//breeding chance and mutation rate
var max = allGen[allGen.length-1].fitnessScore  //worst
var min = allGen[0].fitnessScore
max = max - min

allGen.forEach((val)=> {
	var mutationRate = this.getRandomInt(0, 100)
	var beedingChance = this.getRandomInt(0, 100)
	val.breedingOdds = (val.fitnessScore - min) / max
	if(mutationRate <= 75){
		val.mutate = true
	}
});

allGen.sort((a,b) =>{
	return a.breedingOdds - b.breedingOdds
})
return allGen.slice(0, pop/4)

}

sol.prototype.mutate = function(allGen){
  var n = this.n
  var pop = this.pop
  allGen.forEach((val)=>{
    if(val.mutate === true){
      var temp = this.getRandomInt(0, val.queens.length-1)
      if(val.queens[temp] < Math.pow(n,2)-5 && val.queens.indexOf(val.queens[temp] + 2)===-1){
        var newQ = val.queens[temp] + 2
      var oldQ = val.queens[temp]
      var newRow = Math.floor(newQ/n)
      var newColumn = newQ%n
      var oldRow = Math.floor(oldQ/n)
      var oldColumn = oldQ%n
      val[oldRow][oldColumn] = 0
      val[newRow][newColumn] = 1
      val.queens[temp] = newQ
      val.mutate = false
      } else if(val.queens.indexOf(val.queens[temp] - 1) === -1){
      var newQ = val.queens[temp] - 1
      var oldQ = val.queens[temp]
      var newRow = Math.floor(newQ/n)
      var newColumn = newQ%n
      var oldRow = Math.floor(oldQ/n)
      var oldColumn = oldQ%n
      val[oldRow][oldColumn] = 0
      val[newRow][newColumn] = 1
      val.queens[temp] = newQ
      val.mutate = false
      }

    }
  })
}

//breeding mechanism
sol.prototype.breeding = function(allGen){
  var n = this.n
  var pop = this.pop
  var previous = allGen.length
while(allGen.length < pop){
  // console.log('population inst big enough twilight zone?')
  var dad = this.getRandomInt(0, previous-1)
  var mom = this.getRandomInt(0, previous-1)
  if(dad !== mom){
  	var child = {mutate:false, queens: []}
    for(var i=0;i<n;i++){
      child[i] = new Array(n).fill(0);
    }
    // console.log('made a baby!!!')
    allGen[dad].queens.forEach((val)=>{
      // console.log('inside the daddy')
      if(allGen[mom].queens.indexOf(val) > -1){
        // console.log('inside mother and found matches')
        child.queens.push(val)
        var row = Math.floor(val/n)
        var column = val%n
        child[row][column] = 1
      }
      // console.log('outsde mommmy')
    })
    if(child.queens.length < allGen[dad].queens.length){
      // console.log('comparing baby to daddy')
      while(child.queens.length < allGen[dad].queens.length){
        // console.log('is this the twilight zone????????')
        var temp = this.getRandomInt(0, Math.pow(n, 2)-1)
        if(child.queens.indexOf(temp) === -1){
          var row = Math.floor(temp/n)
          var column = temp%n
          if(child[row][column] === 0){
          // console.log('inside babbbies')
            child.queens.push(temp)
            child[row][column] = 1
          // console.log('changed baby')
          }
        }

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


sol.prototype.run = function(){
  this.start()
  var n = this.n
  var pop = this.pop
  var end = this.rounds
  var allGen = this.allGen
var finished = false;
var rounds = 0
while(finished === false && rounds < end){
  console.log('rounds', rounds)
  allGen.forEach((val)=> this.fitnessTest(val))
  // console.log("inside fitnessTest")
  if(this.finishCheck(allGen)){
	  finished = true
    console.log(rounds)
    console.log(allGen[0])
    var payload = {
      board: allGen[0],
      rounds: rounds
    }
    return (payload)
  } else{
    // console.log('inside else')
      allGen = this.naturalSelection(allGen)
      // console.log('survived naturalSelection')
      this.mutate(allGen)
      // console.log('mutation hurts')
      allGen = this.breeding(allGen)
      // console.log('made babies')
  }
  rounds += 1
}
console.log('no luck')
console.log(allGen.slice(0,5))
return null
}

module.exports = sol

// var test = new sol(8, 1000, 10000)
// test.run()
// console.log('done')
//Record ->> N of 8 in less than 500 iterations



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


