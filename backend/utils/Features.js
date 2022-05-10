class Features {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword, 
                $options: "i" //this is for case insensitive search
            }
        }
        :{
            // empty if it is not found

        }
        console.log(keyword)
        this.query = this.query.find({...keyword});

        return this;
    }
}


module.exports = Features;