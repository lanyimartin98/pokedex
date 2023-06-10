
//GLobal variables
let shiny=true;
let chosen='height'

const retrievePokemon=async (no)=>{
    if(no>0&&no<899){

        //API call
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${no}`);
        const pokemon = await response.json(); 

        document.getElementById('name').innerHTML=`#${pokemon.id} ${capitalizeLetter(pokemon.name)}`

        //Resetting
        document.getElementById('small_display').innerHTML=''
        document.getElementById('prim_type').classList.remove(document.getElementById('prim_type').classList[1])
        document.getElementById('sec_type').classList.remove(document.getElementById('sec_type').classList[1])

        switchChosen(pokemon);

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
            shiny=!shiny
            spriteLoad(pokemon)
        }

        //Blue buttons
        document.getElementById('height').onclick=function(){
           chosen='height'
           switchChosen(pokemon);
        }

        document.getElementById('weight').onclick=function(){
            chosen='weight'
           switchChosen(pokemon);
        }

        document.getElementById('hp').onclick=function(){
            chosen='hp'
           switchChosen(pokemon);
        }

        document.getElementById('attack').onclick=function(){
            chosen='attack'
           switchChosen(pokemon);
        }

        document.getElementById('defense').onclick=function(){
            chosen='defense'
           switchChosen(pokemon);
        }

        document.getElementById('special_attack').onclick=function(){
            chosen='special_attack'
           switchChosen(pokemon);
        }

        document.getElementById('special_defense').onclick=function(){
            chosen='special_defense'
           switchChosen(pokemon);
        }

        document.getElementById('speed').onclick=function(){
            chosen='speed'
            switchChosen(pokemon);
        }

        //Screen navigator
        document.getElementById('ability').onclick=function(){
            chosen='abilities'
           switchChosen(pokemon);
        }
        document.getElementById('moves').onclick=function(){
            chosen='moves'
           switchChosen(pokemon);
        }
    }
}

const switchChosen=pokemon=>{
    resetNavButtons()
    switch(chosen){
        case 'weight':
            document.getElementById('small_display').innerHTML=`Weight: ${pokemon.weight}lbs`
            break;
        case 'height':
            document.getElementById('small_display').innerHTML=`Height: ${pokemon.height}ft`
            break;
        case 'hp':
            document.getElementById('small_display').innerHTML=`HP: ${pokemon.stats[0].base_stat}`
            break;
        case 'attack':
            document.getElementById('small_display').innerHTML=`Attack: ${pokemon.stats[1].base_stat}`
            break;
        case 'defense':
            document.getElementById('small_display').innerHTML=`Defense: ${pokemon.stats[2].base_stat}`
            break;
        case 'special_attack':
            document.getElementById('small_display').innerHTML=`Special attack: ${pokemon.stats[3].base_stat}`
            break;
        case 'special_defense':
            document.getElementById('small_display').innerHTML=`Special defense: ${pokemon.stats[4].base_stat}`
            break;
        case 'speed':
            document.getElementById('small_display').innerHTML=`Speed: ${pokemon.stats[5].base_stat}`  
            break;
        case 'abilities':
            document.getElementById('small_display').innerHTML=`Abilities: ${capitalizeLetter(pokemon.abilities[0].ability.name)}`
            document.getElementById('forward').onclick=function(){
                moveAbilities(pokemon,1)
            }
            break;
        case 'moves':
            document.getElementById('small_display').innerHTML=`Moves: ${capitalizeLetter(pokemon.moves[0].move.name)}`
            document.getElementById('forward').onclick=function(){
                moveMoves(pokemon,1)
            }
            break;
    }
}

const capitalizeLetter=word=>{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const resetNavButtons=()=>{
    document.getElementById('backward').onclick=function(){ }
    document.getElementById('forward').onclick=function(){ }
}

const spriteLoad=pokemon=>{
    if(shiny===false){
        if(pokemon.sprites.back_shiny!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny} alt=${pokemon.name}></img><img src=${pokemon.sprites.back_shiny} alt=${pokemon.name}></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_shiny} alt=${pokemon.name}></img>`
        }
    }
    else{
        if(pokemon.sprites.back_default!==null){
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default} alt=${pokemon.name}></img><img src=${pokemon.sprites.back_default} alt=${pokemon.name}></img>`
        }else{
            document.getElementById('display').innerHTML=`<img src=${pokemon.sprites.front_default} alt=${pokemon.name}></img>`
        }
    }
}

const moveAbilities=(pokemon,index)=>{
    if(pokemon.abilities.length>index&&index>=0){
        document.getElementById('small_display').innerHTML=`Abilities: ${capitalizeLetter(pokemon.abilities[index].ability.name)}`
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
        document.getElementById('small_display').innerHTML=`Moves: ${capitalizeLetter(pokemon.moves[index].move.name)}`
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