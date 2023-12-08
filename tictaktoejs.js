const gamecells=document.querySelectorAll('.cell')
const player1=document.getElementById('player1');
const player2=document.getElementById('player2');
const restart=document.getElementById('restart');
const alertbox=document.querySelector('.alertbox');
let currentplayer='x';
let nextplayer='O';
let playerturn=currentplayer
const startgame=()=>{
    gamecells.forEach(cell => {
     cell.addEventListener('click',handleclick);
    });
}
const showalert=(msg)=>{
    alertbox.style.display="block";
    alertbox.innerHTML=`${msg}`;
}
const handleclick=(e)=>{
    if(e.target.innerHTML===""){
        e.target.innerHTML=`${playerturn}`
        checkwin();
       if(checkwin()){
            console.log(`${playerturn} won!!`);
            showalert(`${playerturn} is the Winner!!`)
            disablecells();
        }
        else if(checktie()){
            console.log("its a tie!!")
            showalert("It's a tie!!")
            disablecells();
        }
        else{
        changeplayerturn();}
    }
}
const disablecells=()=>{
    gamecells.forEach(cell=>{
cell.removeEventListener('click',handleclick);
cell.classList.add('disabled');
    });
}
const changeplayerturn=()=>{
playerturn=playerturn===currentplayer? nextplayer:currentplayer;
}
restart.addEventListener('click',(e)=>{
    restartgame();
})
const restartgame=()=>{
    gamecells.forEach(cell=>{
        cell.innerHTML="";
        cell.classList.remove('disabled');
        alertbox.style.display="none";
    });
    startgame();
}
const checkwin=()=>{
const winningconditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
for(let i=0;i<winningconditions.length;i++){
    const [pos1,pos2,pos3]=winningconditions[i];
    //console.log(`${pos1}${pos2}${pos3}`);
    if(gamecells[pos1].innerHTML!=""&&gamecells[pos1].innerHTML===gamecells[pos2].innerHTML&& gamecells[pos2].innerHTML===gamecells[pos3].innerHTML ){
    return true;}

}
return false;
}
const checktie=()=>{
    let empty=0;
    for(let i=0;i<gamecells.length;i++){
        if(gamecells[i].innerHTML===""){
            empty=empty+1;
        }
    }
    if(empty==0 && !checkwin())
    return true;
return false;
}
startgame();