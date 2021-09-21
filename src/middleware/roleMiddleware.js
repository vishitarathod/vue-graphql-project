var roleAuth=async(req,res,next)=>{
        try{
            let allow=false
            let requestMethod = req.method;
            console.log(requestMethod);
            //get resource id for given resource name 
            const resource=await Resource.findOne({resourceName:res.locals.resourceName}).select('_id')
            console.log(resource);

            //get role id for given user id
            const role=await User.findOne({_id:res.locals.userID}).select('roles')
            console.log("role : ",role)

            //get permission from above role id and resource id
            const perms=await Permission.findOne({roleID:role.roles,resourceID:resource._id})
            console.log(perms)
            if(perms){
                const {permission}=perms;
                console.log(permission)
                if (req.method == "POST" && permission.write) allow = true;
                else if (req.method == "GET" && permission.read) allow = true;
                else if (req.method == "PUT" && permission.update) allow = true;
                else if (req.method == "PATCH" && permission.update) allow = true;
                else if (req.method == "DELETE" && permission.delete) allow = true;
                console.log(allow)
            }
            if(allow){
                next();
            } else{
                throw "you are not allowed to access this resource";
            }
     
        }
        catch(e){
            console.log(e)
            res.status(400).send({message: "permission error", error: e});
        }
    }

    export default roleAuth
