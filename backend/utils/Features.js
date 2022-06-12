class Features {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr; //to take a query from parameter which pass through api
    }
   
    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword, 
                $options: "i" //this is for case insensitive search and also if the user is not typing the whole word it is also search that product
            }
        }
        :{
            // empty if it is not found

        }
        // console.log(keyword)
        this.query = this.query.find({...keyword}); 

        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr};

        //removing some fields from cateogry
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(field => delete queryCopy[field]);

        this.query = this.query.find(queryCopy);
        return this;
    }

    //pagination and how its working 
    pagination(resultPerPage){
        //convert to number
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage*(currentPage - 1);  //resultperpage is the number of product per page and currentpage 
        // is the page number and skip is the number of product to skip (8*1) product in one page or fetch that data
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
    }
}


module.exports = Features;


