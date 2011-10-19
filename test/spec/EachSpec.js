describe("each()", function() {
  var languages;
  
  beforeEach(function() {
    languages = ["Javascript", "Coffeescript", "Ruby", "Python"];
  });

  it("iterates through array", function() {
    iterations = 0;
    newArray = [];
    each(languages, function(item, index) {
      iterations++;
      newArray[index] = item;
    });
    
    expect(iterations).toEqual(languages.length);
    expect(newArray).toEqual(languages);
  });
  
  it("contains string", function() {
    containsItem = each(languages, function(language, i){
      if(language == "Coffeescript"){
        return true;
      }
    });
    expect(containsItem).toBeTruthy();
    
    containsItem = each(languages, function(language, i){
      if(language == "blah"){
        return true;
      }
    });
    expect(containsItem).toBeFalsy();
  });
  
  it("returns index of string", function() {
    indexOfRuby = each(languages, "Ruby");
    expect(indexOfRuby).toEqual(2);
  });
  
  it("filters array", function() {
    scriptingLanguages = each(languages, function(language, i, emit){
      if(language.indexOf("script") != -1){
        emit(language);
      }
    });
    exceptedArray = ["Javascript", "Coffeescript"];
    expect(scriptingLanguages).toEqual(exceptedArray);
  });

});
