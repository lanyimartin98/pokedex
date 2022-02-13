let shiny=false;

const retrievePokemon=async (no)=>{
    if(no>0&&no<899){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${no}`);
    const pokemon = await response.json(); 
    document.getElementById('name_display').innerHTML=capitalizeLetter(pokemon.name)
    if(shiny===false){
        if(pokemon.sprites.back_default!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default}></img><img src=${pokemon.sprites.back_default} alt="No back sprite found"></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default}></img>`
        }
    }else{
        if(pokemon.sprites.back_default!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny}></img><img src=${pokemon.sprites.back_shiny} alt="No back sprite found"></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny}></img>`
        }
         }
    document.getElementById('height').innerHTML=`Height: ${pokemon.height}ft`
    document.getElementById('width').innerHTML=`Weight: ${pokemon.weight}lbs`
    document.getElementById('right_button').onclick=function(){
        retrievePokemon(no+1)
    }
    document.getElementById('left_button').onclick=function(){
        retrievePokemon(no-1)
    }
    document.getElementById('up_button').onclick=function(){
        retrievePokemon(no+10)
    }
    document.getElementById('down_button').onclick=function(){
        retrievePokemon(no-10)
    }
    document.getElementById('shiny_button').onclick=function(){
        shinySwitch(pokemon)
    }
}
}

const capitalizeLetter=word=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const shinySwitch=pokemon=>{
    if(shiny===false){
        document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny}></img><img src=${pokemon.sprites.back_shiny} alt="No back sprite found"></img>`
        shiny=true;
    }
    else{
        document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default}></img><img src=${pokemon.sprites.back_default} alt="No back sprite found"></img>`
        shiny=false;
    }
}



retrievePokemon(1)