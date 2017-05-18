var request = require('supertest');
describe('loading express', function() {
    var server;
    beforeEach(function() {
        server = require('./server');
    });
    // todo: closing server
    it('responds on the endpoint', function isAlive(done) {
        request(server).get('/caw/10').expect(200, done);
    });
    it('returns in json format', function isJson(done) {
        request(server)
            .get('/caw/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('provides the noises buffer', function hasNoises(done) {
        request(server)
            .get('/caw/10')
            .set('Accept', 'application/json')
            .expect(function(r) {
                var j = JSON.parse(r.text);
                if(!('noises' in j)) {
                    throw new Error('missing noises');
                }
            })
            .end(done);
    });
    it('has the proper number of caws', function hasRightCawCount(done) {
        request(server)
            .get('/caw/11')
            .set('Accept', 'application/json')
            .expect(function(r) {
                var j = JSON.parse(r.text);
                var noises = j['noises'];
                if(noises.length != 11) {
                    throw new Error('wrong count of items in noises');
                }
                for(var i = 0; i < noises.length; ++i) {
                    var thisNoise = noises[i];
                    if(thisNoise != 'caw') {
                        throw new Error(`encountered unexpected noise ${thisNoise}.`);
                    }
                }
            })
            .end(done);
    });
});
