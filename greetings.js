
module.exports= function greetings(pool) {
    var regex = /[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/`]/;
    async function addNames(name){
        let data = [
            name   
        ];
     try {
        let results = await pool.query(`insert into users (name,counter)  
        values ($1, 1)`, data);
    //return results.rows[0]
         
     } catch (error) {
         console.log(error)         
     }
    }
   
    async function findAllNames() {
      try {
        const results = await pool.query (`select * from users`);
        // results can be undefined if there is nothing in the database...
        if (results) {
            return results.rows
        } else {
            return [];
        }
      } catch (error) {
         console.log(error) 
      }
    }
    async function returnAllNames() {
        try {
          const sql = `select name from users`;
          const results = await pool.query(sql);
          // results can be undefined if there is nothing in the database...
          if (results) {
              return results.rows
          } else {
              return [];
          }
        } catch (error) {
           console.log(error) 
        }
      }

    async function updateCounter(name) {
        try {
            const sql = `update users set counter = counter + 1 where name = $1`;
        await pool.query(sql, [name]);
        } catch (error) {
            console.log(error)
        }
    }
    async function getName(name) {
       try {
        const sql = `select * from users where name = $1`;
        const result = await pool.query(sql, [name]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } 
        return null;
       } catch (error) {
          console.log(error) 
       }
    }

  async function language(par) {
      var name = ''
      var language = ''
      name =  par.name;
      language = par.language
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
       try {
        const count = await findAllNames();
        return count.length;
       } catch (error) {
          console.log(error) 
       }
    }
  async function restart(){ 
    const reset = await pool.query(`delete from users`);
    return reset.rows 
  }

return {
    language,
    counter,
    getNames: findAllNames,
    addNames,
    getName,
    updateCounter,
    restart,
    returnAllNames
    
}
}
