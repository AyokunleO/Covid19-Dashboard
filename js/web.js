
document.addEventListener("DOMContentLoaded", Covid);

function Covid (){
    $("#dateSpace").html(getTodaysDate());

    const entry = "https://api.covid19api.com/summary";
    fetch(entry).then((response) =>{
        return response.json()
    })
        .then((data) =>{
            console.log(data);
            // Global Statistics
            $("#NC").html(data.Global.NewConfirmed);
            $("#ND").html(data.Global.NewDeaths);
            $("#NR").html(data.Global.NewRecovered);
            $("#TC").html(data.Global.TotalCOnfirmed);
            $("#TD").html(data.Global.TotalDeaths);
            $("#TR").html(data.Global.TotalRecovered);

            // Nigeria Statistics
            $("#NCng").html(data.Countries[125].NewConfirmed);
            $("#NDng").html(data.Countries[125].NewDeaths);
            $("#NRng").html(data.Countries[125].NewRecovered);
            $("#TCng").html(data.Countries[125].TotalCOnfirmed);
            $("#TDng").html(data.Countries[125].TotalDeaths);
            $("#TRng").html(data.Countries[125].TotalRecovered);

            // Country By Country Statistics
            var county = data.Countries;
            // $("#countriesInfo").html(CountryByCountry(county));
            $(document).ready( function () {
                $('#test').DataTable();
            });
            $('#countriesInfo').html(function(){
                $('#test').append(CountryByCountry(county))
            });


            // $('#test').DataTable( {
            //     data: data,
            //     columns: [
            //         { data: 'Country' },
            //         { data: 'TotalConfirmed' },
            //         { data: 'TotalDeaths' },
            //         { data: 'TotalRecovered' },
            //         { data: 'NewDeaths' },
            //         { data: 'NewConfirmed' },
            //         { data: 'NewRecovered' }
            //     ]
            // } );
        });
    

}
var tableString;
function CountryByCountry(county){

    // tableString = `
    // <table border = "1" class = "col" id = "test">
    // <thead>
    // <tr>
    //     <th>Country</th>
    //     <th>Total Confirmed</th>
    //     <th>Total Deaths</th>
    //     <th>Total Recovered</th>
    //     <th>New Deaths</th>
    //     <th>New Confirmed</th>
    //     <th>New Recovered</th>
    // </tr>
    // </thead>
    // `;


    for(const [i, item] of county.entries()){
        tableString += `
        
        <tr>
        <td>${item.Country}</td>
        <td>${item.TotalConfirmed}</td>
        <td>${item.TotalDeaths}</td>
        <td>${item.TotalRecovered}</td>
        <td>${item.NewDeaths}</td>
        <td>${item.NewConfirmed}</td>
        <td>${item.NewRecovered}</td>
        </tr>
        `;
    }

// tableString +=`
//     </tbody>
//     </table>
// `;

return tableString;
}


// Function to get present day
function getTodaysDate() {
    
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let today = new Date();

    let dayOfWeek = weekDays[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    return `${dayOfWeek}, ${month} ${date}, ${year}`;
}