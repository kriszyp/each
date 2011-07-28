This project provides a single multi-purpose iteration function that works across all
browsers. This function has a simple, but flexible API that allows one to use it for various purposes such
as simple iteration, mapping values, filtering, and finding items. 

The philosophy behind this module is that a single multi-purpose function (rather than a large set of different
array utility functions) takes much less code size (this module is less
than half a KB minified), and requires less API to remember as a developer. It is trivial
to memorize the each function signature, yet many complex array operations can
be performed with it. 

To simply iterate over an array, just provide an array and a callback function:

    each(array, function(item, index){
    	// This is called for each item in the array
    	// The item is the item in the array
    	// The index is index of the item in the array
    });
    
The each function also provides an emit function as the third argument to the callback that makes it possible to use it for
mapping purposes. Each time emit(value) is called, the value is appended to an array that is returned from the each function.
For example, if we wanted to take an array of strings, and return a new
array with the values parsed as JSON, we could write:

    parsedItems = each(array, function(item, index, emit){
    	emit(JSON.parse(item));
    });

Or we can use emit to filter an array. To find all the objects in array that have a
price property value under 10, we could write:

    priceUnder10 = each(array, function(item, i, emit){
    	if(item.price < 10){
    		emit(item);
    	}
    });

The emit function makes it possible to compose more advanced operations. For example
we could flatten an array of arrays to a single level array like so:

    flattenedArray = each(array, function(subArray, i, emit){
    	each(subArray, function(item){
    		emit(item)
    	});
    });

The each() function can also take a third argument designating the |this| object for the 
callback's execution. If the third argument is provided, |this| can be used in the callback.
For example:

    each(array, function(item){
    	this == myObj
    }, myObj);

The each function can be used like the ES5 every() and some() functions. The each()
callback may return a value which will cause each() to immediately exit the loop and return
that value. Any value that is not equal to undefined will cause the iteration to stop and 
be returned. For example, to determine
if an array has any item with an object with a "rating" property value equal to 5, we could:

    hasItemWithRatingOf5 = each(array, function(item, i){
    	if(item.rating == 5){
    		return true;
    	}
    });

This function will return true if any item matches the rating of 5.

The each() function can also be used to quickly find the index of a value in an array like
indexOf(). If the second argument to each() is not a function, each will search for that
value and return the index of it, returning -1 if it can not be found. For example, to
find the index of "foo" in an array, we could write:

    indexOfFoo = each(array, "foo");
    
When each() is used to find the index, one can also provide a third argument to indicate
what index to start searching at (like indexOf).

The each() function can also be applied to non-array objects, where it will iterate over
the keys in the object. This will only iterate over keys on the provided object, and will
omit keys provided from it's prototype. For example:

    obj = {
    	foo: 3,
    	bar: "value"
    };
    each(obj, function(value, propertyName){
    	// will be called for foo and bar
    });

One can still use the emit function or return values with non-array objects.
