// Entry point to the app. Configuring how RequireJS loads the rest of the app 
require.config({
    // baseUrl:"client",
    paths: {
        'jquery': 'libs/jquery/dist/jquery',
        'bootstrap-js':'libs/bootstrap/dist/js/bootstrap',
        'underscore': 'libs/underscore/underscore',
        'backbone': 'libs/backbone/backbone',
        'text': 'libs/text/text',
        'chart-js': 'libs/Chart.js/Chart.min'
    },
    shim: {
        'underscore': {
            exports: '_' //This line tells RequireJS that the script in 'lib/underscore.js' creates a global variable called _ instead of defining a module. 
        },
        'bootstrap-js':{
            deps: ['jquery'],
            exports:'bootstrap_js'
        },
        'chart-js':{
            exports: 'Chart'
        }
    }
});

require(['jquery','bootstrap-js', 'underscore', 'backbone', 'chart-js', 'router'], function($, bootstrap_js, _, Backbone, Chart,  AppRouter) {
    $(function() {
        //Global change to ajax handling
        //Any ajax call that gest a 401 error will get trapped and
        // the user will be taken to the login page
        $.ajaxSetup({
            statusCode: {
                401: function(context) {
                    // EventBus.trigger('router:navigate', {
                    //     route: 'login',
                    //     options: {
                    //         trigger: true
                    //     }
                    // });

                },
                //when token has expired
                403: function(context){
                    // EventBus.trigger("app:logout");
                    // EventBus.trigger('router:navigate', {
                    //     route: 'login',
                    //     options:{
                    //         trigger:true
                    //     }
                    // });
                }
            },
            //if the user got a token,
            //include the token in the header of all 
            //of the AJAX calls.
            //before ajax req is sent to api links
            
            
            // beforeSend: function(xhr) {
            //     var token = window.localStorage.getItem(globals.auth.TOKEN_KEY);
            //     xhr.setRequestHeader('x-access-token', token);
            // }
        });
          var router = new AppRouter();
    });
});
