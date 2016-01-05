process.env.NODE_ENV = 'test';

var request = require("supertest");
var app = require("./../server");
var server;

describe('app routes', function() {
    before(function(done) {
        server = app.listen(3000, function(err, result) {
            if (err) return done(err);
            done();
        });
    });
    
    it('app should exist', function(done) {
        expect(app).to.exist;
        done();
    });

    after(function(done) {
        server.close();
        done();
    });


    describe('Request to the root path', function() {

        it('Returns a 200 status code', function(done) {
            request(app)
                .get('/')
                .expect(200, done);
        });
    });

    // describe('Request to the polls path', function() {
    //     it('Returns a 200 status code', function(done) {
    //         var stockName = 'GOOG';
    //         request(app)
    //             .get('/api/stocks/'+stockName)
    //             .expect(200, done);
    //     });
    //     it('Returns JSON format', function(done) {
    //         request(app)
    //             .get('/api/polls')
    //             .expect('Content-Type', /json/, done);
    //     });
    // });
});
