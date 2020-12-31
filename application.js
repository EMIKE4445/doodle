const ball= document.getElementById('ball');
const container= document.getElementById('container');
const score=document.getElementById('score-number');
let current_score=0;


let gravity=0.9;

// instatiating balls position
let ball_position= 40;
let is_jumping= false;

//time variable used in villan interval
let time=2000;

function controller(event){
   
    if(event.code=='Space'){
        if(!is_jumping){
            jump();
        }
        
    }
    else if(event.code=='Escape'){
        game_over();
    }
}


function jump(){
    
    
   
   let timer= setInterval(()=>{
        if(ball_position>200){
            clearInterval(timer);
            

            let down_interval= setInterval(()=>{
                if(ball_position<=40){
                    clearInterval(down_interval);
                    is_jumping=false;

                }
                ball_position-= 10;
                
                ball.style.bottom =ball_position +'px';
            },20);
        }

        is_jumping=true;
        ball_position+= 10; 
        ball.style.bottom =ball_position +'px';

    },20);
}

function set_score(number){
    score.innerText=number;
}

function game_over(){
    document.getElementById('game-objects').style.display='none';
    document.getElementById('game-over').style.display='block';
}

function create_random_obstacle(obstacle_type){
    // obstacle types  are rectangles on ground and flat tiles above ground

    let obstacle= document.createElement('div');
    obstacle.classList.add('obstacle');
    return obstacle;
}


document.addEventListener('keyup', controller);

// adds event listener to retry  object
document.getElementById('retry').addEventListener('click',()=>{
    console.log('foo');
    location.reload();
})


//ememy

function villan(){
    console.log(time);
   let obstacle= create_random_obstacle();
   document.getElementById('game-objects').appendChild(obstacle);
   
   let position=1000;
   

   let timer =setInterval(()=>{
        if((position<=70) && (ball_position<50)){
            clearInterval(timer)
            
            clearInterval(villan_interval);
            game_over();
            console.log(position);
        }


        if(position<=-40){
            clearInterval(timer);
            document.getElementById('game-objects').removeChild(obstacle);
            current_score+=1;
            set_score(current_score);

            if(current_score%10==0){time-=200;
                clearInterval(villan_interval);
                 villan_interval=setInterval(villan,time);
            }
            
           
        }
        
        position-=10;
        obstacle.style.left=position+'px';
        
    },20);

}



let villan_interval=setInterval(villan,time);
