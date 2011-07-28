// iteration function
// see http://jsperf.com/custom-foreach-vs-native-foreach for perf tests
"use strict";
(function(define){
define([], function(){
	var undefined;
	function getEmit(result){
		return function(newValue){
			// emit function adds result to return array
			result.push(newValue);
		};
	}
	return function(array, callback, thisObject){
		// create an emit function if there is enough arguments, otherwise avoid the allocation cost
		var i = 0, result, emit, length = array.length;
		if(typeof callback == "function"){
			// standard each usage, calling a callback on each item
			if(callback.length > 2){
				emit = getEmit(result = []);
			}
			if(array.length > -1){
				if(thisObject){
					// iterate over array
					do{
						// call the callback
						var newValue = callback.call(thisObject, array[i], i, emit);
						// if a value was returned, examine it
						if(newValue !== undefined){
							// defined value breaks out of loop
							return newValue;
						}
					}while(++i < length);
				}else{
					// we do a separate branch for when thisObject isn't provided because
					// it is faster to avoid the .call()
					do{
						// call the callback
						var newValue = callback(array[i], i, emit);
						// if a value was returned, examine it
						if(newValue !== undefined){
							// defined value breaks out of loop
							return newValue;
						}
					}while(++i < length);
				}
			}else{
				// not an array, iterate over an object
				for(i in array){
					if(array.hasOwnProperty(i)){
						var newValue = callback.call(thisObject, array[i], i, emit);
					}
					if(newValue !== undefined){
						// defined value breaks out of loop
						return newValue;
					}
				}  
			}
			return result;
		}
		// indexOf operation
		for(i = thisObject || 0; i < length; i++){
			if(array[i] === callback){
				return i;
			}
		}
		return -1;
	};
});
})(typeof define != "undefined" ? define : function(deps, factory){
	each = factory();
});