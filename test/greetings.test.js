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

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
        
    });

    it('should pass the db test', async function(){
        
        // the Factory Function is called greetings
        let greet = greetings(pool);
        await greet.addNames({
            name : "Ncebakazi"
        });

        let greetedNames = await greet.findAllNames();
        assert.equal(1,greetedNames.length);

    });

    after(function(){
        pool.end();
    })
});