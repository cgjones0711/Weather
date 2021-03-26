fetch("https://api.openweathermap.org/data/2.5/forecast?q="+"Dallas"+"&appid="+"bb0b09d5ca94947c226b173fba818e45")
.then(response => response.json())
.then(function(data){
    console.log(data);

})