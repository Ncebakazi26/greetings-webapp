const assert = require('assert');
const greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/user';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){
    let greet = greetings(pool);
    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");   
    });
    it('should add the name Ncebakazi', async function(){
        await greet.addNames({
            name : "Ncebakazi"
        });
        let greetedNames = await greet.getNames()
        assert.equal(1,greetedNames.length);
    });
    it('should add two names to the db', async function(){
        await greet.addNames({
            name : "Ncebakazi"
        });
        await greet.addNames({
            name : "Thato"
        });
        let greetedNames = await greet.getNames()
        assert.equal(2,greetedNames.length);
    });

    it('should count how many names have been greeted', async function(){
        await greet.language(" Hello Ncebakazi");
        await greet.language("Molo Thato");
        let greetedNames = await greet.counter()
        assert.equal(2, greetedNames);
    });
    it('should greet the user in English', async function(){
       // await greet.language(" Hello Ncebakazi");
        //await greet.language("Molo Thato");
       // let greetedNames = await greet.counter()
        assert.equal('Hello, Ncebakazi',await greet.language({name:"Ncebakazi", language:"English"}));
    });
    // it('should not increment counter if the same person is greeted twice', async function(){
    //     let greet = greetings(pool);
    //     await greet.getName({
    //         name : "Ncebakazi"
    //     });
    //     await greet.getName({
    //         name : "lutho"
    //     });
      
    //     let greetedNames = await greet.updateCounter(2)
    //     assert.equal(2, greetedNames);
    // });
    it('should return all the names in the db ', async function(){
        let greet = greetings(pool);
        await greet.addNames({
            name : "linamandla",
           counter: 1
        });
        await greet.addNames({
            name : "ntosh",
            counter:1
        });
        let greetedNames = await greet.getNames()
        assert.equal(["linamandla, ntosh"] , greetedNames);
    });
    after(function(){
        pool.end();
    })
});