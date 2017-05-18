let express = require('express');
let app = express();
let port = 3000;

app.get('/caw/:caw_count', (req, res) => {
    var caw_count = parseInt(req.params['caw_count']);
    var result = []
    for(var i = 0; i < caw_count; ++i) {
        result.push('caw');
    }
    res.json({ 'noises': result });
});

app.listen(port, function() {
    console.log(`Listening on ${port}.`);
})
