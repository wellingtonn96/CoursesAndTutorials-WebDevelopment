module.exports = function(application){

    application.get('/',(req, res)=>{

        console.log('URL: ', req.url)
        console.log('METHOD: ', req.method)
    
        req.statusCode = 200;
        res.setHeader('Content-Type', 'text/html'); 
        res.end('<h1>Olá</h1>');
    
    });
}