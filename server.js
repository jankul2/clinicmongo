const http=require('http');
const app=require('./app');
http.createServer(app);
app.listen(8000,()=>{
    console.log('server is working!')
})