var num = 1;
const ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['PS', 'ATK', 'DEF', 'SP. ATk', 'SP. DEF', 'SPEED'],
        datasets: [{
            label: 'STATS',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        plugins:{
            legend: {display: false},
            title: {
                display: true,
                text: "Stats"
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const fetchPokemon = () => {
    let pokemonInput = document.getElementById("pokemon");
    let pokemon = pokemonInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url).then((res) =>{
        if(res.status != 200){

        }else{
            return res.json();
        }
    }).then((data) =>{
        if(data){
            changeInformation(data);
        }
    })
}

const fetchPokemonNumber = () => {
    let pokemonInput = document.getElementById("pokemonNumber");
    let pokemon = pokemonInput.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    fetch(url).then((res) =>{
        if(res.status != 200){

        }else{
            return res.json();
        }
    }).then((data) =>{
        if(data){
            changeInformation(data);
        }
    })
}
const fetchUpDownPokemon = (mark) => {
    if(mark == '+'){
        num = num + 1;
    }else{
        num = num - 1;
    }
    const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    fetch(url).then((res) =>{
        if(res.status != 200){

        }else{
            return res.json();
        }
    }).then((data) =>{
        if(data){
            changeInformation(data);
        }
    })
}

const changeInformation = (data) =>{
    num = data.id;
    console.log(num);
    changeImage(data.sprites.front_default);
    changeName(data.name, data.id)
    changeTypes(data.types);
    changeStates(data.stats);
    changeMoves(data.moves);
    changeWeight(data.weight, data.height);
}

const changeImage = (urlImage) =>{
    const pokemonImage = document.getElementById("pokemonImage");
    pokemonImage.src = urlImage;
}

const changeName = (pokeName, number) =>{
    const pokemonName = document.getElementById("pokemonName");
    pokemonName.innerHTML = "#" + number + " " + pokeName.toUpperCase();  
    
    const pokemon = document.getElementById("pokemon");
    pokemon.value = "";
    const pokemonNumber = document.getElementById("pokemonNumber");
    pokemonNumber.value = "";
}

const changeTypes = (types) =>{
    const pokemonTypes = document.getElementById("types");
    pokemonTypes.innerHTML = "";
    for(let i = 0; i < types.length; i++){
        let p = document.createElement("p");
        let type = document.createTextNode(types[i].type.name.toUpperCase());
        p.appendChild(type);
        pokemonTypes.appendChild(p);
    }
}

const changeStates = (stats) =>{
    const valuesStats = [];
    for(let i = 0; i < stats.length; i++){
        valuesStats.push(stats[i].base_stat);

    }
    myChart.data.datasets[0].data = valuesStats;
    myChart.update();
}

const changeMoves = (moves) =>{
    const pokemonMoves = document.getElementById("moves");
    pokemonMoves.innerHTML = "";
    for(let i = 0; i < moves.length; i++){
        let moveNameP = document.createElement("p");
        let moveName = document.createTextNode(moves[i].move.name);
        moveNameP.appendChild(moveName);
        pokemonMoves.appendChild(moveNameP);
    }
}

const changeWeight = (weight, height) =>{
    const pokemonWeight = document.getElementById("weight");
    const pokemonHeight = document.getElementById("height");
    pokemonWeight.innerHTML = "Weight: " + weight;
    pokemonHeight.innerHTML = "Height: " + height;
}