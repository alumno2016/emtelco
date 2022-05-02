var json = {
    json: JSON.stringify({
        a: 1,
        b: 2
    }),
    delay: 3
};

console.log(JSON.parse(json.json))
//console.log(json)

fetch('/echo/json/', {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: 'json=' + encodeURIComponent(JSON.stringify(json.json)) + '&delay=' + json.delay
})
.then((response) => {if(response.ok){
alert("the call works successfull")}})
.then(data => console.log(json))
.catch (function (error) {
    console.log('Request failed', error);
});    