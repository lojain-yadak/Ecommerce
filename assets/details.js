const getCategoryProduct = async () => {
     try{
    const urlParameter = new URLSearchParams(window.location.search);
    const categoryName =decodeURIComponent(urlParameter.get("category")); // Ensure this matches the category name in the URL
    
    const { data } = await axios.get(`https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`);
    console.log(data);
    return data;
 }catch(error){
    return [];
 }
}

const displayProduct = async () => {
        const products = await getCategoryProduct();
        try{
         if(products.length==0){
            document.querySelector(".categories .row").innerHTML = "<p>please try again later...</p>";
            document.querySelector(".loading").classList.add("d-none");

    }
    else{
        const result = products.map((product) => {
            return `
            <title>${product.title}</title>
            <div class="productss">
            <div class="productimg">
                <img src="${product.image}" class='imageofproduct'/>
           </div>
                <h2 class="detailtitle">${product.title}</h2>
                <a href='product.html?id=${product.id}' class="detaillink">details</a>
            </div>
            `
        }).join('');

        document.querySelector(".products .row").innerHTML = result;
    }
    } catch(error){
        document.querySelector(".products .row").innerHTML =" <p>please try again later...</p>"
}finally{
    document.querySelector(".loading").classList.add("d-none");
}
custommodal();
}

displayProduct();

function custommodal(){
    const modal = document.querySelector(".my-modal");
    const closebtn = document.querySelector(".x-btn");
    const rightbtn = document.querySelector(".right-btn");
    const leftbtn = document.querySelector(".left-btn");//بتمسك اول عنصر ماخد هاد الكلاس
    const images = Array.from(document.querySelectorAll(".imageofproduct"));//بتمسك كل العناصر اللي ماخدين هاد الكلاس بتصير زي اراي بوصل لعنصر معين ب سب اوف بس ما بتعامل  معها كاراي بشكل كاملل /سؤال مقابلات كيف احول النود ليست لاراي
    let currentindex = 0;
    images.forEach(function(img){
    img.addEventListener('click',(e)=>{
     modal.classList.remove('d-none');
     modal.querySelector("img").setAttribute("src",e.target.src);
     const currentimg = e.target;
     currentindex = images.indexOf(currentimg);

    });
   });
   closebtn.addEventListener('click',(e)=>{
    modal.classList.add("d-none");
   });

  rightbtn.addEventListener('click',(e)=>{
    currentindex++;
    if(currentindex>=images.length){
        currentindex=0;
    }
    const src = images[currentindex].getAttribute("src");
    modal.querySelector("img").setAttribute("src",src);

  });
  leftbtn.addEventListener('click',(e)=>{
    currentindex--;
    if(currentindex <0){
        currentindex = images.length - 1;
    }
    const src = images[currentindex].getAttribute("src");
    modal.querySelector("img").setAttribute("src",src);

  });
  document.addEventListener("keydown" , (e)=>{
    if(e.code=="ArrowRight"){
        currentindex++;
        if(currentindex>=images.length){
            currentindex=0;
        }
        const src = images[currentindex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    
    }else if(e.code=="ArrowLeft"){
        currentindex--;
    if(currentindex <0){
        currentindex = images.length - 1;
    }
    const src = images[currentindex].getAttribute("src");
    modal.querySelector("img").setAttribute("src",src);

    }else if(e.code=="Escape"){
        modal.classList.add("d-none");
    }
  });
}
