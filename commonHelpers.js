import{a as q,S as v,i as n}from"./assets/vendor-BjmtRwYh.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const w="https://pixabay.com/api/",E="45170254-42a85dd1494e2c1786d1d6be2";async function m(t,s=1){const o=new URLSearchParams({key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s});try{return(await q.get(w,{params:o})).data}catch(i){throw console.error("Error fetching images:",i),i}}const f=document.querySelector(".gallery");function g(t){const s=t.map(({webformatURL:i,largeImageURL:e,tags:r,likes:c,views:b,comments:L,downloads:S})=>`<div class="photo-card">
  <a class="gallery__item" href="${e}">
    <img src="${i}" alt="${r}" height="190px"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <br>${c}</b>
    </p>
    <p class="info-item">
      <b>Views: <br>${b}</b>
    </p>
    <p class="info-item">
      <b>Comments: <br>${L}</b>
    </p>
    <p class="info-item">
      <b>Downloads: <br>${S}</b>
    </p>
  </div>
</div>`).join("");f.insertAdjacentHTML("beforeend",s),new v(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function P(){f.innerHTML=""}function p(){document.querySelector(".loader").classList.remove("hidden")}function h(){document.querySelector(".loader").classList.add("hidden")}const y=document.querySelector("#search-form");document.querySelector(".gallery");const l=document.querySelector(".load-more");let u="",a=1,d=0;y.addEventListener("submit",R);async function R(t){if(t.preventDefault(),u=t.currentTarget.elements.searchQuery.value.trim(),!u){n.error({message:"Please, enter your request",position:"topRight"});return}P(),p(),l.classList.add("hidden"),a=1;try{const o=await m(u,a);d=o.totalHits,console.log("Total Hits:",d),h(),o.hits.length===0?n.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(g(o.hits),o.hits.length<15||d<=15?n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):l.classList.remove("hidden"))}catch(o){n.error({title:"Error",message:o.message}),console.error(o)}finally{h(),y.reset()}}l.addEventListener("click",async()=>{a+=1,p();try{const t=await m(u,a);t.hits.length===0||a*15>=d?(n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),l.classList.add("hidden")):(g(t.hits),a*15>=d&&l.classList.add("hidden")),$()}catch(t){n.error({title:"Error",message:t.message}),console.error(t)}finally{h()}});function $(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
