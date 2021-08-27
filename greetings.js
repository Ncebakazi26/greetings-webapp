
module.exports= function greetings(pool) {
    // async function displayNames(){
    //  let users = await pool ('SELECT * from users');
    //  return users.rows;  
    // }
    async function addNames(name){
        let data = [
            name
        ];
     try {
        let results = await pool.query(`insert into users (name,counter)  
        values ($1, 1)
       returning id,name,counter`, data);
    return results.rows[0]
         
     } catch (error) {
         console.log(error)
         
     }
    }
    var regex = /[0-9]/;
    
    async function findAllNames() {
    
        const sql = `select * from users`;
        const results = await pool.query(sql);
        return results.rows
     
    }

    async function updateCounter(name) {
    
            const sql = `update users set counter = counter + 1 where name = $1`;
        await pool.query(sql, [name]);
       
    }

    async function getName(name) {
       
        const sql = `select * from users where name = $1`;
        const result = await pool.query(sql, [name]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } 
        return null;
       
    }

  async function language(name, language) {
      try {
        if(name.match(regex)){
            return  "Please enter letters only"
            
        }
        else  {
          
            name = name.charAt(0).toUpperCase() + name.slice(1);
            const isNameExist = await getName(name); // a name or null 
            if(isNameExist) {
                await updateCounter(name);
            } else {
                await addNames(name);
            }
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
      } catch (error) {
          console.log(error)
      }

       
    }
   
    async function counter() {
        const count = await findAllNames();
        return count.length;  
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
    setName: () => true,
    language,
    counter,
    message1,
    getNames: findAllNames,
    message2,
    message3,
   // displayNames,
    addNames,
    getName
    
}
}
