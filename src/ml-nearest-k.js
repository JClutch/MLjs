var graph = function() {
	this.types = {}
	this.allNodes = []

};

module.exports = new graph()

graph.prototype.addNode = function(node){
    //if [node[types]] ===undefined --> call new dataProcessing
    if(!node["type"]){
        node = this.newDataProcess(node)
    }


    if(this.types[node["type"]]){
       this.types[node["type"]] += 1
    } else{
        this.types[node["type"]] = 1
    }

    if(!this[node["type"]]){
      this[node["type"]] = []
    }
    this[node["type"]].push(node)
    this.allNodes.push(node)
}

graph.prototype.newDataProcess = function(node){
    node = this.newData(node)
    var neighbors = []
    var check = {}
    var keys = Object.keys(node)
    var x1 = node[keys[0]]
    var y1 = node[keys[1]]
    for(var i=0;i<this.allNodes.length;i++){
        var x2 = this.allNodes[i][keys[0]] 
        var y2 = this.allNodes[i][keys[1]]
        var x = x2-x1
        var y = y2-y1
        var z = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2))
        if(neighbors.length < 3){
            neighbors.push([z, this.allNodes[i]["type"]])
        } else if(neighbors.length === 3){
            neighbors.sort(function(a, b){
                return b-a
            })
            for(var j=0;j<neighbors.length;j++){
                if(z<neighbors[j][0]){
                    neighbors.splice(j+1,0,[z, this.allNodes[i]["type"]])
                    neighbors.splice(0,1)
                }
            }
        }
    }
    for(var k=neighbors.length-1;k>=0;k--){
        if(check[neighbors[k][1]]){
            node["type"] = neighbors[k][1]
        } else{
            check[neighbors[k][1]] = true;
        }
    }

    //maybe a check to make sure calcs worked??
    console.log("type" , node["type"])
    return node

}

module.exports.trainingData = [{"sqrft":850, "rooms":7, "type":"house"},{"sqrft":900, "rooms":7, "type":"house"},{"sqrft":1200 , "rooms":7, "type":"house"},{"sqrft":1500, "rooms":8, "type":"house"},{"sqrft":1300, "rooms":9, "type":"house"},{"sqrft":1240, "rooms":8, "type":"house"},{"sqrft":1700, "rooms":10, "type":"house"},{"sqrft":1000, "rooms":9, "type":"house"},{"sqrft":800, "rooms":1, "type":"flat"},{"sqrft":900, "rooms":3, "type":"flat"},{"sqrft":700, "rooms":2, "type":"flat"},{"sqrft":900, "rooms":1, "type":"flat"},{"sqrft":1150, "rooms":2, "type":"flat"},{"sqrft":1000, "rooms":1, "type":"flat"},{"sqrft":1200, "rooms":2, "type":"flat"},{"sqrft":1300, "rooms":1, "type":"flat"},{"sqrft":350, "rooms":1, "type":"apartment"},{"sqrft":300, "rooms":2, "type":"apartment"},{"sqrft":250, "rooms":4, "type":"apartment"},{"sqrft":500, "rooms":4, "type":"apartment"},{"sqrft":400, "rooms":4, "type":"apartment"},{"sqrft":450, "rooms":5, "type":"apartment"}]


graph.prototype.setLimits = function(arr){
    for(var key in arr[0]){
        if(key!=="type"){
            //[min, max] per key
            this[key] =[arr[0][key], arr[0][key]]
        }
    }

    for(var i=0;i<arr.length;i++){
        for(key in arr[i]){
          if(key!=="type"){
            if(arr[i][key] < this[key][0]){
                this[key][0] = arr[i][key]
            } else if (arr[i][key] > this[key][1]){
                this[key][1] = arr[i][key]
            }
          }
        }
    }
}

graph.prototype.newData = function(obj){
	for(var key in obj){
		obj[key] = obj[key]/this[key][1]
	}
	return obj
}

graph.prototype.normalize = function(arr){
    this.setLimits(arr)
    if(!this.normData){
        this.normData = []
    }
    for(var i=0;i<arr.length;i++){
        var temp = {}
        for(var key in arr[i]){
            if(key!=="type"){
              temp[key] = +((arr[i][key]/this[key][1]).toFixed(3))
            } else if(key==="type"){
              temp[key] = arr[i][key]
            }
        }
        this.normData.push(temp)
    }

    for(var j=0;j<this.normData.length;j++){
        this.addNode(this.normData[j])
    }
}

// var test = new graph()
// test.normalize(module.exports.trainingData)
// console.log('first', test.allNodes)
// test.addNode({'sqrft': 500, 'rooms': 5})
// console.log('second', test.allNodes)


