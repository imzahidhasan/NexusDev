function getById(id) {
  const element = document.getElementById(id);
  return element;
}

async function getAllPosts() {
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
                            <div class="flex gap-7  ">
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
                        <div class="text-3xl text-green-600">
                            <button class="btn btn-ghost rounded-full"><i class="fa-solid fa-envelope-open-text text-green-500 text-xl"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    getById("all-posts-section").appendChild(div);
  });
}
getAllPosts();
