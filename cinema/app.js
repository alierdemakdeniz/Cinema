let container = document.querySelector(".container")
let tickets = document.querySelector(".tickets")
let payment = document.querySelector(".payment")
let movie = document.querySelector("#movie")
const buy = document.querySelector(".buy")
let salon1 = document.querySelector(".movie-1")
let salon2 = document.querySelector(".movie-2")
let salon3 = document.querySelector(".movie-3")
getLocalStorage();


container.addEventListener("click", seatSelect)
salon2.addEventListener("click", seatSelect)
salon3.addEventListener("click", seatSelect)
movie.addEventListener("change",selectSalon)


function selectSalon(){
    if (movie.selectedIndex=== 1){
        salon1.setAttribute("style","display : block")
        salon2.setAttribute("style","display : none")
        salon3.setAttribute("style","display : none")
    }
    if (movie.selectedIndex===2){
        salon2.setAttribute("style","display : block")
        salon3.setAttribute("style","display : none")
        salon1.setAttribute("style","display : none")
        
    }
    if (movie.selectedIndex===3){
        salon3.setAttribute("style","display : block")
        salon2.setAttribute("style","display : none")
        salon1.setAttribute("style","display : none")
    }
}

buy.addEventListener("click", () => {
    if (tickets.innerHTML < 1){
        alert("Lütfen Koltuk Seçiniz !!!")
    }
    let seats = document.querySelectorAll(".row>.seat")
    seats.forEach(function (seat) {
        if (seat.className.includes("selected")) {
            seat.className = "seat reserved"
        }
        
        

    });
    
    ticketPay();

    // localStorage e kaydetmek için
    let sold = document.querySelectorAll(".row>.seat.reserved ")
    const seatsArr = [];
    const soldTikets = [];
    seats.forEach(function (seats) {
        seatsArr.push(seats)
    })
    sold.forEach(function (seats) {
        soldTikets.push(seats)
    })

    let seatsIndex = soldTikets.map(function (seat) {
        return seatsArr.indexOf(seat)
    })
    saveLocalStorage(seatsIndex);
//-----------------------------------------------------------
})
function saveLocalStorage(indexs) {
    localStorage.setItem("soldTickets", JSON.stringify(indexs))
    localStorage.setItem("movie", JSON.stringify(movie.selectedIndex))

}
function getLocalStorage() {
    const selectedMovie = JSON.parse(localStorage.getItem("movie"))
    if (selectedMovie!=null){
        movie.selectedIndex = selectedMovie
        selectSalon();
        let seats = document.querySelectorAll(".row>.seat")
        const ticketsSold = JSON.parse(localStorage.getItem("soldTickets"))
        seats.forEach(function (seat, index) {
            if (ticketsSold.indexOf(index)>-1 && ticketsSold!=null) {
                seat.classList.add("reserved")
                
            }
        })

}}
function seatSelect(e){
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        ticketPay();
    }
}
function ticketPay() {
    const selectedSeats = document.querySelectorAll(".seat.selected").length;
    
    

    tickets.innerHTML = selectedSeats - 1;
    payment.innerHTML = (selectedSeats - 1) * movie.value
   
   

}
