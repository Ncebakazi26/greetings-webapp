module.exports = function greetingRoutes(greet) {
    const greetings = require('../greetings')
    async function display(req, res) {
        const count = await greet.counter();
        res.render('index', {
            count
        });
    };
    async function greetUser(req, res) {
        try {
            var message = ""
            const name = req.body.userName;
            const language = req.body.language
            if (name && language) {
                message = await greet.language({
                    name: name,
                    language: language
                    }); // add or update the counter and return a message : Hello, world!

                console.log({ message });
            }
            if (name == "" && language === undefined) {
                req.flash('error', 'Please enter your name and choose language')
            }
            if (name !== "" && language === undefined) {

                req.flash('error', 'Please choose a language')
            }

            else if (name == "" && language) {
                req.flash('error', 'Please enter your name first');
            }
            const count = await greet.counter();
            console.log(count)
            res.render('index', {
                message,
                count
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async function showAll(req, res) {
        try {
            res.render('listName', { listName: await greet.getNames() })
        } catch (error) {
            console.log(error)
        }
    }
    async function summarySentence(req, res) {
        try {
            const name = req.params.userName
            const listOfNames = await greet.getName(name)
            console.log(listOfNames);
            res.render('counter', {
                personsName: name,
                personsCounter: listOfNames.counter,
                personCount: listOfNames.counter > 1
            });
        } catch (error) {
            console.log(error)
        }
    }
    async function refresh(req, res) {
        await greet.restart()
        res.redirect('/')
    }
    return {
        display,
        greetUser,
        showAll,
        summarySentence,
        refresh
    }
}

