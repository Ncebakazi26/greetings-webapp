const assert = require('assert');
const greetings = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/user_tests';

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
        await greet.language({name:"Ncebakazi",language:"English"});
        await greet.language({name:"Ishmael",language:"English"});
        let greetedNames = await greet.counter()
        assert.equal(2, greetedNames);
    });
    it('should greet the user in English', async function(){
        assert.equal('Hello Ncebakazi',await greet.language({name:"Ncebakazi",language:"English"}));
    });

    it('should greet the user in isiXhosa', async function(){
        assert.equal('Molo Ncebakazi',await greet.language({name:"Ncebakazi",language:"isiXhosa"}));
    });

    it('should greet the user in isiXhosa', async function(){
        assert.equal('Dumela Ncebakazi',await greet.language({name:"Ncebakazi",language:"Sepedi"}));
    });

    it('should not increment counter if the same person is greeted twice', async function(){
        //let greet = greetings(pool);
        await greet.language({
            name : "Ncebakazi"
        });
        await greet.language({
            name : "Ncebakazi"
        });
        assert.equal(1,await greet.counter());
    });
    it('should return 2 for counter', async function(){
        //let greet = greetings(pool);
        await greet.language({
            name : "Ncebakazi"
        });
        await greet.language({
            name : "Ncebakazi"
        });
        await greet.language({
            name : "Lutho"
        });
        assert.equal(2,await greet.counter());
    });
    // it('should return all the names in the db ', async function(){
    //     let greet = greetings(pool);
    //     await greet.addNames({
    //         name : "linamandla",
    //     });
    //     // await greet.addNames({
    //     //     name : "ntosh",
    //     // });
    //     let greetedNames = await greet.getNames()
    //     assert.equal({ name: 'Linamandla', counter: 1 } , greetedNames);
    // });
    after(function(){
        pool.end();
    })
});