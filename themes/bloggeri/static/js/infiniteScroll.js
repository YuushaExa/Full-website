var isf = document.querySelector("aside.isf");
var mnp = document.querySelector("main");
var bpg = document.querySelector(".pagination");
var npl = document.querySelector(".paginator-next-page");
let infiniteScrollObserver = new IntersectionObserver(entries => {
entries.forEach(function(entry) {
if (npl !== null) {
(async function() {
await fetch(npl.getAttribute("href")).then((response) => response.text()).then((text) => {
let parserh = new DOMParser();
let doch = parserh.parseFromString(text, "text/html");
let pst = doch.querySelector(".content");
let bpNode = document.adoptNode(pst);
npl = doch.querySelector(".paginator-next-page"); mnp.appendChild(bpNode);
});})(); 
if (document.querySelector(".pagination") !== null) {
bpg.remove();
}} else {
infiniteScrollObserver.unobserve(isf);
}});},
{ rootMargin: "120px" });
infiniteScrollObserver.observe(isf);
