
router.post('/post', (req, res) => {
    const data = new UserModel({
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender
    })
    try {
        const dataToSave = data.save();
        dataToSave.then(data=>res.status(200).json(data));
      
    }
    catch (error) {
        res.status(400).json({message: error.message})
        
    }
})

//Get all Method
router.get('/getAll', async(req, res) => {
    try{
        const data=await UserModel.find();
        res.send(data);
    }catch(error){
     res.status(500).send({message:error.message})
    }
  
})

//Get by ID Method
router.get('/getOne/:id', async(req, res) => {
    try{
     const data=await UserModel.findById(req.params.id);
        res.send(data);
    }catch(error){
     res.status(500).send({message:error.message});
    }
})

//Update by ID Method
router.patch('/update/:id', async(req, res) => {
    try{
      let {password,gender}=req.body;
      const updateID=req.params.id;
      const option={new:true};
      const result=await UserModel.findByIdAndUpdate(updateID,{password,gender},option);
      res.send(result);
    }catch(error){
        res.status(500).send({message:error.message});
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
      try{
      const updateID=req.params.id;
      const option={new:true};
      const result=await UserModel.findByIdAndDelete(updateID);
      res.send(result);
    }catch(error){
        res.status(500).send({message:error.message});
    }
})