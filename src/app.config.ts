export default ()=>({
    name:'linktre',
    env:process.env.ENV,
    server:{
        port : process.env.PORT
    }
});