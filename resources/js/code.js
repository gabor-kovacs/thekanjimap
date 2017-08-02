$(document).ready(function(){
$('#nav-icon').click(function(){
$(this).toggleClass('open');
$(nav).toggleClass('open');
});
});
function getParameterByName(name) {
var url = window.location.href;
name = name.replace(/[\[\]]/g, "\\$&");
var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var recentlist = [];
var radicals;
var jukugos;
var kanshudourl;
highlightflag = false;
function hilite() {
if (!highlightflag) {
document.getElementById("highlightgrey").style.visibility = "hidden";
document.getElementById("highlightblue").style.visibility = "visible";
highlightflag = true;
var allElements = cy.elements();
for (var x = 0; x < allElements.length; x++) {
if (allElements[x].hasClass('mainNode')){ 
var Target = allElements[x];
var hoverNodeOnyomi = Target.data('onyomi');
var predecessors = Target.predecessors();
}
}
var hoverNodeOnyomi = Target.data('onyomi');
var predecessors = Target.predecessors();
hoverNodeOnyomiTxt = ""
if(predecessors.length !=0 ){                            
for (var i = 0; i < predecessors.length; i++) {        
var onyomilist = predecessors[i].data('onyomi');    
if ((predecessors[i].isNode()) && (onyomilist != null)){
predecessorOnyomiTxt = ""
for (var j = 0; j < onyomilist.length; j++) {       
for (var k = 0; k < hoverNodeOnyomi.length; k++) {
if (onyomilist[j] == hoverNodeOnyomi[k]){   
Target.addClass('changed');
predecessors[i].addClass('changed');
if ( hoverNodeOnyomiTxt.includes(hoverNodeOnyomi[k]) == false ){ 
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.concat(hoverNodeOnyomi[k]);  
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.concat(", ");
}
predecessorOnyomiTxt = predecessorOnyomiTxt.concat(onyomilist[j]);  
predecessorOnyomiTxt = predecessorOnyomiTxt.concat(", ");
}
}
}
if (predecessorOnyomiTxt != ""){
predecessorOnyomiTxt = predecessorOnyomiTxt.slice(0, -2); 
SetOnyomiStyle(predecessors[i], predecessorOnyomiTxt);   
}
}
}
}
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.slice(0, -2); 
if(Target.hasClass('changed')){             
SetOnyomiStyle(Target, hoverNodeOnyomiTxt);
}
}
else {
document.getElementById("highlightgrey").style.visibility = "visible";
document.getElementById("highlightblue").style.visibility = "hidden";
highlightflag = false;
var allElements = cy.elements();
for (var x = 0; x < allElements.length; x++) {
if (allElements[x].hasClass('mainNode')){ 
var Target = allElements[x];
var hoverNodeOnyomi = Target.data('onyomi');
var predecessors = Target.predecessors();
}
}
for (var i = 0; i < predecessors.length; i++){
if (predecessors[i].isNode() && predecessors[i].hasClass('changed')){  
SetDefaultStyle(predecessors[i]);
}
}
if ( Target.hasClass('changed') ){ 
SetMainNodeStyle(Target);
}
cy.elements().removeClass('changed');
}
}
function resethilite() {
if ($(window).width() < 640) {
document.getElementById("highlightgrey").style.visibility = "visible";
document.getElementById("highlightblue").style.visibility = "hidden";
highlightflag = false;
}
}
function resetview() {
var allElements = cy.elements();
for (var x = 0; x < allElements.length; x++) {
if (allElements[x].hasClass('mainNode')){ 
var Target = allElements[x];
}
}
if (typeof Target != "undefined") {
var nodestoreset = Target.outgoers().add(Target.predecessors()).add(Target);
if (Target.predecessors().length == 0){   
var counter = 0;
nodestoreset.layout({
name: 'concentric', padding: 10, concentric: function( node ){
if (node == Target){
return 8;
}
else if(counter < 6){ 
counter++;
return 7;
}
else if(counter >= 6 && counter < 18){ 
counter++;
return 6;
}
else if(counter >= 18 && counter < 38){ 
counter++;
return 5;
}
else if(counter >= 38 && counter < 60){ 
counter++;
return 4;
}
else if(counter >= 60 && counter < 86){ 
counter++;
return 3;
}
else if(counter >= 86 && counter < 120){ 
counter++;
return 2;
}
else { 
return 1;
}
},levelWidth: function( nodes ){return 1;}, animate: true, animationDuration: 500
});
}
else{
nodestoreset.layout({name: 'dagre', rankDir: 'LR', animate: true, animationDuration: 500});
}
}
}
$(window).resize(function() {
if ($(window).width() > 640) {
document.getElementById("highlightgrey").style.visibility = "hidden";
document.getElementById("highlightblue").style.visibility = "hidden";
}
else {
document.getElementById("highlightgrey").style.visibility = "visible";
}
});
function UpdateKanjiInfo(trgt) {
if (trgt.hasClass("unique")) {
$('.KanjiLiteral').html(" ");
kanshudourl = "";
$("#kanshudolink").attr("href", kanshudourl);
$('#kanshudolink').html('');
}
else {
$('.KanjiLiteral').html(trgt.id());
kanshudourl = "https://www.kanshudo.com/kanji/" + trgt.id();
$("#kanshudolink").attr("href", kanshudourl);
$('#kanshudolink').html('More info & mnemonic by Kanshūdō');
}
var hexcode = string_as_unicode_escape(trgt.id());

var KanjiAnimationPath = "./resources/strokeanimations/" + hexcode + "_anim.svg"
$("#KanjiAnimation").attr('src', KanjiAnimationPath);
$("#KanjiAnimation").show()
$("#KanjiAnimation").error(function () { 
$(this).hide(); 
});
if (trgt.data('freq') != " ") {
$('#freq').html("Occurrence - " + trgt.data('freq'));
}
else{
$('#freq').html("");
}
if (trgt.data('stroke') != " ") {
$('#stroke').html("Stroke Count - " + trgt.data('stroke'));
}
else{  
$('#stroke').html("");
}     
if (trgt.data('grade') != " ") {
$('#grade').html("Grade - " + trgt.data('grade'));
}
else{  
$('#grade').html("");
}   
meaningstring = "";
for (var i = trgt.data('meaning').length - 1; i >= 0; i--) {       
meaningstring = meaningstring.concat(trgt.data('meaning')[i]);  
meaningstring = meaningstring.concat(", ");
}
meaningstring = meaningstring.slice(0, -2); 
$('#meaning').html(meaningstring);
if (trgt.data('kunyomi').length !=0 ) {
kunyomistring = "Kunyomi - ";
for (var i = trgt.data('kunyomi').length - 1; i >= 0; i--) {       
kunyomistring = kunyomistring.concat(trgt.data('kunyomi')[i]);  
kunyomistring = kunyomistring.concat(", ");
}
kunyomistring = kunyomistring.slice(0, -2); 
$('#kunyomi').html(kunyomistring);      
}
else{
$('#kunyomi').html("");   
}
if (trgt.data('onyomi').length !=0 ) {
onyomistring = "Onyomi - ";
for (var i = trgt.data('onyomi').length - 1; i >= 0; i--) {       
onyomistring = onyomistring.concat(trgt.data('onyomi')[i]);  
onyomistring = onyomistring.concat(", ");
}
onyomistring = onyomistring.slice(0, -2); 
$('#onyomi').html(onyomistring);
}
else{
$('#onyomi').html("");   
}          
if (trgt.data('nanori').length !=0 ) {
nanoristring = "Nanori - ";
for (var i = trgt.data('nanori').length - 1; i >= 0; i--) {       
nanoristring = nanoristring.concat(trgt.data('nanori')[i]);  
nanoristring = nanoristring.concat(", ");
}
nanoristring = nanoristring.slice(0, -2); 
$('#nanori').html(nanoristring);
}
else{
$('#nanori').html("");   
}        
var x = Number(trgt.data('radical'));
if (x!=0) {
$('#radical').html("Radical - " + radicals[x].radical);
$('#radicalstroke').html("Stroke Count - " + radicals[x].strokes);
$('#radicalmeaning').html("Meaning - " + radicals[x].en);
$('#radicalkun').html("Reading - " + radicals[x].jap);          
}
else{
$('#radical').html("");
$('#radicalstroke').html("");
$('#radicalmeaning').html("");
$('#radicalkun').html("");        
}
var searchVal = trgt.data('id');  
var searchField = "i";
var foundflag = false;
var prefix = 'jukugo';
for (var r = 1 ; r < 11 ; r++){
document.getElementById(prefix + r).innerHTML = "";
}
for (var z=0 ; z < jukugos.list.length ; z++){
if (jukugos.list[z][searchField] == searchVal) {
foundflag = true;
for (var b = 1 ; b < jukugos.list[z].jukugo.length + 1 ; b++){
document.getElementById(prefix + b).innerHTML = jukugos.list[z].jukugo[b-1];
}
}
}
if (foundflag == false){
for (var r = 1 ; r < 11 ; r++){
document.getElementById(prefix + r).innerHTML = "";
}
}
}
var searchedKanji = 0;
function Enterhit(e){
if(e.keyCode === 13){
e.preventDefault(); 
searchedKanji = $('#searchBar').val();
}
}
function goto(url){
window.location=url;
}
function scroll2top() {
$('html, body').animate({scrollTop : 0}, 500);
return false;
}
function scroll2info() {
$('html, body').animate({scrollTop: $("#info").offset().top}, 500);
}
function string_as_unicode_escape(input) {
function pad_four(input) {
var l = input.length;
if (l == 0) return '0000';
if (l == 1) return '000' + input;
if (l == 2) return '00' + input;
if (l == 3) return '0' + input;
return input;
}
var output = '';
for (var i = 0, l = input.length; i < l; i++)
output += '0' + pad_four(input.charCodeAt(i).toString(16));
return output;
}
function searchBarActive(){
var searchstring  = $('#searchfield');
}
function searchBarInactive(){
var searchstring  = $('#searchfield');
}
function SetMainNodeStyle(node) {
node.addClass('mainNode');
node.style({
'content': node.data('id'),
'text-valign': 'center',
'color': 'white',
'text-outline-width': 1,
'background-color': '#1a1a1a', 
'text-outline-color': '#1a1a1a',  
'border-color': '#2b99cf',
'border-width': 2
});
}
function SetOnyomiStyle(node, content) {
node.style({
'content': content,
'text-valign': 'center',
'color': '#1a1a1a',
'text-outline-width': 2,
'background-color': '#2b99cf',
'text-outline-color': '#2b99cf',   
'border-color': '#2b99cf',
'border-width': 2
});
}
function SetDefaultStyle(node) {
node.style({
'content': node.data('id'),
'text-valign': 'center',
'color': 'white',
'text-outline-width': 2,
'background-color': '#1a1a1a',
'text-outline-color': '#1a1a1a',
'border-color': '#1a1a1a',
'border-width': 2
});
}
function SelectSearched(){
if( searchedKanji != 0 ){
var selectorsting = searchedKanji.toString();
selectorsting = "[id='" + selectorsting + "']";
var allElements = cy.elements();
for (var i = 0; i < allElements.length; i++) {
if (allElements[i].hasClass('mainNode') && allElements[i].isNode() && !(allElements[i].hasClass('unique')) ){
SetDefaultStyle(allElements[i]);
}
}
cy.elements().removeClass('mainNode');
resethilite();
var newnode = cy.$(selectorsting);
if (newnode.isNode()) {
UpdateKanjiInfo(newnode);
if (newnode.hasClass("unique")) {  
$('.KanjiLiteral').html(" ");

kanshudourl = "";
$("#kanshudolink").attr("href", kanshudourl);
$('#kanshudolink').html('');
}
else {
$('.KanjiLiteral').html(newnode.id());
kanshudourl = "https://www.kanshudo.com/kanji/" + newnode.id();
$("#kanshudolink").attr("href", kanshudourl);

// $('#kanshudolink').html('Mnemonic for ' + newnode.id() + ' by Kanshūdō ');
$('#kanshudolink').html('More info & mnemonic by Kanshūdō');
}
newnode.addClass('mainNode');
var activenodes = newnode.predecessors().add(newnode).add(newnode.outgoers());
allElements.hide();
activenodes.show();
resetview();
if(!newnode.hasClass('unique')){     
SetMainNodeStyle(newnode);  
}
var hexcode = string_as_unicode_escape(searchedKanji.toString());
var KanjiAnimationPath = "./resources/strokeanimations/" + hexcode + "_anim.svg"
$("#KanjiAnimation").attr('src', KanjiAnimationPath);
$("#KanjiAnimation").show()
$("#KanjiAnimation").error(function () { 
$(this).hide(); 
});
$('#freq').html("Occurrence - " + newnode.data('freq'));
$('#stroke').html("Stroke Count - " + newnode.data('stroke'));
$('#grade').html("Grade - " + newnode.data('grade'));
if (recentlist.slice(-1).pop() != newnode.data('id')) {
recentlist.push(newnode.data('id'));
}
if (recentlist.length > 99) {
recentlist.shift();
}
}
else {
$('.KanjiLiteral').html("");
$("#KanjiAnimation").hide();
$('#freq').html("");
$('#stroke').html("");
$('#grade').html("");
$('#meaning').html("");
$('#kunyomi').html("");
$('#onyomi').html("");
$('#nanori').html("");
$('#radical').html("");
$('#radicalstroke').html("");
$('#radicalmeaning').html("");
$('#radicalkun').html("");
for (var r = 1 ; r < 11 ; r++){
document.getElementById('jukugo' + r).innerHTML = "";
} 

kanshudourl = "";
$("#kanshudolink").attr("href", kanshudourl);
$('#kanshudolink').html('');

}
}
}
function undo(){
if (recentlist.length > 1) {
recentlist.pop();
}
searchedKanji = recentlist.slice(-1).pop();
recentlist.slice(0, -1);
SelectSearched();
}
$(function(){
document.getElementById("searchBar").addEventListener("keyup", function(event) {
event.preventDefault();
if (event.keyCode == 13) {
SelectSearched();
}
});       
}); 
document.addEventListener('DOMContentLoaded', function(){ 
var cy;
var graphP = $.ajax({
url: './resources/json/kanjidic.json', 
type: 'GET',
dataType: 'json',
});
var styleP = $.ajax({
url: './resources/json/cystyle.txt', 
type: 'GET',
dataType: 'text',
});
var radicaldic = $.ajax({
url: './resources/json/radicals.json', 
type: 'GET',
dataType: 'json',
});
var jukugodic = $.ajax({
url: './resources/json/jukugo.json', 
type: 'GET',
dataType: 'json',
success: function(){
}
});
Promise.all([ graphP, styleP, radicaldic, jukugodic ]).then(initCy);
function initCy( then ){
var expJson = then[0];
var styleJson = then[1];
radicals = then[2];
jukugos = then[3];
var elements = expJson.elements;
cy = window.cy = cytoscape({
container: document.querySelector('#cy'),
style: styleJson,
elements: elements,
motionBlur: true,
boxSelectionEnabled: false,
autounselectify: true,
hideEdgesOnViewport: false,
hideLabelsOnViewport: false,
textureOnViewport: true,
pixelRatio: 1,
maxZoom : 5,
minZoom : 1
});
cy.ready(function(e){
cy.autoungrabify( true );  
$('body').addClass('loaded');
document.getElementById("cy").style.visibility = "visible";
var allElements = cy.elements();
allElements.hide();
resethilite();
var k = getParameterByName("k");
if (!k) {k = "文"};
var starternode = cy.filter('node[id = "'+k+'"]');
if (starternode.length==0) {
alert("No data for kanji "+k);
k = "文";
starternode = cy.filter('node[id = "'+k+'"]');
}
var initnodes = starternode.outgoers().add(starternode.predecessors()).add(starternode)
starternode.addClass('mainNode');
SetMainNodeStyle(starternode);
UpdateKanjiInfo(starternode);
initnodes.show();
initnodes.layout({name: 'dagre', rankDir: 'LR', animate: false, animationDuration: 500});
resetview();
for (var i = 0; i < allElements.length; i++) {
if (allElements[i].isNode()){ 
if(allElements[i].data('unique') == 1){
allElements[i].addClass("unique");    
}
}
}
$('#freq').html("Occurrence - " + starternode.data('freq'));
$('#stroke').html("Stroke Count - " + starternode.data('stroke'));
$('#grade').html("Grade - " + starternode.data('grade'));
});
cy.on('tap', 'node', function(e){
document.getElementById("searchBar").value = "";  
var allElements = cy.elements();
resethilite();
for (var i = 0; i < allElements.length; i++) {  
if (allElements[i].hasClass('mainNode') && allElements[i].isNode() && !(allElements[i].hasClass('unique')) ){ 
SetDefaultStyle(allElements[i]);
}
}
cy.elements().removeClass('mainNode');
var newnode = e.cyTarget;
newnode.addClass('mainNode');
var activenodes = newnode.predecessors().add(newnode).add(newnode.outgoers());
allElements.hide();
activenodes.show();

if (recentlist.slice(-1).pop() != newnode.data('id')) {

recentlist.push(newnode.data('id'));
}

if (recentlist.length > 99) {
recentlist.shift();
}

if (newnode.predecessors().length == 0){    
var counter = 0;
activenodes.layout({
name: 'concentric', padding: 10, concentric: function( node ){

if (node == newnode){
return 8;
}
else if(counter < 6){ 
counter++;
return 7;
}
else if(counter >= 6 && counter < 18){ 
counter++;
return 6;
}
else if(counter >= 18 && counter < 38){ 
counter++;
return 5;
}
else if(counter >= 38 && counter < 60){ 
counter++;
return 4;
}
else if(counter >= 60 && counter < 86){ 
counter++;
return 3;
}
else if(counter >= 86 && counter < 120){ 
counter++;
return 2;
}
else { 
return 1;
}
},levelWidth: function( nodes ){return 1;}, animate: true, animationDuration: 500
});
}
else{
activenodes.layout({name: 'dagre', rankDir: 'LR', animate: true, animationDuration: 500});
}
if (e.cyTarget.hasClass("unique")) {
$('.KanjiLiteral').html(" ");
}
else {
$('.KanjiLiteral').html(e.cyTarget.id());
}
UpdateKanjiInfo(e.cyTarget);
if(!newnode.hasClass('unique')){
SetMainNodeStyle(newnode);
}
});
cy.on('tap', function(e){
if( e.cyTarget === cy ){
var allElements = cy.elements();
document.getElementById("searchBar").value = "";  
}
});
cy.on('mouseover', 'node', function(event) {
if(event.cyTarget.hasClass('mainNode')){
var hoverNodeOnyomi = event.cyTarget.data('onyomi');
var predecessors = event.cyTarget.predecessors();
hoverNodeOnyomiTxt = ""
if(predecessors.length !=0 ){                              
for (var i = 0; i < predecessors.length; i++) {       
var onyomilist = predecessors[i].data('onyomi');   
if ((predecessors[i].isNode()) && (onyomilist != null)){ 
predecessorOnyomiTxt = ""
for (var j = 0; j < onyomilist.length; j++) {       
for (var k = 0; k < hoverNodeOnyomi.length; k++) {
if (onyomilist[j] == hoverNodeOnyomi[k]){        
event.cyTarget.addClass('changed');
predecessors[i].addClass('changed');
if ( hoverNodeOnyomiTxt.includes(hoverNodeOnyomi[k]) == false ){ 
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.concat(hoverNodeOnyomi[k]);  
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.concat(", ");
}
predecessorOnyomiTxt = predecessorOnyomiTxt.concat(onyomilist[j]);  
predecessorOnyomiTxt = predecessorOnyomiTxt.concat(", ");
}
}
}
if (predecessorOnyomiTxt != ""){
predecessorOnyomiTxt = predecessorOnyomiTxt.slice(0, -2); 
SetOnyomiStyle(predecessors[i], predecessorOnyomiTxt);   
}
}
}
}
hoverNodeOnyomiTxt = hoverNodeOnyomiTxt.slice(0, -2); 
if(event.cyTarget.hasClass('changed')){           
SetOnyomiStyle(event.cyTarget, hoverNodeOnyomiTxt);
}
}
});
cy.on('mouseout', 'node', function(event) {
if(event.cyTarget.hasClass('mainNode')){
var predecessors = event.cyTarget.predecessors();
resethilite();
for (var i = 0; i < predecessors.length; i++) {
if (predecessors[i].isNode() && predecessors[i].hasClass('changed')){  
SetDefaultStyle(predecessors[i]);
}
}
if ( event.cyTarget.hasClass('changed') ){  
SetMainNodeStyle(event.cyTarget);
}
cy.elements().removeClass('changed');
}
});
}
});
