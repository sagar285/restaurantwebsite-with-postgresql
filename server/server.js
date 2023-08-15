const express =require("express");
const app =express();
const db = require("./db/index");
const cors =require("cors");

app.use(express.json());
app.use(cors());

// create a restaurnat 

app.post("/restaurant",async(req,res)=>{
    const {name,location,price_range}=req.body;
    try {
        
        const results = await db.query("INSERT INTO restaurants (name,location,price_range) VALUES ($1,$2,$3) returning *",[name,location,price_range]);
        res.status(200).json(results.rows[0]);  
    } catch (error) {
       console.log(error); 
    }
})

// get all restaurant

app.get("/restaurant",async(req,res)=>{
    try {
        const results = await db.query(
            "select * from restaurants left join (select restaurant_id,count(*),TRUNC(AVG(rating),1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
        );
        res.status(200).json(results.rows);
    } catch (error) {
        console.log(error);
    }
})
// get single restaurant data

app.get("/restaurant/:id",async(req,res)=>{
    const {id}=req.params;
    try {

        const results = await db.query(
            "select * from restaurants left join (select restaurant_id,count(*),TRUNC(AVG(rating),1) as avg_rating from reviews group by restaurant_id) reviews on restaurants.id =reviews.restaurant_id where id=$1",[id]
        );
        const reviews =await db.query("select * from reviews where restaurant_id=$1",[id]);

        res.status(200).json({results:results.rows,reviews:reviews.rows});
    } catch (error) {
        console.log(error);
    }
})

// update restaurant data
app.put("/restaurant/:id",async(req,res)=>{
    const {id}=req.params;
    const {name,location,price_range}=req.body;
try {
    const results = await db.query("UPDATE restaurants SET name=$1,location =$2 ,price_range =$3 WHERE id=$4 returning *",[name,location,price_range,id]);
    res.status(200).json(results.rows[0]);
} catch (error) {
    console.log(error);
}
})

// delete a restaurant 
app.delete("/restaurant/:id",async(req,res)=>{
    const {id}=req.params;
try {
    const reviewdeleted =await db.query("DELETE from reviews WHERE restaurant_id=$1",[id]);
    const results =await db.query("DELETE FROM restaurants WHERE id=$1",[id]);
    res.status(200).json({message:"restaurant deleted succesfully"});
} catch (error) {
    console.log(error);
}
})

app.post("/restaurant/:id/addreview",async(req,res)=>{
    const {name,review,rating}=req.body;
    const {id}=req.params;
    try {
        const results = await  db.query("INSERT INTO reviews (restaurant_id,name,review,rating) VALUES($1,$2,$3,$4) returning *",[id,name,review,rating]);
        res.status(200).json(results.rows[0])
    } catch (error) {
       console.log(error); 
    }
})




app.listen(8000,()=>{
    console.log(`server listening on port no 8000`);
})