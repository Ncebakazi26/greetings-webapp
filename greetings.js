module.exports= function greetings(existingNames, pool) {
    async function displayNames(){
     let users = await pool ('SELECT * from users');
     return users.rows;  
    }
    async function addNames(name){
        let data = [
            name
        ];
     try {
        let results = await pool.query(`insert into users (name,counter)  
        values ($1, 1)
        returning id, name`, data);
    return results.rows[0]
         
     } catch (error) {
         console.log(error)
         
     }
    }
    
    var regex = /[0-9]/;
    var greetObj = existingNames || {}
    function setName(name) {
        if (!name.match(regex)) {
            name = name.charAt(0).toUpperCase() + name.slice(1);
            if (greetObj[name] === undefined) {
                greetObj[name] =1;
              
            }
            else{
                greetObj[name]++;
    
            }
        }
    }
    function getNames() {
        return greetObj

    }

  async function language(name, language) {

        if(name.match(regex)){
            return  "Please enter letters only"
            
        }
        else  {
          
            name = name.charAt(0).toUpperCase() + name.slice(1);
           await addNames(name)
            if (language === 'English') {
                return "Hello " + name;

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
  
    function message1(name, language) {

        if (name !== "" && language===undefined ) {
            
        return "Please choose a language"   
        }
    
    }
    function message2(name, language) {

        if (name == "" && language) {
            return "Please enter your name first" 
        }
    
    }
    function message3(name, language) {
        
        if (name == "" &&language===undefined) {
          
        return "Please enter your name and choose language"
        }
    }


return {
    setName,
    language,
    counter,
    message1,
    getNames,
    message2,
    message3,
    displayNames,
    addNames
    
}
}

