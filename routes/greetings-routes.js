module.exports = function greetingRoutes(greet) {

    
    async function display(req, res) {
        const count = await greet.counter();
        res.render('index', {
            count
        });
    };
    async function greetUser(req, res, next) {
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
            res.render('index', {
                message,
                count
            });
        }
        catch (error) {
            next(error);
        }
    }
    async function showAll(req, res, next) {
        try {
            res.render('listName', { listName: await greet.getNames() })
        } catch (error) {
            next(error)
        }
    }
    async function summarySentence(req, res, next) {
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
            next(error)
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

