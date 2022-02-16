
//GLobal variables
let shiny=true;
let chosen='weight'

const retrievePokemon=async (no)=>{
    if(no>0&&no<899){

        //API call
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${no}`);
        const pokemon = await response.json(); 

        //Resetting
        document.getElementById('backward').onclick=function(){ }
        document.getElementById('forward').onclick=function(){ }
        document.getElementById('small_display').innerHTML=''
        document.getElementById('prim_type').classList.remove(document.getElementById('prim_type').classList[1])
        document.getElementById('sec_type').classList.remove(document.getElementById('sec_type').classList[1])

        //SpriteLoadUp
        spriteLoad(pokemon)

        //Primary type assignment
        document.getElementById('prim_type').innerHTML=`<span class="type_text">${capitalizeLetter(pokemon.types[0].type.name)}</span>`
        document.getElementById('prim_type').classList.add(pokemon.types[0].type.name)

        //Secondary type assignment
        if(pokemon.types.length===2){   
            document.getElementById('sec_type').classList.add(pokemon.types[1].type.name)
            document.getElementById('sec_type').innerHTML=`<span class="type_text">${capitalizeLetter(pokemon.types[1].type.name)}</span>`
        }else{
            document.getElementById('sec_type').classList.add('none')
            document.getElementById('sec_type').innerHTML='<span class="type_text">None</span>'
        }

        //Button assignments

        //Joystick
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

        //Other
        document.getElementById('shiny_button').onclick=function(){
            spriteLoad(pokemon)
        }

        //Blue buttons
        document.getElementById('height').onclick=function(){
            document.getElementById('small_display').innerHTML=`Height: ${pokemon.height}ft`
        }

        document.getElementById('weight').onclick=function(){
            document.getElementById('small_display').innerHTML=`Weight: ${pokemon.weight}lbs`
        }

        document.getElementById('hp').onclick=function(){
            document.getElementById('small_display').innerHTML=`HP: ${pokemon.stats[0].base_stat}`
        }

        document.getElementById('attack').onclick=function(){
            document.getElementById('small_display').innerHTML=`Attack: ${pokemon.stats[1].base_stat}`
        }

        document.getElementById('defense').onclick=function(){
            document.getElementById('small_display').innerHTML=`Defense: ${pokemon.stats[2].base_stat}`
        }

        document.getElementById('special_attack').onclick=function(){
            document.getElementById('small_display').innerHTML=`Special attack: ${pokemon.stats[3].base_stat}`
        }

        document.getElementById('special_defense').onclick=function(){
            document.getElementById('small_display').innerHTML=`Special defense: ${pokemon.stats[4].base_stat}`
        }

        document.getElementById('speed').onclick=function(){
            document.getElementById('small_display').innerHTML=`Speed: ${pokemon.stats[5].base_stat}`   
        }

        //Screen navigator
        document.getElementById('ability').onclick=function(){
            document.getElementById('small_display').innerHTML=`Abilities: ${pokemon.abilities[0].ability.name}`
            document.getElementById('forward').onclick=function(){
                moveAbilities(pokemon,1)
            }
        }
        document.getElementById('moves').onclick=function(){
            document.getElementById('small_display').innerHTML=`Moves: ${pokemon.moves[0].move.name}`
            document.getElementById('forward').onclick=function(){
                moveMoves(pokemon,1)
            }
        }
    }
}

const capitalizeLetter=word=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const spriteLoad=pokemon=>{
    if(shiny===false){
        if(pokemon.sprites.back_shiny!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny}></img><img src=${pokemon.sprites.back_shiny}></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny}></img>`
        }
        shiny=true;
    }
    else{
        if(pokemon.sprites.shiny_default!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default}></img><img src=${pokemon.sprites.back_default}></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default}></img>`
        }
         shiny=false;
    }
}

const moveAbilities=(pokemon,index)=>{
    if(pokemon.abilities.length>index&&index>=0){
        document.getElementById('small_display').innerHTML=`Abilities: ${pokemon.abilities[index].ability.name}`
        document.getElementById('forward').onclick=function(){
            moveAbilities(pokemon,index+1)
        }
        document.getElementById('backward').onclick=function(){
            moveAbilities(pokemon,index-1)
        }
    }
}

const moveMoves=(pokemon,index)=>{
    if(pokemon.moves.length>index&&index>=0){
        document.getElementById('small_display').innerHTML=`Moves: ${pokemon.moves[index].move.name}`
        document.getElementById('forward').onclick=function(){
            moveMoves(pokemon,index+1)
        }
        document.getElementById('backward').onclick=function(){
            moveMoves(pokemon,index-1)
        }
    }
}

//Initaial data load
retrievePokemon(1)