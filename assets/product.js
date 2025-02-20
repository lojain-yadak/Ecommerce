const getProductById = async () => {
    try{
    const urlParameter = new URLSearchParams(window.location.search);
    const id = urlParameter.get('id'); // Ensure this matches the product ID in the URL

   
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return data;
    }catch(error){
        return[];
    }
}

const displayDetail = async () => {
    const product = await getProductById();
    try{
        if(product.length==0){
            document.querySelector(".categories .row").innerHTML = "<p>please try again later...</p>";
            document.querySelector(".loading").classList.add("d-none");
        }
       else{
        const result = `
            <div class="detail">
            <div class="productimage">
                <img src="${product.image}" />
            </div>
                <h2 class="producttitle">${product.title}</h2>
                <p class="productprice">Price: $${product.price}</p>
                <p class="productdescription">Description: ${product.description}</p>
                <p class="productcapacity">Capacity: ${product.Capacity}</p>
                <p class="productcategory">category: ${product.category}</p>
                <p class="productrating">rating: ${product.rating.rate}</p>
                <p class="productcount">count: ${product.rating.count}</p>

            </div>
        `;
        document.querySelector(".details .row").innerHTML = result;
    } 

}catch(error){
    document.querySelector(".categories .row").innerHTML = "<p>please try again later...</p>";

}finally{
    document.querySelector(".loading").classList.add("d-none");

}
}

displayDetail();