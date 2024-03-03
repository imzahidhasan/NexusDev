function getById(id) {
  const element = document.getElementById(id);
  return element;
}

async function getAllPosts() {
  loadingScreen(true);
  const URL = `https://openapi.programming-hero.com/api/retro-forum/posts#`;
  const res = await fetch(URL);
  const { posts } = await res.json();
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList = "bg-[#797dfc31] rounded-xl";
    div.innerHTML = `
                <div class=" flex rounded-xl mb-4">
                <div class="w-[20%]  flex pt-10 justify-center ">
                    <div class="relative">
                        <div class="avatar">
                            <div class="badge ${
                              post.isActive ? "bg-green-500" : "bg-[#FF3434]"
                            } badge-sm absolute top-0 right-0"></div>
                            <div class="w-24 rounded">
                                <img src="${post?.image}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[80%] p-5">
                    <div class="flex gap-5 text-xl font-normal p-2">
                        <p>#${post?.category}</p>
                        <p>author:${post?.author?.name}</p>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold p-2">${post?.title}</h1>
                    </div>
                    <div>
                        <p class="text-xl font-normal pl-2">${
                          post?.description
                        }</p>
                    </div>
                    <div class=" border-b-2 border-dashed p-4 border-gray-400 mx-auto"></div>
                    <div class="flex justify-between gap-4 items-center md:p-2">
                        <div>
                            <div class="flex gap-7 ">
                                <i class="fa-regular fa-message">   ${
                                  post?.comment_count
                                }</i>
                                <i class="fa-regular fa-eye">   ${
                                  post?.view_count
                                }</i>
                                <i class="fa-regular fa-clock">   ${
                                  post?.posted_time
                                } min</i>
                            </div>
                        </div>
                        <div class="text-3xl text-green-600 mb-2">
                            <button onclick='btnClicked("${post.title.replace(
                              "'",
                              ""
                            )}", "${
      post.view_count
    }")' class="btn btn-ghost rounded-full"><i class="fa-solid fa-envelope-open-text text-green-500 text-xl"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    getById("all-posts-section").appendChild(div);
    loadingScreen(false);
  });
}
getAllPosts();
let count = 0;
function btnClicked(title, viewCount) {
  count++;
  getById("counter").innerText = count;
  const sideList = document.createElement("div");
  sideList.innerHTML = `<div class="flex justify-between items-center bg-white rounded-xl mx-4 p-2 mb-2">
                            <h1 class="w-[70%] p-2">${title}</h1>
                            <h1 class="w-30%"><i class="fa-regular text-sm fa-eye"></i> ${viewCount}</h1>
                        </div>`;
  getById("sideBar").appendChild(sideList);
}

const getLatestPost = async () => {
  loadingScreen2(true);
  const URL = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
  const res = await fetch(URL);
  const data = await res.json();
  data.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
     <div class="card w-96 bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${post?.cover_image}" 
                        class="rounded-xl" />
                </figure>
                <div class="card-body pl-9">
                    <p><i class="fa-solid fa-calendar-days"></i> ${
                      post?.author?.posted_date || "No publish date"
                    }</p>
                    <h2 class="text-3xl font-bold">${post?.title}</h2>
                    <p>${post?.description}</p>
                    <div class="flex items-center gap-4">
                        <div class="avatar">
                            <div class="w-16 rounded-full">
                                <img src="${post?.profile_image}" />
                            </div>
                        </div>
                        <div>
                            <h1>${post?.author?.name}</h1>
                            <p>${post?.author?.designation || "Unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
    `;
    getById("latestPostContainer").appendChild(div);
  });
  loadingScreen2(false);
};
getLatestPost();

getById("searchBtn").addEventListener("click", () => {
  const value = getById("searchField").value;
  getDataByCategory(value);
});

async function getDataByCategory(category) {
  loadingScreen(true);
  const URL = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`;
  const res = await fetch(URL);
  const { posts } = await res.json();
  getById("all-posts-section").innerHTML = "";
  posts.forEach((post) => {
    console.log(post);
    const div = document.createElement("div");
    div.classList = "bg-[#797dfc31] rounded-xl";
    div.innerHTML = `
                <div class=" flex rounded-xl mb-4">
                <div class="w-[20%]  flex pt-10 justify-center ">
                    <div class="relative">
                        <div class="avatar">
                            <div class="badge ${
                              post.isActive ? "bg-green-500" : "bg-[#FF3434]"
                            } badge-sm absolute top-0 right-0"></div>
                            <div class="w-24 rounded">
                                <img src="${post?.image}" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[80%] p-5">
                    <div class="flex gap-5 text-xl font-normal p-2">
                        <p>#${post?.category}</p>
                        <p>author:${post?.author?.name}</p>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold p-2">${post?.title}</h1>
                    </div>
                    <div>
                        <p class="text-xl font-normal pl-2">${
                          post?.description
                        }</p>
                    </div>
                    <div class=" border-b-2 border-dashed p-4 border-gray-400 mx-auto"></div>
                    <div class="flex justify-between gap-4 items-center md:p-2">
                        <div>
                            <div class="flex gap-7 ">
                                <i class="fa-regular fa-message">   ${
                                  post?.comment_count
                                }</i>
                                <i class="fa-regular fa-eye">   ${
                                  post?.view_count
                                }</i>
                                <i class="fa-regular fa-clock">   ${
                                  post?.posted_time
                                } min</i>
                            </div>
                        </div>
                        <div class="text-3xl text-green-600 mb-2">
                            <button onclick='btnClicked("${post.title.replace(
                              "'",
                              ""
                            )}", "${
      post.view_count
    }")' class="btn btn-ghost rounded-full"><i class="fa-solid fa-envelope-open-text text-green-500 text-xl"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    getById("all-posts-section").appendChild(div);
    loadingScreen(false);
  });
}

function loadingScreen(isLoaded) {
  if (isLoaded) {
    getById("loader").classList.remove("hidden");
  } else {
    getById("loader").classList.add("hidden");
  }
}
function loadingScreen2(isLoaded) {
  if (isLoaded) {
    getById("loader2").classList.remove("hidden");
  } else {
    getById("loader2").classList.add("hidden");
  }
}
