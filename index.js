let activeCategory = "1000";

const handleCategory = async ()=>{

    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()
    const categoryData = data.data

    // Tab List
    const tabList = document.getElementById("tab-list");
    categoryData.forEach(category => {
        const div = document.createElement("div")
        div.innerHTML = `
        <a onclick="handleCategoryItem('${category.category_id}')" class="btn btn-active px-6">${category.category}</a>
        `;
        tabList.appendChild(div)
    });
}

// Convert to Hour, minute, second
const convertOTime = (second) =>{
    let hours = Math.floor(second / 3600);
    let min = Math.floor((second % 3600) / 60);

    return `<div>${hours}hrs ${min}min ago</div>`
}


// Show Category Item
const handleCategoryItem = async (categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const categoryItem = await response.json()
    const categoryItemData = categoryItem.data;

    const CategoryContainer = document.getElementById("category-container")
    CategoryContainer.innerHTML = "";
    
    // loop by category item data
    categoryItemData.forEach( cardItem =>{
        const categoryCard = document.createElement("div")
        categoryCard.classList = `card card-compact bg-base-100 shadow-xl`;

        categoryCard.innerHTML = `
        <div class="relative">
            <figure class="w-full">
                <img src="${cardItem.thumbnail}" alt="" class="rounded-xl h-64 w-full" />
            </figure>

            ${cardItem.others?.posted_date && `<div class="mb-2 absolute right-4  rounded-lg bottom-2 bg-slate-950 text-white px-2 py-1">

            <p>${cardItem.others?.posted_date? convertOTime(cardItem.others.posted_date) : ''}</p>
            
            </div>`}
        </div>

            <div class="card-body mb-5">
                <div class="flex gap-4">
                    <div>
                        <div class="avatar online">
                            <div class="w-14 rounded-full">
                                <img src="${cardItem.thumbnail}" alt="">
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-xl font-medium">${cardItem.title}</h2>
                        <div class="flex gap-2 mt-4 items-center">
                            <h6 class="text-base text-gray-400">${cardItem.authors[0]?.profile_name}</h6>
                            <small>${cardItem.authors[0]?.verified === true?  "<img class='w-5 h-5'  src='image/verified.png' alt=''>" : '' }</small>
                        </div>
                        <div>
                            <h6 class="text-base text-gray-400 mt-2">${cardItem.others?.views || 0} views</h6>
                        </div>
                    </div>
                </div>
            </div>
            
        `;
        CategoryContainer.appendChild(categoryCard);
    })

    // Empty content
    const emptyContainer = document.getElementById("empty-container");
    emptyContainer.innerHTML = ""
    if(categoryItemData.length === 0){
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="image/Icon.png" alt="" class="item-center m-auto">
            <h3 class="text-2xl font-bold text-center mt-4">Oops!! Sorry, There is no <br> content here</h3>
        `;

        emptyContainer.appendChild(div);
    }

}

// sort by category
const handleSortCategory = async (categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const categoryItem = await response.json()
    const categoryItemData = categoryItem.data;
    console.log("categoryItem => ",categoryItemData)
    const sortData = categoryItemData.sort((a, b)=>{
        const viewsA = parseInt(a.others.views.replace('K', '')) ;
        const viewsB = parseInt(b.others.views.replace('K', '')) ;

        return viewsB - viewsA;
    })

    console.log("this is sorted data", sortData);


    const CategoryContainer = document.getElementById("category-container")
    CategoryContainer.innerHTML = "";
    
    // loop by category item data
    sortData.forEach( cardItem =>{
        const categoryCard = document.createElement("div")
        categoryCard.classList = `card card-compact bg-base-100 shadow-xl`;

        categoryCard.innerHTML = `
        <div class="relative">
            <figure class="w-full">
                <img src="${cardItem.thumbnail}" alt="" class="rounded-xl h-64 w-full" />
            </figure>

            ${cardItem.others?.posted_date && `<div class="mb-2 absolute right-4  rounded-lg bottom-2 bg-slate-950 text-white px-2 py-1">

            <p>${cardItem.others?.posted_date? convertOTime(cardItem.others.posted_date) : ''}</p>
            
        </div>`}
            
        </div>

            <div class="card-body mb-5">
                <div class="flex gap-4">
                    <div>
                        <div class="avatar online">
                            <div class="w-14 rounded-full">
                                <img src="${cardItem.thumbnail}" alt="">
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 class="text-xl font-medium">${cardItem.title}</h2>
                        <div class="flex gap-2 mt-4 items-center">
                            <h6 class="text-base text-gray-400">${cardItem.authors[0]?.profile_name}</h6>
                            <small>${cardItem.authors[0]?.verified === true?  "<img class='w-5 h-5'  src='image/verified.png' alt=''>" : '' }</small>
                        </div>
                        <div>
                            <h6 class="text-base text-gray-400 mt-2">${cardItem.others?.views || 0} views</h6>
                        </div>
                    </div>
                </div>
            </div>
            
        `;
})

    // Empty content
    const emptyContainer = document.getElementById("empty-container");
    emptyContainer.innerHTML = ""
    if(categoryItemData.length === 0){
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="image/Icon.png" alt="" class="item-center m-auto">
            <h3 class="text-2xl font-bold text-center mt-4">Oops!! Sorry, There is no <br> content here</h3>
        `;

        emptyContainer.appendChild(div);
    }
}


handleCategory()
handleCategoryItem("1000")