module.exports= function greetings(existingNames) {
    var regex = /[0-9]/;

    var greetObj = existingNames || {}

    function setName(name) {
        if (!name.match(regex)) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            if (greetObj[name] === undefined) {
                greetObj[name] = 0;
            }
        }
    }
    function getNames() {
        return greetObj
    }

    function language(name, language) {

        if(name.match(regex)){
            return  "Please enter letters only"
            
        }
        else  {
          
            name = name.charAt(0).toUpperCase() + name.slice(1);
            setName(name)
            if (language === 'English') {
                return "Hello " + languagename;

            }
            if (language === 'isiXhosa') {
                return "Molo " + name;

            }
            if (language === 'Sepedi') {
                return "Dumela " + name;

            }
            
        }

        
       
    }

    function counter() {
        var getCounter = Object.keys(greetObj)
        return getCounter.length
    }
  
    function messages1(name, language) {

        if (name !== "" && language===undefined ) {
            
        return "Please choose a language"   
        }
    
    }
    function message2(name, langauge) {

        if (name == "" && langauge) {
            return "Please enter your name first" 
        }
    
    }
    function message3(name, langauge) {
        
        if (name == "" &&langauge===undefined) {
          
        return "Please enter your name and choose language"
        }
    }


return {
    setName,
    language,
    counter,
    messages1,
    getNames,
    message2,
    message3
    
}
}

