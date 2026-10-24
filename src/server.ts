import app from "./app";


const PORT = process.env.PORT || 3000

async function main(){
    try {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(`Error running the server: `,error);
        process.exit(1)
    }
    
}



main();