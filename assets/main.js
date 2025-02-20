const getcatogries = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/categories`);
        return data;
    } catch (error) {
        return [];
    }
};

const limit = 3; 

const getallproducts = async () => {
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products`);
        return data;
    } catch (error) {
        return [];
    }
};

const displaycategories = async () => {
    const categories = await getcatogries();
    try {
        if (categories.length == 0) {
            document.querySelector(".categories .row").innerHTML = "<p>please try again later...</p>";
            document.querySelector(".loading").classList.add("d-none");
        } else {
            const result = categories.map(category => `
                <div class='category'>
                    <h2 class="nameproduct">${category}</h2>
                    <a href="./details.html?category=${encodeURIComponent(category)}" class='det'>view page</a>
                </div>
            `).join('');
            document.querySelector(".categories .row").innerHTML = result;
        }
    } catch (error) {
        document.querySelector(".categories .row").innerHTML = "<p>404 Not found</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
};
displaycategories();

const displayallproducts = async (page = 1) => {
    const products = await getallproducts();
    const skip = (page - 1) * limit;
    const paginatedProducts = products.slice(skip, skip + limit);

    try {
        if (products.length == 0) {
            document.querySelector(".allproducts .row").innerHTML = "<p>please try again later...</p>";
            document.querySelector(".loading").classList.add("d-none");
        } else {
            const result = paginatedProducts.map(product => `
                <div class='product1'>
                    <h2 class="nameproducts">${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" class="productimage">
                    <a href="./product.html?id=${encodeURIComponent(product.id)}" class='deta'>details</a>
                </div>
            `).join('');
            document.querySelector(".allproducts .row").innerHTML = result;
            
            const numberOfPages = Math.ceil(products.length / limit);
            let paginationButtons = ``;
            
            if (page > 1) {
                paginationButtons += `<button onclick="displayallproducts(${page - 1})">&lt;</button>`;
            } else {
                paginationButtons += `<button disabled>&lt;</button>`;
            }
            
            for (let i = 1; i <= numberOfPages; i++) {
                paginationButtons += `<button onclick="displayallproducts(${i})" class="${page === i ? 'active' : ''}">${i}</button>`;
            }
            
            if (page < numberOfPages) {
                paginationButtons += `<button onclick="displayallproducts(${page + 1})">&gt;</button>`;
            } else {
                paginationButtons += `<button disabled>&gt;</button>`;
            }
            
            document.querySelector('.pagination').innerHTML = paginationButtons;
        }
    } catch (error) {
        document.querySelector(".allproducts .row").innerHTML = "<p>404 Not found</p>";
    } finally {
        document.querySelector(".loading").classList.add("d-none");
    }
};

displayallproducts();

window.onscroll = () => {
    const header = document.querySelector('header');
    const about = document.querySelector('.hero');

    if (window.scrollY >= about.offsetTop) {
        header.classList.add("headeronscroll");
    } else {
        header.classList.remove("headeronscroll");
    }
};