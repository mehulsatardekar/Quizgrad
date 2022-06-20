const resultMessage = (userPoint:number)=>{
    if(userPoint < 50){
      return 'Oops 😭, Better Luck Next Time !'
    }else if(userPoint > 50 && userPoint< 80){
      return 'Well try, Keep practicing 👨‍💻'
    }else if(userPoint > 80){
      return 'Hureee Good Job 😎😎'
    }
}

export {resultMessage};