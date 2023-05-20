let gamepad,gamepadPress,gamepad_choice=-1,gamepad_choices,gamepad_cursor=0;
tuesday.addEventListener('creation_dialog', function(event) {
    if( gamepad_cursor!=0 ){
        gamepad_cursor_cler();
    }
});
function select_choice(i){
    if( gamepad_cursor==0 ){
        gamepad_choices = ( story_json[tue_story][scene].terrain_map ) ? tuesday.getElementsByClassName("tue_map_item") : tuesday.getElementsByClassName("tue_choice");
        gamepad_cursor=document.createElement("div");
        gamepad_cursor.style.position="absolute";
        gamepad_cursor.style.pointerEvents="none";
        gamepad_cursor.id="gamepad_cursor"
        let c=story_json.parameters.gamepad.cursor
        gamepad_cursor.innerHTML="<img src='"+c[0]+"' style='pointer-events:none;position:absolute;top:"+c[1]+";left:"+c[2]+";"+((c[3]!=0)?"width:"+c[3]+";":"")+((c[3]!=0)?"height:"+c[3]+";":"")+"'>"
        if(story_json[tue_story][scene].terrain_map){
            tue_map.appendChild(gamepad_cursor)
            tue_world.style.scrollBehavior="smooth";
        }else{tuesday.appendChild(gamepad_cursor)}
    }
    gamepad_choice=(gamepad_choice+i>=gamepad_choices.length)?0:(gamepad_choice+i<0)?gamepad_choices.length-1:gamepad_choice+i;
    if( story_json[tue_story][scene].terrain_map || (gamepad_choices[gamepad_choice].onclick.toString().includes("go_to") || gamepad_choices[gamepad_choice].onclick.toString().includes("go_story") || gamepad_choices[gamepad_choice].onclick.toString().includes("tue_load_autosave") || gamepad_choices[gamepad_choice].onclick.toString().includes("load_stag") ) ){
        gamepad_cursor.style.left=gamepad_choices[gamepad_choice].style.left;
        gamepad_cursor.style.top=gamepad_choices[gamepad_choice].style.top;
        gamepad_cursor.style.right=gamepad_choices[gamepad_choice].style.right;
        gamepad_cursor.style.bottom=gamepad_choices[gamepad_choice].style.bottom;
        gamepad_cursor.style.width=gamepad_choices[gamepad_choice].style.width;
        gamepad_cursor.style.height=gamepad_choices[gamepad_choice].style.height;
        gamepad_cursor.style.padding=gamepad_choices[gamepad_choice].style.padding;
        gamepad_cursor.style.zIndex=gamepad_choices[gamepad_choice].style.zIndex;
        if(story_json[tue_story][scene].terrain_map){
            let r=gamepad_choices[gamepad_choice].getBoundingClientRect();
            tue_world.scrollTop = tue_world.scrollTop+ (r.top -(tuesday.clientHeight/2))
            tue_world.scrollLeft= tue_world.scrollLeft+(r.left-(tuesday.clientWidth /2))
        }
    }else{select_choice(i)}
}
function gamepad_cursor_cler(){
    gamepad_cursor.remove();
    gamepad_cursor=0;
    gamepad_choice=-1;
}
window.addEventListener("keydown",function(e){
    e=e.keyCode;
    if(e==37){
        if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(1);}
        else if( !story_json.parameters.key || !story_json.parameters.key.next ){back_story()}
    }else if(e==39){
        if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(-1);}
        else if( !story_json.parameters.key || !story_json.parameters.key.back ){go_story()}
    }else if(e==38){
        if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(1);}
    }else if(e==40){
        if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(-1);}
    }
    else if(e==13||e==32){
        if( gamepad_cursor!=0 ){
            gamepad_choices[gamepad_choice].click();
            if(story_json[tue_story][scene].terrain_map){
                gamepad_cursor_cler();
            }
        }
    }
})
window.addEventListener('gamepadconnected',function(e){
    const update=()=>{
        for (gamepad of navigator.getGamepads()){
            if (!gamepad) continue;
            const statenow=gamepad.buttons.some(btn=>btn.pressed);
            if (gamepadPress!==statenow){
                gamepadPress=statenow;
                if(gamepad.buttons[14].pressed){
                    if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){
                        select_choice(-1);
                    }else{back_story()}
                    
                }else if(gamepad.buttons[15].pressed){
                    if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){
                        select_choice(1);
                    }else{go_story()}
                }else if(gamepad.buttons[12].pressed){if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(-1);}}
                else if(gamepad.buttons[13].pressed){if(story_json[tue_story][scene].terrain_map||(tue_next.style.visibility='hidden'&&story_json[tue_story][scene].dialogs[dialog].choice)){select_choice(1);}}
                else if(gamepad.buttons[1].pressed||gamepad.buttons[2].pressed||gamepad.buttons[3].pressed||gamepad.buttons[0].pressed){
                    if( gamepad_cursor!=0 ){
                        gamepad_choices[gamepad_choice].click();
                        if(story_json[tue_story][scene].terrain_map){
                            gamepad_cursor_cler();
                        }
                    }
                }
            }
        }
        requestAnimationFrame(update);
    };update();
});
