let cityInput = "London";

for(var i = 0; i < $(".city").length; i++) {

    console.log($(".city").eq(i).html());

    $(".city").eq(i).on("click", function() {

        cityInput = $(this).html();


        fetchWeatherData();

        console.log(cityInput);

       
    });

}



$("form").on("submit", (e) => {

    // Prevent the default form submission behavior
    e.preventDefault();

    if($(".search").val().length === 0) {

        alert("Please type in a city name")

    } else {

        cityInput = $(".search").val()


        console.log(cityInput)

        fetchWeatherData();

    }

    $(".search").val("");

    $(".weather-app").css("opacity", "0");
})


//try to locate what day it is
function dayOfTheWeek(month, day, year) {

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wedesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]


    date = new Date(`${month}-${day}-${year}`).getDay()



    //this will out the index of the arr
    return weekday[date];
};


function fetchWeatherData() {

    fetch(`http://api.weatherapi.com/v1/current.json?key=6542d139cde9494dba292108231810 &q=${cityInput}`)

        //generate json file to js file
        .then(response => response.json())
        .then(data => {

            console.log(data);






            $(".temp").html(data.current.temp_c + "&#176;");
            $(".condition").html(data.current.condition.text)


            const date = data.location.localtime;

            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));

            const time = date.substr(11);



            $(".date").html(`${dayOfTheWeek(m, d, y)} ${d}, ${m} ${y}`);
            $(".time").html(time);

            $(".name").html(data.location.name);


            const iconId = data.current.condition.icon.substr(
                "//cdn.weatherapi.com/weather/64x64".length);




            $(".icon").attr("src", "./public/icons" + iconId);



            $(".cloud").html(data.current.cloud + "%");
            $(".humidity").html(data.current.humidity + "%")
            $(".wind").html(data.current.wind_kph + "km/h")


            let timeOfDay = "day";

            const code = data.current.condition.code;


            console.log(code)
            console.log(data.current.is_day)

            if (data.current.is_day != 1) {

                timeOfDay = "night"
            }

            console.log(timeOfDay)

            if (code == 1000) {

                $(".weather-app").css("background-image", `url('./public/images/${timeOfDay}/clear.jpg')`);

                $(".submit").css("background-color", "#e5ba92")

            

            if (timeOfDay == "night") {

                $(".submit").css("background-color", "#181e27")


            }
        }


            else if (

                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282

            ) {

                $(".weather-app").css("background-image", `url('./public/images/${timeOfDay}/cloudy.jpg')`);

                $(".submit").css("background-color", "#fa6d1b")

            

            if (timeOfDay === "night") {


                $(".submit").css("background-color", "#181e27")

            }

          } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
        ) {


                $(".weather-app").css("background-image", `url('./public/images/${timeOfDay}/rain.jpg')`);

                $(".submit").css("background-color", "#647d75");

                if(timeOfDay == "night") {

                    $(".submit").css("background-color", "#325c80");
                }

            } else {

                $(".weather-app").css("background-image", `url('./public/images/${timeOfDay}/snow.jpg')`);

                $(".submit").css("background-color", "#4d72aa");


                if (timeOfDay == "night") {

                    $(".submit").css("background-color", "#1b1b1b")
                }


            }

            $(".weather-app").css("opacity", "1");

        })


        .catch(() => {

            alert("City not found")
            $(".weather-app").css("opacity", "1");
        });


}



fetchWeatherData();
